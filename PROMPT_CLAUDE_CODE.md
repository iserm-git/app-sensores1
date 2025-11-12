# PROMPT PARA CLAUDE CODE
## Sistema de Gestión Escolar con Integración de Sensores - React Native + TypeScript

---

## 🎯 OBJETIVO

Crear una aplicación móvil en React Native con TypeScript que integre funcionalidades de sensores del dispositivo (acelerómetro y giroscopio) para un sistema de gestión escolar educativo.

El proyecto debe implementar DOS aplicaciones:
1. **Sensor Lab**: Demo educativo independiente para aprender sensores (5 módulos progresivos)
2. **Gestión Escolar**: Aplicación principal con módulo de asistencia integrado con sensores

---

## 📋 ESPECIFICACIONES TÉCNICAS

### Stack Tecnológico
- **Framework**: React Native 0.74.0 con Expo SDK 51
- **Lenguaje**: TypeScript 5.3+ con strict mode
- **Navegación**: React Navigation 6.x (Stack Navigator)
- **Sensores**: expo-sensors + react-native-sensors
- **Estado**: React Hooks (useState, useEffect, useCallback)
- **Almacenamiento**: AsyncStorage
- **Animaciones**: React Native Animated API
- **Estilo**: StyleSheet nativo (no styled-components)

### Requisitos de Arquitectura
- ✅ Arquitectura modular con separación de responsabilidades
- ✅ Hooks personalizados para lógica reutilizable
- ✅ Servicios para lógica de negocio
- ✅ Componentes presentacionales vs contenedores
- ✅ Tipos TypeScript estrictos (no any)
- ✅ Manejo de errores robusto
- ✅ Código autodocumentado con JSDoc

---

## 📁 ESTRUCTURA DEL PROYECTO

```
gestion-escolar-sensores/
├── App.tsx                          # Entry point
├── app.json                         # Configuración Expo
├── package.json                     # Dependencias
├── tsconfig.json                    # Configuración TypeScript
├── babel.config.js                  # Configuración Babel
│
└── src/
    ├── types/
    │   ├── sensors.types.ts         # Tipos de sensores (ARCHIVO PROPORCIONADO)
    │   ├── attendance.types.ts      # Tipos de asistencia
    │   ├── navigation.types.ts      # Tipos de navegación
    │   └── index.ts                 # Re-exports
    │
    ├── hooks/
    │   ├── useAccelerometer.ts      # Hook acelerómetro
    │   ├── useGyroscope.ts          # Hook giroscopio
    │   ├── useShakeDetection.ts     # Hook detección shake
    │   ├── useDeviceOrientation.ts  # Hook orientación
    │   ├── useStepCounter.ts        # Hook contador de pasos
    │   └── index.ts
    │
    ├── utils/
    │   ├── sensorUtils.ts           # Utilidades sensores (ARCHIVO PROPORCIONADO)
    │   ├── dateUtils.ts             # Utilidades de fecha
    │   ├── validators.ts            # Validaciones
    │   └── index.ts
    │
    ├── services/
    │   ├── attendanceService.ts     # Servicio asistencia (ARCHIVO PROPORCIONADO)
    │   ├── storageService.ts        # Servicio de almacenamiento
    │   └── index.ts
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx           # Botón reutilizable
    │   │   ├── Card.tsx             # Tarjeta reutilizable
    │   │   ├── Header.tsx           # Header reutilizable
    │   │   ├── LoadingSpinner.tsx   # Spinner de carga
    │   │   └── ErrorMessage.tsx     # Mensaje de error
    │   │
    │   └── sensors/
    │       ├── SensorVisualizer.tsx      # Visualizador (ARCHIVO PROPORCIONADO)
    │       ├── SensorCard.tsx            # Tarjeta de sensor
    │       ├── ShakeIndicator.tsx        # Indicador de shake
    │       ├── OrientationIndicator.tsx  # Indicador de orientación
    │       ├── ProgressBar.tsx           # Barra de progreso
    │       └── SensorStats.tsx           # Estadísticas de sensor
    │
    ├── screens/
    │   ├── home/
    │   │   └── HomeScreen.tsx                # Pantalla principal
    │   │
    │   ├── sensorLab/                        # DEMO EDUCATIVO
    │   │   ├── SensorLabMenuScreen.tsx       # Menú principal del lab
    │   │   ├── Module1AccelerometerScreen.tsx # Módulo 1
    │   │   ├── Module2GyroscopeScreen.tsx     # Módulo 2
    │   │   ├── Module3CombinedScreen.tsx      # Módulo 3
    │   │   ├── Module4RealCasesScreen.tsx     # Módulo 4
    │   │   ├── Module5ProjectScreen.tsx       # Módulo 5
    │   │   └── exercises/
    │   │       ├── BubbleLevelExercise.tsx
    │   │       ├── MazeGameExercise.tsx
    │   │       └── StepCounterExercise.tsx
    │   │
    │   └── attendance/                        # APP PRINCIPAL
    │       ├── AttendanceMenuScreen.tsx
    │       ├── AttendanceShakeScreen.tsx      # Registro por shake
    │       ├── AttendanceListScreen.tsx       # Lista de asistencia
    │       ├── AttendanceStatsScreen.tsx      # Estadísticas
    │       └── AttendanceReportScreen.tsx     # Reportes
    │
    ├── navigation/
    │   ├── AppNavigator.tsx              # Navegador principal
    │   ├── SensorLabNavigator.tsx        # Navegador Sensor Lab
    │   ├── AttendanceNavigator.tsx       # Navegador Asistencia
    │   └── index.ts
    │
    ├── constants/
    │   ├── colors.ts                     # Paleta de colores
    │   ├── typography.ts                 # Tipografía
    │   ├── spacing.ts                    # Espaciados
    │   └── sensorConfig.ts               # Configuraciones de sensores
    │
    └── assets/
        └── images/
```

