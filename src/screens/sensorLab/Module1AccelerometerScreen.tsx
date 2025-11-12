import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccelerometer } from "@hooks/useAccelerometer";
import { SensorVisualizer } from "@components/sensors/SensorVisualizer";
import { colors } from "@constants/colors";

const Module1AccelerometerScreen: React.FC = () => {
  const { data, isAvailable } = useAccelerometer({
    updateInterval: 100,
    enabled: true,
  });

  if (!isAvailable) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ⚠️ El acelerómetro no está disponible en este dispositivo
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.moduleTitle}>Módulo 1: Acelerómetro Básico</Text>
          <Text style={styles.moduleDescription}>
            El acelerómetro mide la aceleración del dispositivo en tres ejes.
            Mueve tu dispositivo para ver los cambios en tiempo real.
          </Text>

          <SensorVisualizer
            type="accelerometer"
            data={data}
            showRawValues={true}
            showVisualizer={true}
            showBars={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 12,
  },
  moduleDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: "center",
  },
});

export default Module1AccelerometerScreen;
