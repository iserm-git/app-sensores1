// src/utils/sensorUtils.ts
/**
 * Utilidades para el procesamiento de datos de sensores
 * Incluye funciones matemáticas y de filtrado para mejorar la precisión
 */

import { AccelerometerData, GyroscopeData, OrientationData } from '../types/sensors.types';

/**
 * Calcula la magnitud vectorial de los datos del acelerómetro
 * Útil para detectar intensidad de movimiento sin importar la dirección
 */
export const calculateMagnitude = (data: AccelerometerData): number => {
  const { x, y, z } = data;
  return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Calcula la aceleración neta removiendo la gravedad
 * Valor aproximado de gravedad: 9.81 m/s²
 */
export const getNetAcceleration = (data: AccelerometerData): number => {
  const magnitude = calculateMagnitude(data);
  return Math.abs(magnitude - 9.81);
};

/**
 * Filtro de paso bajo para suavizar señales ruidosas
 * Alpha determina qué tan agresivo es el filtrado (0.0 - 1.0)
 * - Alpha cercano a 0: Más suavizado, más lento a responder
 * - Alpha cercano a 1: Menos suavizado, más rápido a responder
 */
export class LowPassFilter {
  private previousValue: AccelerometerData = { x: 0, y: 0, z: 0, timestamp: 0 };
  private alpha: number;

  constructor(alpha: number = 0.1) {
    this.alpha = alpha;
  }

  apply(currentValue: AccelerometerData): AccelerometerData {
    const filtered: AccelerometerData = {
      x: this.previousValue.x + this.alpha * (currentValue.x - this.previousValue.x),
      y: this.previousValue.y + this.alpha * (currentValue.y - this.previousValue.y),
      z: this.previousValue.z + this.alpha * (currentValue.z - this.previousValue.z),
      timestamp: currentValue.timestamp,
    };

    this.previousValue = filtered;
    return filtered;
  }

  reset() {
    this.previousValue = { x: 0, y: 0, z: 0, timestamp: 0 };
  }
}

/**
 * Filtro de paso alto para eliminar la componente de gravedad
 * y detectar solo el movimiento activo
 */
export class HighPassFilter {
  private previousInput: AccelerometerData = { x: 0, y: 0, z: 0, timestamp: 0 };
  private previousOutput: AccelerometerData = { x: 0, y: 0, z: 0, timestamp: 0 };
  private alpha: number;

  constructor(alpha: number = 0.8) {
    this.alpha = alpha;
  }

  apply(currentValue: AccelerometerData): AccelerometerData {
    const filtered: AccelerometerData = {
      x: this.alpha * (this.previousOutput.x + currentValue.x - this.previousInput.x),
      y: this.alpha * (this.previousOutput.y + currentValue.y - this.previousInput.y),
      z: this.alpha * (this.previousOutput.z + currentValue.z - this.previousInput.z),
      timestamp: currentValue.timestamp,
    };

    this.previousInput = currentValue;
    this.previousOutput = filtered;
    return filtered;
  }

  reset() {
    this.previousInput = { x: 0, y: 0, z: 0, timestamp: 0 };
    this.previousOutput = { x: 0, y: 0, z: 0, timestamp: 0 };
  }
}

/**
 * Detecta si el dispositivo está en movimiento
 * Threshold determina la sensibilidad (valores típicos: 0.5 - 2.0)
 */
export const isDeviceMoving = (
  data: AccelerometerData,
  threshold: number = 1.0
): boolean => {
  const netAcceleration = getNetAcceleration(data);
  return netAcceleration > threshold;
};

/**
 * Calcula la orientación del dispositivo basándose en datos del acelerómetro
 * Retorna ángulos de pitch, roll y yaw en grados
 */
export const calculateOrientation = (data: AccelerometerData): OrientationData => {
  const { x, y, z } = data;

  // Pitch (inclinación hacia adelante/atrás)
  const pitch = Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);

  // Roll (inclinación lateral)
  const roll = Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI);

  // Yaw no se puede calcular con solo el acelerómetro
  // Se necesitaría magnetómetro para eso
  const yaw = 0;

  return { pitch, roll, yaw };
};

/**
 * Detecta si el dispositivo está en orientación horizontal o vertical
 */
export const getDeviceOrientation = (data: AccelerometerData): 'portrait' | 'landscape' => {
  const { x, y } = data;
  return Math.abs(y) > Math.abs(x) ? 'portrait' : 'landscape';
};

/**
 * Calcula la velocidad angular total del giroscopio
 */
