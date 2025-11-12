// src/services/attendanceService.ts
/**
 * Servicio de Asistencia con Integración de Sensores
 * Maneja el registro de asistencia usando detección de shake
 * y validaciones anti-fraude
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccelerometerData } from '../types/sensors.types';
import { getNetAcceleration, CircularBuffer, calculateVariance } from '../utils/sensorUtils';

// Tipos para el servicio de asistencia
export interface Student {
  id: string;
  name: string;
  email: string;
  studentCode: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  timestamp: number;
  method: 'shake' | 'manual' | 'qr' | 'nfc';
  verified: boolean;
  metadata?: {
    shakeIntensity?: number;
    shakeCount?: number;
    deviceMovementPattern?: number[];
    trustScore?: number;
  };
}

export interface Course {
  id: string;
  name: string;
  code: string;
  professorId: string;
  schedule: string;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  registeredStudents: string[];
}

// Configuración del servicio
const STORAGE_KEYS = {
  ATTENDANCE_RECORDS: '@attendance_records',
  ACTIVE_SESSIONS: '@active_sessions',
  STUDENTS: '@students',
  COURSES: '@courses',
};

// Configuración de validación anti-fraude
const ANTI_FRAUD_CONFIG = {
  MIN_SHAKE_INTENSITY: 10.0,
  MAX_SHAKE_INTENSITY: 50.0,
  MIN_SHAKE_COUNT: 3,
  MAX_SHAKE_COUNT: 10,
  MIN_MOVEMENT_VARIANCE: 5.0,
  REQUIRED_TRUST_SCORE: 0.7,
};

/**
 * Clase principal del servicio de asistencia
 */
class AttendanceService {
  private movementBuffer: CircularBuffer<AccelerometerData>;
  private shakeIntensities: number[] = [];

  constructor() {
    // Buffer para almacenar los últimos 50 datos de movimiento
    this.movementBuffer = new CircularBuffer<AccelerometerData>(50);
  }

  /**
   * Registra datos de movimiento para análisis anti-fraude
   */
  recordMovement(data: AccelerometerData): void {
    this.movementBuffer.push(data);
  }

  /**
   * Registra la intensidad de un shake
   */
  recordShake(intensity: number): void {
    this.shakeIntensities.push(intensity);
  }

  /**
   * Calcula el score de confianza basado en patrones de movimiento
   * Retorna un valor entre 0 y 1
   */
  calculateTrustScore(): number {
    if (!this.movementBuffer.isFull()) {
      return 0;
    }

    let score = 1.0;

    // Factor 1: Varianza de movimiento (mayor varianza = más humano)
    const movements = this.movementBuffer.getAll();
    const accelerations = movements.map(m => getNetAcceleration(m));
    const variance = calculateVariance(accelerations);

    if (variance < ANTI_FRAUD_CONFIG.MIN_MOVEMENT_VARIANCE) {
      score -= 0.3; // Movimiento muy uniforme es sospechoso
    }

    // Factor 2: Intensidad de shakes
    if (this.shakeIntensities.length > 0) {
      const avgIntensity =
        this.shakeIntensities.reduce((a, b) => a + b, 0) / this.shakeIntensities.length;

      if (
        avgIntensity < ANTI_FRAUD_CONFIG.MIN_SHAKE_INTENSITY ||
        avgIntensity > ANTI_FRAUD_CONFIG.MAX_SHAKE_INTENSITY
      ) {
        score -= 0.2; // Intensidad anormal
      }

      // Verificar variación en las intensidades
      const intensityVariance = calculateVariance(this.shakeIntensities);
      if (intensityVariance < 1.0) {
        score -= 0.2; // Shakes demasiado uniformes
      }
    }

    // Factor 3: Cantidad de shakes
    const shakeCount = this.shakeIntensities.length;
    if (
      shakeCount < ANTI_FRAUD_CONFIG.MIN_SHAKE_COUNT ||
      shakeCount > ANTI_FRAUD_CONFIG.MAX_SHAKE_COUNT
    ) {
      score -= 0.3;
    }

    return Math.max(0, Math.min(1, score));
  }

