# Sistema de Gestión Escolar con Sensores

Aplicación móvil React Native que integra sensores del dispositivo para un sistema de gestión escolar educativo.

## Características

### 📱 Sensor Lab (Demo Educativo)
- **Módulo 1**: Acelerómetro básico con visualización en tiempo real
- **Módulo 2**: Giroscopio básico
- **Módulos 3-5**: En construcción (sensores combinados, casos reales, proyecto final)

### ✅ Sistema de Asistencia
- Registro de asistencia mediante detección de shake
- Sistema anti-fraude con análisis de patrones de movimiento
- Estadísticas y reportes de asistencia
- Almacenamiento local con AsyncStorage

## Stack Tecnológico

- **React Native 0.74.0** con **Expo SDK 51**
- **TypeScript 5.3+** con strict mode
- **React Navigation 6.x** para navegación
- **expo-sensors** para acelerómetro y giroscopio
- **AsyncStorage** para persistencia
- **expo-linear-gradient** para gradientes

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

## Ejecución

```bash
# Iniciar Expo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios
```

## Estructura del Proyecto

```
src/
├── types/              # Tipos TypeScript
├── hooks/              # Hooks personalizados
├── utils/              # Utilidades
├── services/           # Servicios (asistencia, storage)
├── components/         # Componentes reutilizables
├── screens/            # Pantallas de la app
├── navigation/         # Configuración de navegación
└── constants/          # Constantes (colores, configuración)
```

## Características Implementadas

✅ Detección de acelerómetro y giroscopio
✅ Visualización de datos de sensores en tiempo real
✅ Detección de shake (agitado)
✅ Sistema anti-fraude para asistencia
✅ Navegación completa entre módulos
✅ Componentes reutilizables
✅ TypeScript estricto sin `any`

## Próximas Mejoras

- Implementar módulos 3-5 de Sensor Lab
- Completar pantallas de estadísticas y reportes
- Agregar autenticación de usuarios
- Sincronización con backend
- Mejoras en UI/UX

## Licencia

MIT

---

🤖 Generado con [Claude Code](https://claude.com/claude-code)