---

## 🔧 CONFIGURACIÓN INICIAL

### 1. package.json

```json
{
  "name": "gestion-escolar-sensores",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.74.0",
    "expo": "~51.0.0",
    "expo-status-bar": "~1.12.1",
    "expo-sensors": "~13.0.9",
    "react-native-sensors": "^7.3.6",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "react-native-gesture-handler": "~2.16.0",
    "react-native-reanimated": "~3.10.0",
    "react-native-screens": "~3.31.0",
    "react-native-safe-area-context": "4.10.0",
    "@react-native-async-storage/async-storage": "1.23.1",
    "expo-linear-gradient": "~13.0.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@types/react": "~18.2.79",
    "@types/react-native": "~0.72.0",
    "typescript": "~5.3.3"
  },
  "private": true
}
```

### 2. tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "jsx": "react-native",
    "lib": ["esnext"],
    "types": ["react-native", "jest"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"],
      "@navigation/*": ["src/navigation/*"],
      "@constants/*": ["src/constants/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"],
  "exclude": ["node_modules"]
}
```

### 3. app.json

```json
{
  "expo": {
    "name": "Gestión Escolar - Sensores",
    "slug": "gestion-escolar-sensores",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#667eea"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "infoPlist": {
        "NSMotionUsageDescription": "Esta aplicación necesita acceso a los sensores de movimiento para registrar asistencia y funciones educativas"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#667eea"
      },
      "permissions": [
        "VIBRATE",
        "android.permission.VIBRATE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-sensors"
    ]
  }
}
```

---

## 📝 IMPLEMENTACIÓN DETALLADA

### FASE 1: Setup Inicial

**Comando inicial**:
```bash
npx create-expo-app gestion-escolar-sensores --template expo-template-blank-typescript
cd gestion-escolar-sensores
npm install expo-sensors react-native-sensors @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage expo-linear-gradient rxjs
```

**Estructura de carpetas**:
```bash
mkdir -p src/{types,hooks,utils,services,components/{common,sensors},screens/{home,sensorLab/exercises,attendance},navigation,constants}
```

---

### FASE 2: Archivos Base

#### src/constants/colors.ts
```typescript
export const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#4ecdc4',
  
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196F3',
  
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
    white: '#ffffff',
  },
  
  background: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    card: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  sensor: {
    x: '#ff6b6b',
    y: '#4ecdc4',
    z: '#ffe66d',
  },
  
  border: '#e0e0e0',
  shadow: '#000000',
};
```

#### src/constants/sensorConfig.ts
```typescript
export const sensorConfig = {
  accelerometer: {
    updateInterval: 100,
    enabled: true,
  },
  gyroscope: {
    updateInterval: 100,
    enabled: true,
  },
  shake: {
    threshold: 15,
    timeWindow: 500,
    requiredShakes: 3,
  },
  antiFraud: {
    minShakeIntensity: 10.0,
    maxShakeIntensity: 50.0,
    minMovementVariance: 5.0,
    requiredTrustScore: 0.7,
  },
};
```

#### src/types/navigation.types.ts
```typescript
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  SensorLab: undefined;
  Attendance: undefined;
};