  /**
   * Marca asistencia con validación de sensores
   */
  async markAttendance(
    studentId: string,
    courseId: string,
    method: AttendanceRecord['method'] = 'shake'
  ): Promise<{ success: boolean; record?: AttendanceRecord; error?: string }> {
    try {
      // Verificar que hay una sesión activa
      const activeSession = await this.getActiveSession(courseId);
      if (!activeSession) {
        return {
          success: false,
          error: 'No hay una sesión de asistencia activa para este curso',
        };
      }

      // Verificar que el alumno no haya marcado asistencia ya
      if (activeSession.registeredStudents.includes(studentId)) {
        return {
          success: false,
          error: 'Ya has registrado tu asistencia para esta sesión',
        };
      }

      // Si es por shake, validar confianza
      let trustScore = 1.0;
      let verified = true;

      if (method === 'shake') {
        trustScore = this.calculateTrustScore();

        if (trustScore < ANTI_FRAUD_CONFIG.REQUIRED_TRUST_SCORE) {
          return {
            success: false,
            error: 'No se pudo verificar tu asistencia. Intenta nuevamente o usa el método manual.',
          };
        }
      }

      // Crear registro de asistencia
      const record: AttendanceRecord = {
        id: `att_${Date.now()}_${studentId}`,
        studentId,
        courseId,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now(),
        method,
        verified,
        metadata: {
          shakeIntensity:
            this.shakeIntensities.length > 0
              ? this.shakeIntensities.reduce((a, b) => a + b, 0) / this.shakeIntensities.length
              : undefined,
          shakeCount: this.shakeIntensities.length,
          deviceMovementPattern: this.movementBuffer.getAll().map(m => getNetAcceleration(m)),
          trustScore,
        },
      };

      // Guardar registro
      await this.saveAttendanceRecord(record);

      // Actualizar sesión activa
      activeSession.registeredStudents.push(studentId);
      await this.updateActiveSession(activeSession);

      // Limpiar buffers
      this.resetTracking();

      return { success: true, record };
    } catch (error) {
      console.error('Error al marcar asistencia:', error);
      return {
        success: false,
        error: 'Error al procesar la asistencia. Intenta nuevamente.',
      };
    }
  }

  /**
   * Guarda un registro de asistencia
   */
  private async saveAttendanceRecord(record: AttendanceRecord): Promise<void> {
    try {
      const existingRecords = await this.getAttendanceRecords();
      const updatedRecords = [...existingRecords, record];
      await AsyncStorage.setItem(
        STORAGE_KEYS.ATTENDANCE_RECORDS,
        JSON.stringify(updatedRecords)
      );
    } catch (error) {
      console.error('Error al guardar registro de asistencia:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los registros de asistencia
   */
  async getAttendanceRecords(
    filters?: {
      studentId?: string;
      courseId?: string;
      dateFrom?: string;
      dateTo?: string;
    }
  ): Promise<AttendanceRecord[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ATTENDANCE_RECORDS);
      let records: AttendanceRecord[] = data ? JSON.parse(data) : [];

      // Aplicar filtros si existen
      if (filters) {
        if (filters.studentId) {
          records = records.filter(r => r.studentId === filters.studentId);
        }
        if (filters.courseId) {
          records = records.filter(r => r.courseId === filters.courseId);
        }
        if (filters.dateFrom) {
          records = records.filter(r => r.date >= filters.dateFrom!);
        }
        if (filters.dateTo) {
          records = records.filter(r => r.date <= filters.dateTo!);
        }
      }

      return records;
    } catch (error) {
      console.error('Error al obtener registros de asistencia:', error);
      return [];
    }
  }

  /**
   * Crea una nueva sesión de asistencia
   */
  async createAttendanceSession(
    courseId: string,
    startTime: string,
    endTime: string
  ): Promise<AttendanceSession> {
    const session: AttendanceSession = {
      id: `session_${Date.now()}_${courseId}`,
      courseId,
      date: new Date().toISOString().split('T')[0],
      startTime,
      endTime,
      isActive: true,
      registeredStudents: [],
    };

    const sessions = await this.getActiveSessions();
    sessions.push(session);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_SESSIONS, JSON.stringify(sessions));

    return session;
  }

  /**
   * Obtiene la sesión activa para un curso
   */
  async getActiveSession(courseId: string): Promise<AttendanceSession | null> {
    const sessions = await this.getActiveSessions();
    const activeSession = sessions.find(s => s.courseId === courseId && s.isActive);
    return activeSession || null;
  }

