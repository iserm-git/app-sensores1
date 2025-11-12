import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@types/navigation.types";
import HomeScreen from "@screens/home/HomeScreen";
import SensorLabNavigator from "./SensorLabNavigator";
import AttendanceNavigator from "./AttendanceNavigator";

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SensorLab" component={SensorLabNavigator} />
        <Stack.Screen name="Attendance" component={AttendanceNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