export type SensorLabStackParamList = {
  SensorLabMenu: undefined;
  Module1: undefined;
  Module2: undefined;
  Module3: undefined;
  Module4: undefined;
  Module5: undefined;
  BubbleLevel: undefined;
  MazeGame: undefined;
  StepCounter: undefined;
};

export type AttendanceStackParamList = {
  AttendanceMenu: undefined;
  AttendanceShake: { studentId: string; studentName: string; courseId: string };
  AttendanceList: { courseId: string };
  AttendanceStats: { studentId: string };
  AttendanceReport: { courseId: string };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type SensorLabMenuNavigationProp = StackNavigationProp<SensorLabStackParamList, 'SensorLabMenu'>;
export type AttendanceShakeNavigationProp = StackNavigationProp<AttendanceStackParamList, 'AttendanceShake'>;
export type AttendanceShakeRouteProp = RouteProp<AttendanceStackParamList, 'AttendanceShake'>;
```

---

### FASE 3: Componentes Comunes

#### src/components/common/Button.tsx
```typescript
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const containerStyle = [
    styles.container,
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const textStyleFinal = [
    styles.text,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.text.white : colors.primary} />
      ) : (
        <>
          {icon}
          <Text style={textStyleFinal}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    minHeight: 50,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.text.white,
  },
  secondaryText: {
    color: colors.text.white,
  },
  outlineText: {
    color: colors.primary,
  },
  textText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.text.light,
  },
});
```

#### src/components/common/Card.tsx
```typescript
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '@constants/colors';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevation = 3,
}) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[styles.card, { elevation }, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 15,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
});
```

---

### FASE 4: Hooks (Implementar según propuesta_sensores.md)

#### src/hooks/useAccelerometer.ts
**IMPORTANTE**: Usar el código completo proporcionado en propuesta_sensores.md sección 4.3

#### src/hooks/useGyroscope.ts
**IMPORTANTE**: Usar el código completo proporcionado en propuesta_sensores.md sección 4.4

#### src/hooks/useShakeDetection.ts
**IMPORTANTE**: Usar el código completo proporcionado en propuesta_sensores.md sección 4.5

#### src/hooks/useDeviceOrientation.ts
**IMPORTANTE**: Usar el código completo proporcionado en propuesta_sensores.md sección 4.6

---

### FASE 5: Navegación

#### src/navigation/AppNavigator.tsx
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@types/navigation.types';
import HomeScreen from '@screens/home/HomeScreen';
import SensorLabNavigator from './SensorLabNavigator';
import AttendanceNavigator from './AttendanceNavigator';

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
```

#### src/navigation/SensorLabNavigator.tsx
```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SensorLabStackParamList } from '@types/navigation.types';
import SensorLabMenuScreen from '@screens/sensorLab/SensorLabMenuScreen';
import Module1AccelerometerScreen from '@screens/sensorLab/Module1AccelerometerScreen';
import Module2GyroscopeScreen from '@screens/sensorLab/Module2GyroscopeScreen';
// ... importar otros módulos

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
      {/* Agregar más pantallas */}
    </Stack.Navigator>
  );
};

export default SensorLabNavigator;
```

---

### FASE 6: Pantallas Principales