  /**
   * Obtiene todas las sesiones activas
   */
  async getActiveSessions(): Promise<AttendanceSession[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al obtener sesiones activas:', error);
      return [];
    }
  }

  /**
   * Actualiza una sesión activa
   */
  private async updateActiveSession(session: AttendanceSession): Promise<void> {
    const sessions = await this.getActiveSessions();
    const index = sessions.findIndex(s => s.id === session.id);
    if (index !== -1) {
      sessions[index] = session;
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_SESSIONS, JSON.stringify(sessions));
    }
  }

  /**
   * Cierra una sesión de asistencia
   */
  async closeAttendanceSession(sessionId: string): Promise<void> {
    const sessions = await this.getActiveSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index !== -1) {
      sessions[index].isActive = false;
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_SESSIONS, JSON.stringify(sessions));
    }
  }

  /**
   * Obtiene estadísticas de asistencia de un alumno
   */
  async getStudentAttendanceStats(
    studentId: string,
    courseId?: string
  ): Promise<{
    totalClasses: number;
    attendedClasses: number;
    attendanceRate: number;
    lastAttendance: string | null;
  }> {
    const filters: any = { studentId };
    if (courseId) filters.courseId = courseId;

    const records = await this.getAttendanceRecords(filters);
    const uniqueDates = [...new Set(records.map(r => r.date))];

    return {
      totalClasses: uniqueDates.length,
      attendedClasses: records.length,
      attendanceRate: uniqueDates.length > 0 ? (records.length / uniqueDates.length) * 100 : 0,
      lastAttendance: records.length > 0 ? records[records.length - 1].date : null,
    };
  }

  /**
   * Obtiene un reporte de asistencia de un curso
   */
  async getCourseAttendanceReport(
    courseId: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<{
    totalStudents: number;
    averageAttendance: number;
    records: AttendanceRecord[];
  }> {
    const records = await this.getAttendanceRecords({
      courseId,
      dateFrom,
      dateTo,
    });

    const uniqueStudents = [...new Set(records.map(r => r.studentId))];
    const uniqueDates = [...new Set(records.map(r => r.date))];

    const averageAttendance =
      uniqueDates.length > 0 ? records.length / uniqueDates.length : 0;

    return {
      totalStudents: uniqueStudents.length,
      averageAttendance,
      records,
    };
  }

  /**
   * Reinicia el tracking de movimiento
   */
  resetTracking(): void {
    this.movementBuffer.clear();
    this.shakeIntensities = [];
  }

  /**
   * Valida si un alumno puede marcar asistencia ahora
   */
  async canMarkAttendance(
    studentId: string,
    courseId: string
  ): Promise<{ canMark: boolean; reason?: string }> {
    // Verificar sesión activa
    const activeSession = await this.getActiveSession(courseId);
    if (!activeSession) {
      return {
        canMark: false,
        reason: 'No hay sesión activa',
      };
    }

    // Verificar si ya marcó
    if (activeSession.registeredStudents.includes(studentId)) {
      return {
        canMark: false,
        reason: 'Ya registraste tu asistencia',
      };
    }

    // Verificar horario
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
    // Aquí podrías agregar validación de horario

    return { canMark: true };
  }

  /**
   * Exporta registros de asistencia a formato CSV
   */
  async exportToCSV(
    records: AttendanceRecord[],
    includeMetadata: boolean = false
  ): Promise<string> {
    let csv = 'ID,Estudiante,Curso,Fecha,Hora,Método,Verificado';

    if (includeMetadata) {
      csv += ',Intensidad Shake,Conteo Shake,Score Confianza';
    }

    csv += '\n';

    records.forEach(record => {
      const timestamp = new Date(record.timestamp);
      const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;

      let row = `${record.id},${record.studentId},${record.courseId},${record.date},${time},${record.method},${record.verified}`;

      if (includeMetadata && record.metadata) {
        row += `,${record.metadata.shakeIntensity || ''},${record.metadata.shakeCount || ''},${record.metadata.trustScore || ''}`;
      }

      csv += row + '\n';
    });

    return csv;
  }
}

// Exportar instancia singleton
export default new AttendanceService();
