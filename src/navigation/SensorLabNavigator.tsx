import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SensorLabStackParamList } from '@types/navigation.types';
import SensorLabMenuScreen from '@screens/sensorLab/SensorLabMenuScreen';
import Module1AccelerometerScreen from '@screens/sensorLab/Module1AccelerometerScreen';
import Module2GyroscopeScreen from '@screens/sensorLab/Module2GyroscopeScreen';
import Module3CombinedScreen from '@screens/sensorLab/Module3CombinedScreen';
import Module4RealCasesScreen from '@screens/sensorLab/Module4RealCasesScreen';
import Module5ProjectScreen from '@screens/sensorLab/Module5ProjectScreen';

const Stack = createStackNavigator<SensorLabStackParamList>();

const SensorLabNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SensorLabMenu"
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
        name="SensorLabMenu"
        component={SensorLabMenuScreen}
        options={{ title: 'Sensor Lab' }}
      />
      <Stack.Screen
        name="Module1"
        component={Module1AccelerometerScreen}
        options={{ title: 'Módulo 1: Acelerómetro' }}
      />
      <Stack.Screen
        name="Module2"
        component={Module2GyroscopeScreen}
        options={{ title: 'Módulo 2: Giroscopio' }}
      />
      <Stack.Screen
        name="Module3"
        component={Module3CombinedScreen}
        options={{ title: 'Módulo 3: Combinados' }}
      />
      <Stack.Screen
        name="Module4"
        component={Module4RealCasesScreen}
        options={{ title: 'Módulo 4: Casos Reales' }}
      />
      <Stack.Screen
        name="Module5"
        component={Module5ProjectScreen}
        options={{ title: 'Módulo 5: Proyecto Final' }}
      />
    </Stack.Navigator>
  );
};

export default SensorLabNavigator;
