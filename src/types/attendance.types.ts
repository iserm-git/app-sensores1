/**
 * Tipos adicionales para el módulo de asistencia
 * Complementa los tipos del attendanceService
 */

export interface AttendanceStats {
  totalSessions: number;
  attendedSessions: number;
  attendancePercentage: number;
  lastAttendanceDate: string | null;
}

export interface CourseInfo {
  id: string;
  name: string;
  code: string;
  professor: string;
  schedule: string;
}

export interface AttendanceReport {
  courseId: string;
  courseName: string;
  totalSessions: number;
  attendedSessions: number;
  missedSessions: number;
  attendanceRate: number;
  records: Array<{
    date: string;
    present: boolean;
    method?: string;
  }>;
}
