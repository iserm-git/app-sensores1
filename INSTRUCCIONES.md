# Instrucciones de Instalación y Ejecución

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Expo CLI (se instala automáticamente)
- Un dispositivo físico con Android/iOS O un emulador
  - **IMPORTANTE**: Los sensores solo funcionan en dispositivos físicos reales

## 🚀 Instalación

### Paso 1: Instalar Dependencias

```bash
cd /Users/iserm/apps/reactn/v2025/app-sensores1
npm install
```

### Paso 2: Crear Assets (Opcional)

Los assets de imágenes (icon.png, splash.png) son opcionales para desarrollo.
Puedes crear placeholders simples o dejar que Expo use los predeterminados.

## ▶️ Ejecución

### Iniciar el Servidor de Desarrollo

```bash
npm start
```

Esto abrirá Expo DevTools en tu navegador.

### Ejecutar en Dispositivo Físico (Recomendado)

1. Instala **Expo Go** en tu dispositivo móvil:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Escanea el código QR que aparece en la terminal o en el navegador

3. La app se cargará en tu dispositivo

### Ejecutar en Emulador

#### Android
```bash
npm run android
```

#### iOS (solo en macOS)
```bash
npm run ios
```

**NOTA**: Los sensores (acelerómetro, giroscopio) NO funcionarán en emuladores.

## 🔧 Solución de Problemas

### Error: Module not found

Si obtienes errores de módulos no encontrados:
```bash
npm install
rm -rf node_modules
npm cache clean --force
npm install
```

### Error: Metro Bundler

Si el bundler no inicia:
```bash
npx expo start --clear
```

### Error de TypeScript

Si hay errores de tipos:
```bash
npm install --save-dev @types/react @types/react-native
```

## 📱 Uso de la Aplicación

### Pantalla Principal
- **Sensor Lab**: Demo educativo con módulos de sensores
- **Asistencia**: Sistema de registro con detección de shake

### Sensor Lab
1. Módulo 1: Acelerómetro - Muestra datos en tiempo real
2. Módulo 2: Giroscopio - Muestra velocidad angular
3. Módulos 3-5: En construcción

### Sistema de Asistencia
1. **Registrar Asistencia**: Agita tu dispositivo 3 veces
2. **Lista**: Ver registros (en construcción)
3. **Estadísticas**: Ver tu historial (en construcción)
4. **Reportes**: Generar reportes (en construcción)

## 🎯 Características Implementadas

✅ Navegación completa entre pantallas
✅ Detección de acelerómetro y giroscopio
✅ Visualización de datos de sensores
✅ Detección de shake (agitado)
✅ Sistema anti-fraude básico
✅ Almacenamiento local con AsyncStorage
✅ TypeScript estricto
✅ Componentes reutilizables

## 🔨 Próximos Pasos

- Completar módulos 3-5 de Sensor Lab
- Implementar pantallas de estadísticas y reportes
- Agregar ejercicios interactivos (nivel de burbuja, laberinto, contador de pasos)
- Mejorar el sistema anti-fraude
- Agregar autenticación
- Sincronización con backend

## 📚 Recursos

- [Documentación de Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Sensors](https://docs.expo.dev/versions/latest/sdk/sensors/)
- [TypeScript](https://www.typescriptlang.org/)

## 🐛 Reportar Problemas

Si encuentras algún problema, verifica:
1. Que todas las dependencias estén instaladas
2. Que estés usando un dispositivo físico para probar sensores
3. Que los permisos de sensores estén habilitados en tu dispositivo

---

🤖 Generado con [Claude Code](https://claude.com/claude-code)
