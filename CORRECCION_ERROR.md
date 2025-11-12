# 🔧 Corrección del Error: "module expo is not installed"

## 📋 Diagnóstico del Problema

El error ocurre porque las dependencias del proyecto no están instaladas. El proyecto tiene el `package.json` configurado, pero falta ejecutar la instalación.

## ✅ Solución (Paso a Paso)

### **Opción 1: Instalación Simple (Recomendada)**

```bash
# 1. Asegúrate de estar en el directorio correcto
cd /Users/iserm/apps/reactn/v2025/app-sensores1

# 2. Instalar todas las dependencias
npm install

# 3. Iniciar el proyecto
npm start
```

### **Opción 2: Si la Opción 1 Falla**

Si encuentras errores durante `npm install`, prueba esto:

```bash
# 1. Limpiar cache de npm
npm cache clean --force

# 2. Instalar dependencias
npm install

# 3. Si aún hay problemas, instalar Expo CLI globalmente
npm install -g expo-cli

# 4. Iniciar el proyecto
npm start
```

### **Opción 3: Instalación Manual de Expo (Solo si fallan las anteriores)**

```bash
# 1. Instalar Expo específicamente primero
npm install expo@~51.0.0

# 2. Instalar el resto de dependencias
npm install

# 3. Iniciar el proyecto
npm start
```

## 🔍 Verificación

Después de instalar, deberías ver:

```bash
# Verificar que node_modules existe
ls -la | grep node_modules
# Debería mostrar: drwxr-xr-x ... node_modules

# Verificar que expo está instalado
ls node_modules | grep expo
# Debería mostrar múltiples paquetes de expo
```

## 📊 Tiempo Estimado

- **Primera instalación**: 2-5 minutos (depende de tu conexión a internet)
- **Instalaciones posteriores**: < 1 minuto

## ⚠️ Errores Comunes Durante la Instalación

### Error 1: "EACCES: permission denied"
**Solución:**
```bash
sudo npm install
# O mejor, arreglar permisos de npm:
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Error 2: "npm ERR! network"
**Solución:**
```bash
# Verificar conexión a internet
ping google.com

# Si estás detrás de un proxy, configurar npm:
npm config set proxy http://tu-proxy:puerto
```

### Error 3: "peer dependencies conflict"
**Solución:**
```bash
# Usar --legacy-peer-deps
npm install --legacy-peer-deps
```

## 🎯 Resultado Esperado

Después de `npm install`, deberías ver algo como:

```
added 1234 packages, and audited 1235 packages in 2m

123 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Y después de `npm start`:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

## 📱 Después de la Instalación

Una vez que `npm start` funcione correctamente:

1. **Instala Expo Go** en tu dispositivo móvil:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escanea el código QR** que aparece en la terminal

3. **¡Disfruta la app!** 🎉

## 💡 Comandos Útiles Post-Instalación

```bash
# Limpiar cache de Expo
npx expo start --clear

# Reinstalar todo desde cero
rm -rf node_modules package-lock.json
npm install

# Ver versión de Expo instalada
npm list expo

# Actualizar Expo (si es necesario)
npm update expo
```

## 🆘 ¿Aún Tienes Problemas?

Si después de seguir estos pasos aún tienes problemas:

1. **Verifica tu versión de Node.js**:
   ```bash
   node --version
   # Debe ser v18.x o superior
   ```

2. **Verifica tu versión de npm**:
   ```bash
   npm --version
   # Debe ser v9.x o superior
   ```

3. **Si Node.js está desactualizado**:
   - Visita: https://nodejs.org/
   - Descarga e instala la versión LTS

## ✅ Checklist de Verificación

Antes de ejecutar `npm start`, verifica:

- [ ] Estás en el directorio correcto (`/Users/iserm/apps/reactn/v2025/app-sensores1`)
- [ ] Node.js está instalado (`node --version`)
- [ ] npm está instalado (`npm --version`)
- [ ] Tienes conexión a internet
- [ ] Ejecutaste `npm install` sin errores
- [ ] Existe la carpeta `node_modules`
- [ ] Existe el archivo `package-lock.json`

## 🚀 Comando Final

Una vez todo esté listo:

```bash
npm start
```

**¡Y listo!** La aplicación debería iniciar correctamente.

---

**Nota**: La primera vez que ejecutes `npm install` tomará varios minutos porque descarga más de 1000 paquetes. ¡Ten paciencia! ☕

---

📝 Si sigues teniendo problemas, copia y pega el error completo para poder ayudarte mejor.
