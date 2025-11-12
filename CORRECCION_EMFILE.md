# 🔧 Solución: Error EMFILE (Too Many Open Files)

## 🔴 Error
```
Error: EMFILE: too many open files, watch
errno: -24
syscall: 'watch'
code: 'EMFILE'
```

## 📋 Causa
macOS tiene un límite bajo de archivos que pueden abrirse simultáneamente. Metro Bundler necesita vigilar muchos archivos del proyecto.

---

## ✅ SOLUCIÓN RÁPIDA (Opción 1 - Recomendada)

### Paso 1: Aumentar el límite temporalmente

```bash
ulimit -n 10000
```

### Paso 2: Verificar que se aplicó

```bash
ulimit -n
```

Debería mostrar: `10000`

### Paso 3: Iniciar la app

```bash
npm start
```

**¡Listo!** Esto funciona hasta que cierres la terminal.

---

## ✅ SOLUCIÓN PERMANENTE (Opción 2)

Si quieres que persista entre sesiones:

### Paso 1: Crear archivo de configuración

```bash
echo "ulimit -n 10000" >> ~/.zshrc
```

O si usas bash:
```bash
echo "ulimit -n 10000" >> ~/.bash_profile
```

### Paso 2: Recargar configuración

```bash
source ~/.zshrc
```

O si usas bash:
```bash
source ~/.bash_profile
```

### Paso 3: Verificar

```bash
ulimit -n
```

### Paso 4: Iniciar la app

```bash
npm start
```

---

## ✅ SOLUCIÓN ALTERNATIVA (Opción 3)

Si las anteriores no funcionan, instala watchman:

### Instalar Watchman (con Homebrew)

```bash
# Si no tienes Homebrew instalado:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar watchman:
brew install watchman
```

### Iniciar la app

```bash
npm start
```

Watchman es más eficiente manejando archivos y resolverá el problema.

---

## 🚀 COMANDO COMPLETO (Todo en Uno)

Copia y pega todo esto en la terminal:

```bash
ulimit -n 10000 && npm start
```

Este comando:
1. Aumenta el límite de archivos
2. Inicia la app inmediatamente

---

## 🔍 Verificación

### Antes de aplicar la solución:
```bash
ulimit -n
# Mostrará algo como: 256 (muy bajo)
```

### Después de aplicar la solución:
```bash
ulimit -n
# Debería mostrar: 10000 (suficiente)
```

---

## 💡 ¿Por qué pasa esto?

macOS tiene límites de seguridad por defecto:
- **Límite por defecto**: 256 archivos
- **Metro Bundler necesita**: ~2000+ archivos para vigilar
- **Solución**: Aumentar a 10,000 (seguro y suficiente)

---

## ⚠️ Nota Importante

**NO** necesitas permisos de sudo para `ulimit -n 10000`

Si te pide contraseña, algo está mal. Usa la solución alternativa con watchman.

---

## 📊 Comparación de Soluciones

| Solución | Tiempo | Permanencia | Complejidad |
|----------|--------|-------------|-------------|
| ulimit temporal | 5 segundos | Sesión actual | ⭐ Muy fácil |
| ulimit permanente | 1 minuto | Siempre | ⭐⭐ Fácil |
| watchman | 2-5 minutos | Siempre | ⭐⭐⭐ Medio |

---

## ✅ Solución Más Rápida (COPY-PASTE)

**Abre tu terminal y ejecuta:**

```bash
ulimit -n 10000 && npm start
```

**¡ESO ES TODO!** 🎉

---

## 🆘 Si Aún No Funciona

### Opción A: Watchman
```bash
brew install watchman
npm start
```

### Opción B: Reiniciar Metro con límite
```bash
ulimit -n 10000
npx expo start --clear
```

### Opción C: Limpiar cache
```bash
ulimit -n 10000
rm -rf .expo
npm start -- --reset-cache
```

---

## 🎯 Resultado Esperado

Después de aplicar la solución, deberías ver:

```
Starting Metro Bundler...

› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go

   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄
   █ ▄▄▄ █ █ ▀▀█ █
   █ ███ █ ▀▄█▀▀█
   (QR Code aquí)

› Press a │ open Android
› Press q │ quit
```

**SIN ERRORES** ✅

---

## 📝 Resumen

1. **Error**: macOS limita archivos abiertos
2. **Solución**: Aumentar límite con `ulimit -n 10000`
3. **Comando**: `ulimit -n 10000 && npm start`
4. **Resultado**: App inicia correctamente

---

**🚀 ¡Ejecuta el comando y tu app funcionará!**
