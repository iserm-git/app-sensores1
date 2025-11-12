import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { AttendanceStackParamList } from "@types/navigation.types";
import { useShakeDetection } from "@hooks/useShakeDetection";
import { useAccelerometer } from "@hooks/useAccelerometer";
import { ShakeIndicator } from "@components/sensors/ShakeIndicator";
import { Button } from "@components/common/Button";
import { colors } from "@constants/colors";
import attendanceService from "@services/attendanceService";

type RouteType = RouteProp<AttendanceStackParamList, "AttendanceShake">;

const AttendanceShakeScreen: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation();
  const { studentId, studentName, courseId } = route.params;

  const [isProcessing, setIsProcessing] = useState(false);

  // Hook del acelerómetro
  const { data: accelData } = useAccelerometer({
    updateInterval: 100,
    enabled: true,
  });

  const shakeDetection = useShakeDetection({
    threshold: 35,
    timeWindow: 500,
    requiredShakes: 3,
    enabled: true,
  });

  // Registrar datos de movimiento continuamente
  useEffect(() => {
    if (accelData) {
      attendanceService.recordMovement(accelData);
      console.log(
        "📊 Datos registrados:",
        accelData.x.toFixed(2),
        accelData.y.toFixed(2),
        accelData.z.toFixed(2)
      );
    }
  }, [accelData]);

  // Registrar intensidad de shakes
  useEffect(() => {
    if (shakeDetection.isShaking && shakeDetection.lastShakeIntensity) {
      attendanceService.recordShake(shakeDetection.lastShakeIntensity);
      console.log(
        "🔥 Shake detectado! Count:",
        shakeDetection.shakeCount,
        "Intensidad:",
        shakeDetection.lastShakeIntensity.toFixed(2)
      );
    }
  }, [shakeDetection.isShaking]);

  useEffect(() => {
    console.log("👉 Shake Count actual:", shakeDetection.shakeCount);
    if (shakeDetection.shakeCount >= 3 && !isProcessing) {
      console.log("✅ 3 shakes alcanzados! Procesando...");
      handleAttendance();
    }
  }, [shakeDetection.shakeCount, isProcessing]);

  const handleAttendance = async () => {
    setIsProcessing(true);

    try {
      console.log("📝 Marcando asistencia...");
      const result = await attendanceService.markAttendance(
        studentId,
        courseId,
        "shake"
      );

      if (result.success) {
        console.log(
          "Asistencia registrada! Trust score:",
          result.record?.metadata?.trustScore
        );
        Alert.alert(
          "Asistencia Registrada",
          `${studentName}, tu asistencia ha sido registrada exitosamente!\n\nConfianza: ${(
            (result.record?.metadata?.trustScore || 0) * 100
          ).toFixed(0)}%`,
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        console.log("Error:", result.error);
        Alert.alert(
          "Error",
          result.error || "No se pudo registrar la asistencia"
        );
        shakeDetection.reset();
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("💥 Error crítico:", error);
      Alert.alert("Error", "Ocurrió un error al procesar la asistencia");
      shakeDetection.reset();
      setIsProcessing(false);
    }
  };

  console.log("Screen render:", {
    shakeCount: shakeDetection.shakeCount,
    isShaking: shakeDetection.isShaking,
    isProcessing,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Registro de Asistencia</Text>
        <Text style={styles.studentName}>{studentName}</Text>

        <Text style={styles.instructions}>
          Agita tu dispositivo 3 veces para registrar tu asistencia
        </Text>

        {/* ✅ AGREGAR: Debug info */}
        {__DEV__ && (
          <Text style={styles.debugText}>
            Debug: {shakeDetection.shakeCount}/3 shakes
            {"\n"}Threshold: 25
            {"\n"}Última intensidad:{" "}
            {shakeDetection.lastShakeIntensity?.toFixed(2) || "N/A"}
          </Text>
        )}

        <View style={styles.indicatorContainer}>
          <ShakeIndicator
            isShaking={shakeDetection.isShaking}
            shakeCount={shakeDetection.shakeCount}
            requiredShakes={3}
            intensity={shakeDetection.lastShakeIntensity}
          />
        </View>

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.cancelButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  studentName: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 32,
  },
  instructions: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  debugText: {
    // ✅ AGREGAR
    fontSize: 12,
    color: colors.text.light,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "monospace",
  },
  indicatorContainer: {
    marginBottom: 32,
  },
  cancelButton: {
    marginTop: 16,
  },
});

export default AttendanceShakeScreen;
