import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGyroscope } from "@hooks/useGyroscope";
import { SensorVisualizer } from "@components/sensors/SensorVisualizer";
import { colors } from "@constants/colors";

const Module2GyroscopeScreen: React.FC = () => {
  const { data, isAvailable } = useGyroscope({
    updateInterval: 100,
    enabled: true,
  });

  if (!isAvailable) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ⚠️ El giroscopio no está disponible en este dispositivo
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.moduleTitle}>Módulo 2: Giroscopio Básico</Text>
          <Text style={styles.moduleDescription}>
            El giroscopio mide la velocidad angular del dispositivo. Rota tu
            dispositivo para ver los cambios en tiempo real.
          </Text>

          <SensorVisualizer
            type="gyroscope"
            data={data}
            showRawValues={true}
            showVisualizer={false}
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

export default Module2GyroscopeScreen;
