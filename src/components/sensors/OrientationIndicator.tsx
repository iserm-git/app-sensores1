import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@constants/colors';
import { OrientationData } from '@types/sensors.types';

interface OrientationIndicatorProps {
  orientation: OrientationData;
  showAngles?: boolean;
}

export const OrientationIndicator: React.FC<OrientationIndicatorProps> = ({
  orientation,
  showAngles = true,
}) => {
  const { pitch, roll } = orientation;

  // Calcular posición de la burbuja en el nivel
  const bubbleX = (roll / 90) * 50; // Máximo 50% en cada dirección
  const bubbleY = (pitch / 90) * 50;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nivel de Burbuja</Text>

      {/* Nivel de burbuja */}
      <View style={styles.levelContainer}>
        {/* Líneas de guía */}
        <View style={styles.crosshairHorizontal} />
        <View style={styles.crosshairVertical} />

        {/* Burbuja */}
        <View
          style={[
            styles.bubble,
            {
              transform: [
                { translateX: bubbleX },
                { translateY: bubbleY },
              ],
            },
          ]}
        />

        {/* Centro objetivo */}
        <View style={styles.centerTarget} />
      </View>

      {/* Mostrar ángulos */}
      {showAngles && (
        <View style={styles.anglesContainer}>
          <View style={styles.angleItem}>
            <Text style={styles.angleLabel}>Pitch (↕️)</Text>
            <Text style={styles.angleValue}>{pitch.toFixed(1)}°</Text>
          </View>
          <View style={styles.angleItem}>
            <Text style={styles.angleLabel}>Roll (↔️)</Text>
            <Text style={styles.angleValue}>{roll.toFixed(1)}°</Text>
          </View>
        </View>
      )}

      {/* Indicador de nivelación */}
      {Math.abs(pitch) < 5 && Math.abs(roll) < 5 && (
        <View style={styles.leveledIndicator}>
          <Text style={styles.leveledText}>✓ Nivelado</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background.card,
    borderRadius: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  levelContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  crosshairHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
  },
  crosshairVertical: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: colors.border,
  },
  bubble: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  centerTarget: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.success,
    borderStyle: 'dashed',
  },
  anglesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  angleItem: {
    alignItems: 'center',
  },
  angleLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  angleValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  leveledIndicator: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.success,
    borderRadius: 8,
    alignItems: 'center',
  },
  leveledText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.white,
  },
});
