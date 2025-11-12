import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const AttendanceStatsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📊 Mis Estadísticas</Text>
        <Text style={styles.description}>
          Aquí se mostrarán tus estadísticas de asistencia.{"\n"}
          Esta pantalla está en construcción.
        </Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default AttendanceStatsScreen;
