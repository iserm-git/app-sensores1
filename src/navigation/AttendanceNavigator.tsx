import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AttendanceStackParamList } from '@types/navigation.types';
import AttendanceMenuScreen from '@screens/attendance/AttendanceMenuScreen';
import AttendanceShakeScreen from '@screens/attendance/AttendanceShakeScreen';
import AttendanceListScreen from '@screens/attendance/AttendanceListScreen';
import AttendanceStatsScreen from '@screens/attendance/AttendanceStatsScreen';
import AttendanceReportScreen from '@screens/attendance/AttendanceReportScreen';

const Stack = createStackNavigator<AttendanceStackParamList>();

const AttendanceNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="AttendanceMenu"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="AttendanceMenu"
        component={AttendanceMenuScreen}
        options={{ title: 'Asistencia' }}
      />
      <Stack.Screen
        name="AttendanceShake"
        component={AttendanceShakeScreen}
        options={{ title: 'Registrar Asistencia' }}
      />
      <Stack.Screen
        name="AttendanceList"
        component={AttendanceListScreen}
        options={{ title: 'Lista de Asistencia' }}
      />
      <Stack.Screen
        name="AttendanceStats"
        component={AttendanceStatsScreen}
        options={{ title: 'Estadísticas' }}
      />
      <Stack.Screen
        name="AttendanceReport"
        component={AttendanceReportScreen}
        options={{ title: 'Reportes' }}
      />
    </Stack.Navigator>
  );
};

export default AttendanceNavigator;
