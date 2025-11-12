// src/components/sensors/SensorVisualizer.tsx
/**
 * Componente de Visualización de Sensores
 * Muestra datos de sensores de manera visual e interactiva
 * Útil para propósitos educativos
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { AccelerometerData, GyroscopeData } from '../../types/sensors.types';
import { formatSensorValue } from '../../utils/sensorUtils';

const { width, height } = Dimensions.get('window');

interface SensorVisualizerProps {
  type: 'accelerometer' | 'gyroscope';
  data: AccelerometerData | GyroscopeData;
  showRawValues?: boolean;
  showVisualizer?: boolean;
  showBars?: boolean;
  colorScheme?: {
    x: string;
    y: string;
    z: string;
    background: string;
  };
}

export const SensorVisualizer: React.FC<SensorVisualizerProps> = ({
  type,
  data,
  showRawValues = true,
  showVisualizer = true,
  showBars = true,
  colorScheme = {
    x: '#ff6b6b',
    y: '#4ecdc4',
    z: '#ffe66d',
    background: '#f5f5f5',
  },
}) => {
  const { x, y, z } = data;

  // Escalar valores para visualización
  const scaleValue = (value: number, type: 'accelerometer' | 'gyroscope'): number => {
    const maxValue = type === 'accelerometer' ? 20 : 10;
    const scaled = (value / maxValue) * 100;
    return Math.max(-100, Math.min(100, scaled));
  };

  const renderBar = (
    label: string,
    value: number,
    color: string,
    index: number
  ) => {
    const scaledValue = scaleValue(value, type);
    const barWidth = Math.abs(scaledValue) * 1.2;
    const isPositive = scaledValue >= 0;

    return (
      <View key={label} style={styles.barRow}>
        <View style={styles.labelContainer}>
          <Text style={[styles.axisLabel, { color }]}>{label}</Text>
          {showRawValues && (
            <Text style={styles.valueText}>{formatSensorValue(value)}</Text>
          )}
        </View>

        <View style={styles.barTrack}>
          <View style={styles.centerLine} />
          <View
            style={[
              styles.bar,
              {
                width: `${Math.abs(scaledValue)}%`,
                backgroundColor: color,
                [isPositive ? 'left' : 'right']: '50%',
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const render3DVisualizer = () => {
    // Posición de la esfera basada en los valores de los sensores
    const sphereX = (x / 20) * 80; // Escalar a píxeles
    const sphereY = (y / 20) * 80;

    return (
      <View style={styles.visualizerContainer}>
        <Text style={styles.visualizerTitle}>Visualización 3D</Text>

        {/* Plano de fondo */}
        <View style={styles.visualizerPlane}>
          {/* Líneas de guía */}
          <View style={styles.guideLine} />
          <View style={[styles.guideLine, { transform: [{ rotate: '90deg' }] }]} />

          {/* Esfera que representa el dispositivo */}
          <View
            style={[
              styles.sphere,
              {
                transform: [
                  { translateX: sphereX },
                  { translateY: sphereY },
                  { scale: 1 + (Math.abs(z) / 20) * 0.5 },
                ],
              },
            ]}
          >
            <View style={styles.sphereInner} />
          </View>

          {/* Indicadores de ejes */}
          <View style={styles.axisIndicators}>
            <Text style={[styles.axisIndicator, { left: 10, top: '50%' }]}>-X</Text>
            <Text style={[styles.axisIndicator, { right: 10, top: '50%' }]}>+X</Text>
            <Text style={[styles.axisIndicator, { top: 10, left: '50%' }]}>+Y</Text>
            <Text style={[styles.axisIndicator, { bottom: 10, left: '50%' }]}>-Y</Text>
          </View>
        </View>

        {/* Indicador Z */}
        <View style={styles.zIndicator}>
          <Text style={styles.zLabel}>Eje Z</Text>
          <View style={styles.zBar}>
            <View
              style={[
                styles.zFill,
                {
                  height: `${Math.abs((z / 20) * 100)}%`,
                  backgroundColor: colorScheme.z,
                },
              ]}
            />
          </View>
          <Text style={styles.zValue}>{formatSensorValue(z)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
      {/* Título del sensor */}
      <View style={styles.header}>
        <Text style={styles.sensorType}>
          {type === 'accelerometer' ? '📱 Acelerómetro' : '🔄 Giroscopio'}
        </Text>
        <Text style={styles.description}>
          {type === 'accelerometer'
            ? 'Mide aceleración y movimiento'
            : 'Mide rotación y velocidad angular'}
        </Text>
      </View>

      {/* Barras de valores */}
      {showBars && (
        <View style={styles.barsContainer}>
          {renderBar('Eje X', x, colorScheme.x, 0)}
          {renderBar('Eje Y', y, colorScheme.y, 1)}
          {renderBar('Eje Z', z, colorScheme.z, 2)}
        </View>
      )}

      {/* Visualizador 3D */}
      {showVisualizer && type === 'accelerometer' && render3DVisualizer()}

      {/* Información adicional */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Información</Text>
        {type === 'accelerometer' ? (
          <>
            <Text style={styles.infoText}>• X: Movimiento izquierda/derecha</Text>
            <Text style={styles.infoText}>• Y: Movimiento arriba/abajo</Text>
            <Text style={styles.infoText}>• Z: Movimiento adelante/atrás</Text>
            <Text style={styles.infoText}>• Gravedad ≈ 9.81 m/s²</Text>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>• X: Rotación sobre eje X (pitch)</Text>
            <Text style={styles.infoText}>• Y: Rotación sobre eje Y (roll)</Text>
            <Text style={styles.infoText}>• Z: Rotación sobre eje Z (yaw)</Text>
            <Text style={styles.infoText}>• Unidad: radianes/segundo</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sensorType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  barsContainer: {
    marginBottom: 20,
  },
  barRow: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  axisLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  barTrack: {
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 15,
    position: 'relative',
    overflow: 'hidden',
  },
  centerLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  bar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: 15,
  },
  visualizerContainer: {
    marginVertical: 20,
  },
  visualizerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  visualizerPlane: {
    width: width - 40,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 15,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guideLine: {
    position: 'absolute',
    width: '90%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  sphere: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sphereInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  axisIndicators: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  axisIndicator: {
    position: 'absolute',
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  zIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  zLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  zBar: {
    flex: 1,
    height: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  zFill: {
    width: '100%',
  },
  zValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 10,
    minWidth: 50,
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default SensorVisualizer;
