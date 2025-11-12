// src/types/sensors.types.ts
/**
 * Definiciones de tipos para la integración con sensores
 * Todos los tipos necesarios para trabajar con acelerómetro, giroscopio y sensores relacionados
 */

/**
 * Datos del acelerómetro
 * Representa la aceleración en los tres ejes (m/s²)
 */
export interface AccelerometerData {
  /** Aceleración en el eje X (izquierda/derecha) */
  x: number;
  /** Aceleración en el eje Y (arriba/abajo) */
  y: number;
  /** Aceleración en el eje Z (adelante/atrás) */
  z: number;
  /** Timestamp de la lectura en milisegundos */
  timestamp: number;
}

/**
 * Datos del giroscopio
 * Representa la velocidad angular en los tres ejes (rad/s)
 */
export interface GyroscopeData {
  /** Velocidad angular en el eje X (pitch) */
  x: number;
  /** Velocidad angular en el eje Y (roll) */
  y: number;
  /** Velocidad angular en el eje Z (yaw) */
  z: number;
  /** Timestamp de la lectura en milisegundos */
  timestamp: number;
}

/**
 * Datos del magnetómetro (brújula digital)
 * Representa el campo magnético en microteslas (μT)
 */
export interface MagnetometerData {
  /** Campo magnético en el eje X */
  x: number;
  /** Campo magnético en el eje Y */
  y: number;
  /** Campo magnético en el eje Z */
  z: number;
  /** Timestamp de la lectura en milisegundos */
  timestamp: number;
}

/**
 * Configuración de sensores
 */
export interface SensorConfig {
  /** Intervalo de actualización en milisegundos (menor = más frecuente) */
  updateInterval: number;
  /** Si el sensor está habilitado o no */
  enabled: boolean;
}

/**
 * Configuración para detección de shake (agitado)
 */
export interface ShakeDetectionConfig {
  /** Umbral de aceleración para detectar shake (m/s²) */
  threshold: number;
  /** Ventana de tiempo mínima entre shakes (milisegundos) */
  timeWindow: number;
}

/**
 * Datos de orientación del dispositivo
 * Ángulos en grados
 */
export interface OrientationData {
  /** Inclinación hacia adelante/atrás (pitch) en grados */
  pitch: number;
  /** Inclinación lateral (roll) en grados */
  roll: number;
  /** Rotación alrededor del eje vertical (yaw) en grados */
  yaw: number;
}

/**
 * Orientación básica del dispositivo
 */
export type DeviceOrientation =
  | 'portrait'              // Vertical normal
  | 'landscape'             // Horizontal (izquierda)
  | 'portrait-upside-down'  // Vertical invertido
  | 'landscape-right';      // Horizontal (derecha)

/**
 * Estado del sensor
 */
export interface SensorState {
  /** Si el sensor está disponible en el dispositivo */
  isAvailable: boolean;
  /** Si el sensor está actualmente activo */
  isActive: boolean;
  /** Mensaje de error si hay algún problema */
  error?: string;
}

/**
 * Resultado de la detección de shake
 */
export interface ShakeDetectionResult {
  /** Si se detectó un shake */
  isShaking: boolean;
  /** Número total de shakes detectados */
  shakeCount: number;
  /** Intensidad del último shake */
  lastShakeIntensity?: number;
  /** Timestamp del último shake */
  lastShakeTime?: number;
}

/**
 * Tipos de movimiento detectables
 */
export type MovementType =
  | 'stationary'    // Estático, sin movimiento
  | 'walking'       // Caminando
  | 'running'       // Corriendo
  | 'shaking'       // Agitando
  | 'rotating'      // Rotando
  | 'unknown';      // Desconocido

/**
 * Datos de actividad física detectada
 */
export interface ActivityData {
  /** Tipo de movimiento actual */
  type: MovementType;
  /** Confianza de la detección (0-1) */
  confidence: number;
  /** Número de pasos (si aplica) */
  steps?: number;
  /** Velocidad estimada (m/s) */
  velocity?: number;
}

/**
 * Configuración de filtro de señal
 */
export interface FilterConfig {
  /** Factor de suavizado para filtro de paso bajo (0-1) */
  alpha: number;
  /** Si el filtro está habilitado */
  enabled: boolean;
}

/**
 * Datos de calibración del sensor
 */
export interface CalibrationData {
  /** Offset en el eje X */
  offsetX: number;
  /** Offset en el eje Y */
  offsetY: number;
  /** Offset en el eje Z */
  offsetZ: number;
  /** Si está calibrado */
  isCalibrated: boolean;
  /** Timestamp de la calibración */
  calibrationTime: number;
}

/**
 * Parámetros para detección de caída libre
 */
export interface FreeFallDetectionConfig {
  /** Umbral de aceleración mínima para detectar caída libre */
  threshold: number;
  /** Duración mínima para considerar caída libre (ms) */
  minDuration: number;
}

/**
 * Resultado de detección de caída libre
 */
export interface FreeFallDetectionResult {
  /** Si se detectó caída libre */
  isFreeFalling: boolean;
  /** Duración de la caída libre (ms) */
  duration?: number;
  /** Timestamp del inicio de la caída */
  startTime?: number;
}

/**
 * Configuración de contador de pasos
 */
export interface StepCounterConfig {
  /** Umbral de aceleración para contar un paso */
  threshold: number;
  /** Tiempo mínimo entre pasos (ms) */
  minTimeBetweenSteps: number;
  /** Si el contador está habilitado */
  enabled: boolean;
}

