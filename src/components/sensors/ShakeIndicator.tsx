import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors } from "@constants/colors";

interface ShakeIndicatorProps {
  isShaking: boolean;
  shakeCount: number;
  requiredShakes: number;
  intensity?: number;
}

export const ShakeIndicator: React.FC<ShakeIndicatorProps> = ({
  isShaking,
  shakeCount,
  requiredShakes,
  intensity = 0,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isComplete = shakeCount >= requiredShakes;

  // ✅ Animar cuando hay shake
  useEffect(() => {
    if (isShaking) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isShaking]);

  // ✅ Debug log
  console.log("🎨 ShakeIndicator render:", {
    shakeCount,
    requiredShakes,
    isShaking,
    intensity,
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: isComplete ? colors.success : colors.primary,
          },
        ]}
      >
        <Text style={styles.icon}>{isComplete ? "✅" : "📱"}</Text>
      </Animated.View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Agitaciones: {shakeCount} / {requiredShakes}
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(shakeCount / requiredShakes) * 100}%`,
                backgroundColor: isComplete ? colors.success : colors.primary,
              },
            ]}
          />
        </View>

        {intensity > 0 && (
          <Text style={styles.intensityText}>
            Intensidad: {intensity.toFixed(1)}
          </Text>
        )}
      </View>

      {isComplete && (
        <Text style={styles.completeText}>
          ✅ ¡Listo! Procesando asistencia...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  indicator: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  icon: {
    fontSize: 50,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 12,
  },
  progressBar: {
    width: "100%",
    height: 12,
    backgroundColor: colors.background.secondary,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
    transition: "width 0.3s",
  },
  intensityText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  completeText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.success,
    marginTop: 16,
    textAlign: "center",
  },
});
