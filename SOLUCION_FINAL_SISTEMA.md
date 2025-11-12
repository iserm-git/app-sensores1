# 🔴 SOLUCIÓN DEFINITIVA - Requiere Contraseña de Administrador

## 🎯 PROBLEMA IDENTIFICADO

El límite del sistema operativo macOS es de **256 archivos** (muy bajo).

```bash
launchctl limit maxfiles
# Resultado: maxfiles    256            unlimited
```

Este es el límite **global del sistema**, y `ulimit -n` solo funciona para el proceso actual, no es suficiente.

---

## ✅ SOLUCIÓN (Requiere contraseña de administrador)

### Paso 1: Aumentar el límite del sistema

**Abre tu terminal y ejecuta este comando** (te pedirá tu contraseña):

```bash
sudo launchctl limit maxfiles 524288 unlimited
```

### Paso 2: Verificar que se aplicó

```bash
launchctl limit maxfiles
```

Deberías ver:
```
maxfiles    524288         unlimited
```

### Paso 3: Iniciar la app

```bash
ulimit -n 655360 && npx expo start --lan
```

---

## 🚀 COMANDO COMPLETO (Copy-Paste)

```bash
# Paso 1: Aumentar límite del sistema (requiere contraseña)
sudo launchctl limit maxfiles 524288 unlimited

# Paso 2: Verificar
launchctl limit maxfiles

# Paso 3: Iniciar app
ulimit -n 655360 && npx expo start --lan
```

---

## 💡 ¿Por qué esto funciona?

| Antes | Después |
|-------|---------|
| Límite del sistema: 256 | Límite del sistema: 524,288 |
| Metro Bundler necesita: ~2000 | ✅ Suficiente espacio |
| Error EMFILE: Sí | Error EMFILE: No |

---

## ⚠️ Nota Importante

Este cambio:
- ✅ Es **seguro** para tu Mac
- ✅ Es **temporal** (se resetea al reiniciar)
- ✅ Es **necesario** para Metro Bundler
- ⚠️ Requiere **contraseña de administrador**

---

## 🔄 Para Hacerlo Permanente

Si quieres que persista después de reiniciar tu Mac:

### Opción A: Crear archivo plist

```bash
sudo nano /Library/LaunchDaemons/limit.maxfiles.plist
```

Pega este contenido:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>limit.maxfiles</string>
    <key>ProgramArguments</key>
    <array>
      <string>launchctl</string>
      <string>limit</string>
      <string>maxfiles</string>
      <string>524288</string>
      <string>unlimited</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
  </dict>
</plist>
```

Guarda (Ctrl+O, Enter, Ctrl+X) y ejecuta:

```bash
sudo chown root:wheel /Library/LaunchDaemons/limit.maxfiles.plist
sudo chmod 644 /Library/LaunchDaemons/limit.maxfiles.plist
sudo launchctl load -w /Library/LaunchDaemons/limit.maxfiles.plist
```

---

## 🎯 RESULTADO ESPERADO

Después de ejecutar `sudo launchctl limit maxfiles 524288 unlimited`, al iniciar la app deberías ver:

```
Starting Metro Bundler...
Using Watchman for fast file watching ✓

› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go

   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄
   █ ▄▄▄ █ █ ▀▀█ █
   █ ███ █ ▀▄█▀▀█
   (QR Code aquí)

› Press a │ open Android
› Press w │ open web
› Press q │ quit
```

**SIN ERRORES EMFILE** ✅

---

## 🆘 SI AÚN NO FUNCIONA

### Opción 1: Reiniciar tu Mac

Después de aumentar el límite y antes de iniciar la app:

```bash
sudo reboot
```

Luego ejecuta:

```bash
launchctl limit maxfiles  # Verificar límite
ulimit -n 655360 && npx expo start --lan
```

### Opción 2: Modo Web (sin sensores)

Si necesitas probar la app YA sin modificar el sistema:

```bash
npx expo start --web
```

Esto abre la app en el navegador (sin sensores, pero puedes ver la navegación).

---

## 📊 Comparación de Soluciones

| Solución | Efectividad | Requiere sudo | Permanencia |
|----------|-------------|---------------|-------------|
| ulimit -n | ⭐ | No | Sesión actual |
| launchctl (temporal) | ⭐⭐⭐⭐⭐ | Sí | Hasta reiniciar |
| launchctl + plist | ⭐⭐⭐⭐⭐ | Sí | Permanente |
| npx expo start --web | ⭐⭐⭐ | No | - |

**Recomendación**: launchctl (temporal) para probar, luego hacer permanente si funciona.

---

## ✅ COMANDO FINAL (El que SÍ funcionará)

**Ejecuta esto en tu terminal:**

```bash
# 1. Aumentar límite del sistema (te pedirá contraseña)
sudo launchctl limit maxfiles 524288 unlimited

# 2. Verificar cambio
launchctl limit maxfiles

# 3. Limpiar e iniciar
rm -rf .expo node_modules/.cache && ulimit -n 655360 && npx expo start --lan --clear
```

---

## 🎉 UNA VEZ QUE FUNCIONE

Tu flujo normal será:

```bash
# Cada vez que quieras iniciar la app:
npm start
```

**O con cache limpio:**

```bash
npx expo start --clear
```

---

## 📝 RESUMEN DEL PROBLEMA

**Error raíz**: macOS tiene `maxfiles 256` (muy bajo)
**Solución**: Aumentar a `maxfiles 524288`
**Comando**: `sudo launchctl limit maxfiles 524288 unlimited`
**Resultado**: Metro Bundler funciona perfectamente

---

**🚀 ¡Ejecuta el comando con sudo y tu app funcionará!**

## 💬 Siguiente Paso

Una vez que ejecutes el comando sudo y la app inicie correctamente:

1. **Escanea el QR** con Expo Go en tu móvil
2. **Espera 30 segundos** (compilación inicial)
3. **Prueba los sensores**:
   - Sensor Lab → Módulo 1 (Acelerómetro)
   - Asistencia → Registrar (Shake detection)

---

**🔐 Necesitarás ingresar tu contraseña de macOS para ejecutar el comando sudo**
