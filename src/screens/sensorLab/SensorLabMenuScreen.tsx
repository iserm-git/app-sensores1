import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SensorLabStackParamList } from "@types/navigation.types";
import { Card } from "@components/common/Card";
import { colors } from "@constants/colors";

type NavigationProp = StackNavigationProp<
  SensorLabStackParamList,
  "SensorLabMenu"
>;

const SensorLabMenuScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const modules = [
    {
      id: "Module1",
      title: "Módulo 1: Acelerómetro",
      description: "Aprende sobre el acelerómetro y cómo medir movimiento",
      icon: "📱",
      screen: "Module1" as const,
    },
    {
      id: "Module2",
      title: "Módulo 2: Giroscopio",
      description: "Descubre cómo funciona el giroscopio y la rotación",
      icon: "🔄",
      screen: "Module2" as const,
    },
    // {
    //   id: "Module3",
    //   title: "Módulo 3: Sensores Combinados",
    //   description: "Usa múltiples sensores para tareas complejas",
    //   icon: "🎯",
    //   screen: "Module3" as const,
    // },
    // {
    //   id: "Module4",
    //   title: "Módulo 4: Casos Reales",
    //   description: "Aplicaciones prácticas en el mundo real",
    //   icon: "🌍",
    //   screen: "Module4" as const,
    // },
    // {
    //   id: "Module5",
    //   title: "Módulo 5: Proyecto Final",
    //   description: "Pon en práctica todo lo aprendido",
    //   icon: "🚀",
    //   screen: "Module5" as const,
    // },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Demo de sensores</Text>
        </View>

        <View style={styles.modulesContainer}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              onPress={() => navigation.navigate(module.screen)}
            >
              <Card style={styles.moduleCard}>
                <Text style={styles.moduleIcon}>{module.icon}</Text>
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDescription}>
                    {module.description}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
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
  modulesContainer: {
    padding: 16,
    gap: 12,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  moduleIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

export default SensorLabMenuScreen;
