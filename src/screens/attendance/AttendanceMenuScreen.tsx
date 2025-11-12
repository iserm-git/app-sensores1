import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AttendanceStackParamList } from "@types/navigation.types";
import { Card } from "@components/common/Card";
import { colors } from "@constants/colors";

type NavigationProp = StackNavigationProp<
  AttendanceStackParamList,
  "AttendanceMenu"
>;

const AttendanceMenuScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    {
      id: "shake",
      title: "Registrar Asistencia",
      description: "Marca tu asistencia con shake",
      icon: "📳",
      onPress: () =>
        navigation.navigate("AttendanceShake", {
          studentId: "student_001",
          studentName: "Estudiante Demo",
          courseId: "course_001",
        }),
    },
    {
      id: "list",
      title: "Lista de Asistencia",
      description: "Ver registros del curso",
      icon: "📋",
      onPress: () =>
        navigation.navigate("AttendanceList", { courseId: "course_001" }),
    },
    // {
    //   id: "stats",
    //   title: "Mis Estadísticas",
    //   description: "Ver mi historial de asistencia",
    //   icon: "📊",
    //   onPress: () =>
    //     navigation.navigate("AttendanceStats", { studentId: "student_001" }),
    // },
    // {
    //   id: "report",
    //   title: "Reportes",
    //   description: "Generar reportes del curso",
    //   icon: "📈",
    //   onPress: () =>
    //     navigation.navigate("AttendanceReport", { courseId: "course_001" }),
    // },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✅ Asistencia</Text>
        <Text style={styles.subtitle}>Sistema de Registro con Sensores</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.onPress}>
            <Card style={styles.menuCard}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  menuContainer: {
    padding: 16,
    gap: 12,
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

export default AttendanceMenuScreen;
