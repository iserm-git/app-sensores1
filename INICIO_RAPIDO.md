# 🚀 Inicio Rápido

## Comandos Esenciales

### 1. Instalación (Primera vez)
```bash
cd /Users/iserm/apps/reactn/v2025/app-sensores1
npm install
```

### 2. Iniciar la Aplicación
```bash
npm start
```

### 3. Ejecutar en Android
```bash
npm run android
```

### 4. Ejecutar en iOS (solo macOS)
```bash
npm run ios
```

---

## 📱 Usar en Dispositivo Físico (Recomendado)

1. Instala **Expo Go** en tu móvil:
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Ejecuta `npm start`

3. Escanea el código QR:
   - **iOS**: Usa la cámara nativa
   - **Android**: Usa la app Expo Go

---

## 🔧 Solución Rápida de Problemas

### Error al instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

### Cache de Metro
```bash
npx expo start --clear
```

### Resetear Expo
```bash
npx expo start -c
```

---

## 📍 Navegar en la App

1. **Pantalla Principal** → 2 opciones:
   - 🔬 **Sensor Lab** (demo educativo)
   - ✅ **Asistencia** (registro con shake)

2. **Sensor Lab** → 5 módulos:
   - Módulo 1: Acelerómetro ✅ FUNCIONAL
   - Módulo 2: Giroscopio ✅ FUNCIONAL
   - Módulos 3-5: En construcción

3. **Asistencia** → 4 opciones:
   - Registrar Asistencia ✅ FUNCIONAL
   - Lista, Estadísticas, Reportes: En construcción

---

## ⚡ Prueba Rápida

### Test del Acelerómetro
1. Abrir app → Sensor Lab → Módulo 1
2. Mover el dispositivo
3. Ver valores cambiar en tiempo real

### Test del Shake
1. Abrir app → Asistencia → Registrar Asistencia
2. Agitar el dispositivo 3 veces
3. Ver registro de asistencia exitoso

---

## 📊 Estructura de Carpetas

```
src/
├── components/     # Componentes reutilizables
├── screens/        # Pantallas de la app
├── hooks/          # Hooks personalizados
├── services/       # Lógica de negocio
├── navigation/     # Configuración de rutas
├── types/          # Tipos TypeScript
├── utils/          # Utilidades
└── constants/      # Constantes (colores, config)
```

---

## 🎯 Siguiente Paso

Lee `INSTRUCCIONES.md` para información detallada.

---

**¡Listo para empezar!** 🚀