/**
 * Datos del contador de pasos
 */
export interface StepCounterData {
  /** Número total de pasos */
  totalSteps: number;
  /** Pasos en la sesión actual */
  currentSessionSteps: number;
  /** Timestamp de inicio de la sesión */
  sessionStartTime: number;
  /** Cadencia (pasos por minuto) */
  cadence: number;
}

/**
 * Datos de gesto detectado
 */
export interface GestureData {
  /** Tipo de gesto */
  type: 'shake' | 'tilt' | 'flip' | 'rotate' | 'swipe' | 'tap';
  /** Dirección del gesto (si aplica) */
  direction?: 'up' | 'down' | 'left' | 'right' | 'clockwise' | 'counterclockwise';
  /** Intensidad del gesto (0-1) */
  intensity: number;
  /** Timestamp del gesto */
  timestamp: number;
  /** Metadata adicional */
  metadata?: Record<string, any>;
}

/**
 * Hook return type para sensores
 */
export interface UseSensorReturn<T> {
  /** Datos actuales del sensor */
  data: T;
  /** Si el sensor está disponible */
  isAvailable: boolean;
  /** Si hay un error */
  error?: Error;
  /** Función para reiniciar el sensor */
  reset: () => void;
  /** Función para pausar el sensor */
  pause: () => void;
  /** Función para reanudar el sensor */
  resume: () => void;
}

/**
 * Opciones para procesamiento de datos de sensores
 */
export interface SensorProcessingOptions {
  /** Aplicar filtro de paso bajo */
  useLowPassFilter?: boolean;
  /** Aplicar filtro de paso alto */
  useHighPassFilter?: boolean;
  /** Factor de suavizado (0-1) */
  smoothingFactor?: number;
  /** Aplicar calibración */
  useCalibration?: boolean;
  /** Datos de calibración */
  calibrationData?: CalibrationData;
}

/**
 * Datos históricos del sensor
 */
export interface SensorHistoryData<T> {
  /** Array de datos históricos */
  history: T[];
  /** Capacidad máxima del historial */
  maxSize: number;
  /** Timestamp del dato más antiguo */
  oldestTimestamp: number;
  /** Timestamp del dato más reciente */
  newestTimestamp: number;
}

/**
 * Estadísticas de datos del sensor
 */
export interface SensorStatistics {
  /** Promedio */
  mean: number;
  /** Mediana */
  median: number;
  /** Valor mínimo */
  min: number;
  /** Valor máximo */
  max: number;
  /** Desviación estándar */
  standardDeviation: number;
  /** Varianza */
  variance: number;
}

/**
 * Props para componente visualizador de sensores
 */
export interface SensorVisualizerProps {
  /** Tipo de sensor a visualizar */
  type: 'accelerometer' | 'gyroscope' | 'magnetometer';
  /** Datos del sensor */
  data: AccelerometerData | GyroscopeData | MagnetometerData;
  /** Mostrar valores numéricos */
  showRawValues?: boolean;
  /** Mostrar visualización gráfica */
  showVisualizer?: boolean;
  /** Mostrar barras de progreso */
  showBars?: boolean;
  /** Esquema de colores personalizado */
  colorScheme?: {
    x: string;
    y: string;
    z: string;
    background: string;
  };
  /** Callback cuando los datos cambian */
  onDataChange?: (data: AccelerometerData | GyroscopeData | MagnetometerData) => void;
}

/**
 * Evento de sensor
 */
export interface SensorEvent<T> {
  /** Tipo de evento */
  type: 'data' | 'error' | 'start' | 'stop';
  /** Datos del evento (si aplica) */
  data?: T;
  /** Error (si aplica) */
  error?: Error;
  /** Timestamp del evento */
  timestamp: number;
}

/**
 * Listener de eventos de sensor
 */
export type SensorEventListener<T> = (event: SensorEvent<T>) => void;

/**
 * Opciones de exportación de datos
 */
export interface ExportOptions {
  /** Formato de exportación */
  format: 'csv' | 'json' | 'xml';
  /** Incluir metadata */
  includeMetadata?: boolean;
  /** Incluir timestamps */
  includeTimestamps?: boolean;
  /** Campos a incluir */
  fields?: string[];
}

/**
 * Datos exportados
 */
export interface ExportedData {
  /** Formato de los datos */
  format: ExportOptions['format'];
  /** Contenido en string */
  content: string;
  /** Tamaño en bytes */
  size: number;
  /** Timestamp de exportación */
  exportTimestamp: number;
}

// Re-exportar todos los tipos
export type {
  // Básicos
  AccelerometerData,
  GyroscopeData,
  MagnetometerData,
  
  // Configuración
  SensorConfig,
  ShakeDetectionConfig,
  FilterConfig,
  SensorProcessingOptions,
  
  // Detección
  OrientationData,
  ShakeDetectionResult,
  FreeFallDetectionResult,
  ActivityData,
  GestureData,
  StepCounterData,
  
  // Estado
  SensorState,
  UseSensorReturn,
  
  // Utilidades
  CalibrationData,
  SensorHistoryData,
  SensorStatistics,
  SensorVisualizerProps,
  
  // Eventos
  SensorEvent,
  SensorEventListener,
  
  // Exportación
  ExportOptions,
  ExportedData,
};

// Tipos enumerados
export { type DeviceOrientation, type MovementType };