export const calculateAngularVelocity = (data: GyroscopeData): number => {
  const { x, y, z } = data;
  return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Detecta si el dispositivo está siendo rotado
 */
export const isDeviceRotating = (
  data: GyroscopeData,
  threshold: number = 0.5
): boolean => {
  const angularVelocity = calculateAngularVelocity(data);
  return angularVelocity > threshold;
};

/**
 * Convierte radianes por segundo a grados por segundo
 */
export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

/**
 * Buffer circular para almacenar historial de datos
 * Útil para análisis de tendencias y detección de patrones
 */
export class CircularBuffer<T> {
  private buffer: T[];
  private size: number;
  private pointer: number = 0;
  private count: number = 0;

  constructor(size: number) {
    this.size = size;
    this.buffer = new Array(size);
  }

  push(item: T): void {
    this.buffer[this.pointer] = item;
    this.pointer = (this.pointer + 1) % this.size;
    if (this.count < this.size) {
      this.count++;
    }
  }

  getAll(): T[] {
    if (this.count < this.size) {
      return this.buffer.slice(0, this.count);
    }
    return [
      ...this.buffer.slice(this.pointer),
      ...this.buffer.slice(0, this.pointer),
    ];
  }

  getAverage(getValue: (item: T) => number): number {
    const items = this.getAll();
    if (items.length === 0) return 0;

    const sum = items.reduce((acc, item) => acc + getValue(item), 0);
    return sum / items.length;
  }

  clear(): void {
    this.buffer = new Array(this.size);
    this.pointer = 0;
    this.count = 0;
  }

  isFull(): boolean {
    return this.count === this.size;
  }

  getCount(): number {
    return this.count;
  }
}

/**
 * Detector de picos en la señal
 * Útil para detectar eventos discretos como pasos o golpes
 */
export class PeakDetector {
  private threshold: number;
  private minTimeBetweenPeaks: number;
  private lastPeakTime: number = 0;

  constructor(threshold: number = 2.0, minTimeBetweenPeaks: number = 300) {
    this.threshold = threshold;
    this.minTimeBetweenPeaks = minTimeBetweenPeaks;
  }

  detect(value: number, currentTime: number): boolean {
    if (value > this.threshold) {
      const timeSinceLastPeak = currentTime - this.lastPeakTime;
      if (timeSinceLastPeak >= this.minTimeBetweenPeaks) {
        this.lastPeakTime = currentTime;
        return true;
      }
    }
    return false;
  }

  reset(): void {
    this.lastPeakTime = 0;
  }

  setThreshold(threshold: number): void {
    this.threshold = threshold;
  }

  setMinTimeBetweenPeaks(time: number): void {
    this.minTimeBetweenPeaks = time;
  }
}

/**
 * Calcula la varianza de una serie de valores
 * Útil para detectar patrones de movimiento irregular
 */
export const calculateVariance = (values: number[]): number => {
  if (values.length === 0) return 0;

  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  return squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
};

/**
 * Calcula la desviación estándar
 */
export const calculateStandardDeviation = (values: number[]): number => {
  return Math.sqrt(calculateVariance(values));
};

/**
 * Interpola entre dos valores
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

/**
 * Limita un valor entre un mínimo y un máximo
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Normaliza un valor de un rango a otro
 */
export const normalize = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number => {
  const normalized = (value - fromMin) / (fromMax - fromMin);
  return toMin + normalized * (toMax - toMin);
};

/**
 * Calcula la distancia euclidiana entre dos puntos 3D
 */
export const distance3D = (
  p1: { x: number; y: number; z: number },
  p2: { x: number; y: number; z: number }
): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

/**
 * Formatea un valor numérico para mostrar con decimales fijos
 */
export const formatSensorValue = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Convierte datos del sensor a una representación legible
 */
export const formatSensorData = (data: AccelerometerData | GyroscopeData): string => {
  return `X: ${formatSensorValue(data.x)} | Y: ${formatSensorValue(data.y)} | Z: ${formatSensorValue(data.z)}`;
};

export default {
  calculateMagnitude,
  getNetAcceleration,
  LowPassFilter,
  HighPassFilter,
  isDeviceMoving,
  calculateOrientation,
  getDeviceOrientation,
  calculateAngularVelocity,
  isDeviceRotating,
  radiansToDegrees,
  CircularBuffer,
  PeakDetector,
  calculateVariance,
  calculateStandardDeviation,
  lerp,
  clamp,
  normalize,
  distance3D,
  formatSensorValue,
  formatSensorData,
};
