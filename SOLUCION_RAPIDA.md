# ⚡ Solución Rápida al Error

## 🔴 Error Original
```
ConfigError: Cannot determine which native SDK version your project uses
because the module `expo` is not installed.
Please install it with `yarn add expo` and try again.
```

## ✅ Solución en 3 Pasos

### Paso 1: Instalar Dependencias
```bash
npm install
```

**⏱️ Tiempo estimado**: 2-5 minutos la primera vez

**Qué hace**: Descarga e instala todas las dependencias del proyecto (expo, react-native, navegación, sensores, etc.)

### Paso 2: Esperar a que termine
Verás algo como:
```
⠋ Installing packages...
⠙ Resolving packages...
⠹ Fetching packages...
```

Cuando termine, verás:
```
added 1234 packages in 3m
✔ Installation complete!
```

### Paso 3: Iniciar la App
```bash
npm start
```

Deberías ver:
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go
```

**¡Listo!** 🎉

---

## 🎯 Comando Todo-en-Uno

Si prefieres copiar y pegar un solo comando:

```bash
npm install && npm start
```

Este comando:
1. Instala las dependencias
2. Espera a que termine
3. Inicia automáticamente la app

---

## 📊 Qué Esperar

### Durante `npm install`:
- **Duración**: 2-5 minutos (primera vez)
- **Tamaño**: ~300-500 MB descargados
- **Paquetes**: ~1200+ paquetes

### Después de `npm install`:
- Carpeta `node_modules/` creada ✓
- Archivo `package-lock.json` creado ✓
- Proyecto listo para ejecutar ✓

### Durante `npm start`:
- Expo DevTools se abre en el navegador
- Código QR en la terminal
- Servidor Metro corriendo

---

## 🆘 Si Hay Errores

### Error de Permisos
```bash
sudo npm install
```

### Error de Red
```bash
npm install --verbose
```

### Error de Dependencias
```bash
npm install --legacy-peer-deps
```

### Limpiar y Reinstalar
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 💡 Verificación Rápida

Después de `npm install`, verifica:

```bash
# ¿Existe node_modules?
ls -la | grep node_modules

# ¿Está expo instalado?
ls node_modules | grep "^expo$"

# ¿Cuál versión de expo?
npm list expo
```

Deberías ver:
```
└── expo@51.0.x
```

---

## ✅ Checklist

Antes de `npm start`:
- [x] Node.js v18+ instalado
- [x] npm v9+ instalado
- [x] Conexión a internet activa
- [ ] `npm install` ejecutado sin errores
- [ ] Carpeta `node_modules` existe
- [ ] `npm start` lista para ejecutar

---

## 🚀 Una Vez Funcionando

1. **Instala Expo Go** en tu móvil
2. **Escanea el QR** de la terminal
3. **¡Disfruta la app!**

---

**Tiempo total**: ~5 minutos
**Dificultad**: Muy Fácil ⭐
**Resultado**: App funcionando ✅

---

📝 **Nota**: Este es un proceso normal para cualquier proyecto React Native/Expo. Solo se hace una vez.