#### src/screens/home/HomeScreen.tsx
```typescript
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '@types/navigation.types';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@constants/colors';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>📱 Gestión Escolar</Text>
          <Text style={styles.subtitle}>con Integración de Sensores</Text>

          <View style={styles.cardsContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('SensorLab')}
            >
              <Text style={styles.cardIcon}>🔬</Text>
              <Text style={styles.cardTitle}>Sensor Lab</Text>
              <Text style={styles.cardDescription}>
                Demo educativo con 5 módulos para aprender sobre sensores
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Attendance')}
            >
              <Text style={styles.cardIcon}>✅</Text>
              <Text style={styles.cardTitle}>Asistencia</Text>
              <Text style={styles.cardDescription}>
                Sistema de registro con detección de shake y anti-fraude
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 40,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
```

#### src/screens/sensorLab/Module1AccelerometerScreen.tsx
```typescript
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAccelerometer } from '@hooks/useAccelerometer';
import { SensorVisualizer } from '@components/sensors/SensorVisualizer';
import { Button } from '@components/common/Button';
import { colors } from '@constants/colors';

const Module1AccelerometerScreen: React.FC = () => {
  const { data, isAvailable } = useAccelerometer({ updateInterval: 100, enabled: true });

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

          <View style={styles.exerciseSection}>
            <Text style={styles.sectionTitle}>💡 Ejercicio Práctico</Text>
            <Text style={styles.sectionText}>
              Prueba el ejercicio del nivel de burbuja para practicar con el acelerómetro
            </Text>
            <Button
              title="Ir al Nivel de Burbuja"
              onPress={() => {/* navegar a ejercicio */}}
              variant="primary"
              style={styles.exerciseButton}
            />
          </View>
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
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
  },
  exerciseSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: colors.background.card,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  exerciseButton: {
    marginTop: 8,
  },
});

export default Module1AccelerometerScreen;
```

---

## ✅ CRITERIOS DE ÉXITO

### Funcionalidad
- [ ] Todos los sensores funcionan en dispositivo físico
- [ ] Detector de shake funciona correctamente (3 shakes)
- [ ] Sistema anti-fraude calcula trust score > 0.7
- [ ] Navegación fluida entre todas las pantallas
- [ ] Asistencia se guarda en AsyncStorage

### Código
- [ ] 100% TypeScript sin any
- [ ] Todos los componentes tienen props tipadas
- [ ] Hooks siguen mejores prácticas
- [ ] Código documentado con JSDoc

### UI/UX
- [ ] Diseño consistente en todas las pantallas
- [ ] Feedback visual en todas las interacciones
- [ ] Animaciones suaves y naturales
- [ ] Accesible con buenos contrastes

---

## 🚀 ORDEN DE EJECUCIÓN

1. **Setup inicial** (crear proyecto, instalar dependencias)
2. **Copiar archivos proporcionados** (sensors.types.ts, sensorUtils.ts, attendanceService.ts, SensorVisualizer.tsx)
3. **Crear constantes** (colors, sensorConfig, navigation types)
4. **Crear componentes comunes** (Button, Card, Header)
5. **Implementar hooks** (useAccelerometer, useGyroscope, useShakeDetection)
6. **Crear navegadores**
7. **Implementar pantallas** (HomeScreen → SensorLab → Attendance)
8. **Testing en dispositivo físico**

---

## 📚 ARCHIVOS DE REFERENCIA

Los siguientes archivos YA ESTÁN CREADOS en la propuesta y deben copiarse:

1. **sensors.types.ts**: Tipos completos
2. **sensorUtils.ts**: Utilidades y filtros
3. **attendanceService.ts**: Servicio con anti-fraude
4. **SensorVisualizer.tsx**: Componente de visualización

**IMPORTANTE**: NO recrear estos archivos, solo copiarlos y usarlos como base.

---

## 🎯 COMENZAR AHORA

**PRIMER COMANDO**:
```bash
npx create-expo-app gestion-escolar-sensores --template expo-template-blank-typescript
cd gestion-escolar-sensores
```

¡Adelante con la implementación! 🚀
