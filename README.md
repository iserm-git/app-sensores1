# Guía Práctica de GitHub para React Native
## Demostración para Estudiantes Principiantes

**Materia:** Programación Móvil  
**Tema:** Control de versiones con Git y GitHub  
**Objetivo:** Aprender a gestionar proyectos de React Native con GitHub

---

## **1️⃣ ELIMINAR ASOCIACIÓN DE REPOSITORIO ACTUAL**

### Comandos:
```bash
# Verificar si existe un repositorio asociado
git remote -v

# Si aparece un repositorio, eliminarlo
git remote remove origin

# Verificar que se eliminó
git remote -v
# (no debe mostrar nada)
```

**💡 ¿Qué estamos haciendo?**  
Estamos desconectando nuestro proyecto de cualquier repositorio previo en GitHub para empezar limpio.

---

## **2️⃣ CREAR REPOSITORIO EN GITHUB**

### Pasos en la interfaz web:

1. Ir a **https://github.com**
2. Click en el botón **"+"** (esquina superior derecha) → **"New repository"**
3. Llenar el formulario:
   - **Repository name**: `mi-app-react-native`
   - **Description**: "Proyecto de Programación Móvil"
   - ✅ Marcar **"Public"** (o Private según prefieras)
   - ❌ **NO marcar** "Initialize with README" (ya tenemos código local)
4. Click en **"Create repository"**

**📋 Importante:** Copiar la URL que aparece al crear el repositorio.  
Ejemplo: `https://github.com/tu-usuario/mi-app-react-native.git`

---

## **3️⃣ ASOCIAR PROYECTO AL NUEVO REPOSITORIO**

### Comandos paso a paso:

```bash
# 1. Inicializar Git en el proyecto (si no está iniciado)
git init

# 2. Configurar nombre y email (solo primera vez)
git config user.name "Tu Nombre"
git config user.email "tuemail@example.com"

# 3. Asociar el repositorio remoto
git remote add origin https://github.com/tu-usuario/mi-app-react-native.git

# 4. Crear el primer commit
git add .
git commit -m "Versión inicial del proyecto"

# 5. Subir al repositorio (primera vez)
git branch -M main
git push -u origin main
```

**💡 ¿Qué estamos haciendo?**  
Estamos conectando nuestra carpeta local con el repositorio en la nube de GitHub.

---

## **4️⃣ ESTRATEGIA DE RAMAS Y FUSIÓN**

### **Paso 1: Crear estructura de ramas**

```bash
# Ver en qué rama estamos actualmente
git branch

# Crear rama development desde main
git checkout -b development
git push -u origin development

# Crear dos ramas de ejemplo desde development
git checkout -b feature/login
git push -u origin feature/login

git checkout development
git checkout -b feature/home
git push -u origin feature/home
```

### **Paso 2: Flujo de trabajo con ejemplo práctico**

#### **Escenario A: Trabajar en feature/login**
```bash
# 1. Moverse a la rama
git checkout feature/login

# 2. Hacer cambios en el código
# (Editar archivos, agregar funcionalidad de login)

# 3. Guardar cambios localmente
git add .
git commit -m "Agregar pantalla de login"

# 4. Subir cambios al repositorio remoto
git push origin feature/login
```

#### **Escenario B: Trabajar en feature/home**
```bash
# 1. Cambiar de rama
git checkout feature/home

# 2. Hacer cambios diferentes
# (Editar archivos, agregar pantalla de inicio)

# 3. Guardar cambios
git add .
git commit -m "Agregar pantalla home"

# 4. Subir cambios
git push origin feature/home
```

### **Paso 3: Fusionar ramas en development**

```bash
# 1. Ir a la rama destino (development)
git checkout development

# 2. Fusionar feature/login
git merge feature/login
git push origin development

# 3. Fusionar feature/home
git merge feature/home
git push origin development
```

### **Visualización del flujo de trabajo:**

```
main (producción)
  ↓
development (desarrollo)
  ├── feature/login  ──→ [merge] → development
  └── feature/home   ──→ [merge] → development
```

### **Paso 4: Llevar cambios a producción (main)**

```bash
# Cuando development esté listo y probado
git checkout main
git merge development
git push origin main
```

---

## **5️⃣ REGRESAR A UNA RAMA ANTERIOR**

### **Opción A: Cambiar de rama (sin perder cambios guardados)**

```bash
# Ver todas las ramas disponibles
git branch -a

# Cambiar a la rama deseada
git checkout main
# o
git checkout development
# o
git checkout feature/login
```

### **Opción B: Deshacer cambios NO guardados**

```bash
# Ver qué archivos han cambiado
git status

# Descartar cambios en un archivo específico
git checkout -- nombre-archivo.tsx

# Descartar TODOS los cambios no guardados (⚠️ CUIDADO)
git reset --hard
```

### **Opción C: Ver historial y volver a un commit anterior**

```bash
# Ver historial de commits
git log --oneline

# Ejemplo de salida:
# a1b2c3d Agregar pantalla home
# e4f5g6h Agregar pantalla login
# i7j8k9l Versión inicial del proyecto

# Volver temporalmente a un commit anterior (solo para revisar)
git checkout e4f5g6h

# Regresar a la rama actual
git checkout development
```

### **Opción D: Deshacer el último commit**

```bash
# Deshacer el último commit pero MANTENER los cambios en archivos
git reset --soft HEAD~1

# Deshacer el último commit y ELIMINAR todos los cambios
git reset --hard HEAD~1
```

---

## **🎯 EJERCICIO PRÁCTICO PARA LA CLASE**

**Duración estimada:** 20-25 minutos

### **Actividad individual:**

1. Eliminar asociación de repositorio anterior (si existe)
2. Crear un nuevo repositorio en GitHub con el nombre: `practica-git-[tu-nombre]`
3. Conectar tu proyecto local al repositorio
4. Crear la rama `development`
5. Crear una rama `feature/mi-nombre` desde `development`
6. Hacer un cambio simple:
   - Agregar un comentario con tu nombre en el archivo `App.tsx`
   - Ejemplo: `// Proyecto de Juan Pérez - Matrícula: 12345`
7. Hacer commit y push de los cambios
8. Fusionar tu rama en `development`
9. Regresar a la rama `main`
10. Verificar el historial con: `git log --oneline --graph --all`

### **Verificación del ejercicio:**

El comando `git log --oneline --graph --all` debe mostrar algo similar a:

```
*   a1b2c3d (HEAD -> development) Merge branch 'feature/mi-nombre' into development
|\  
| * e4f5g6h (feature/mi-nombre) Agregar mi nombre al proyecto
|/  
* i7j8k9l (origin/main, main) Versión inicial del proyecto
```

---

## **📝 COMANDOS DE REFERENCIA RÁPIDA**

| Comando | Descripción |
|---------|-------------|
| `git status` | Ver estado actual del repositorio |
| `git branch` | Ver ramas locales |
| `git branch -a` | Ver todas las ramas (locales y remotas) |
| `git log --oneline` | Ver historial de commits resumido |
| `git checkout nombre-rama` | Cambiar de rama |
| `git pull` | Descargar cambios del repositorio remoto |
| `git push` | Subir cambios al repositorio remoto |
| `git add .` | Agregar todos los archivos modificados |
| `git commit -m "mensaje"` | Guardar cambios con un mensaje |
| `git merge nombre-rama` | Fusionar una rama en la rama actual |

---

## **⚠️ ERRORES COMUNES Y SOLUCIONES**

### **Error 1: "fatal: remote origin already exists"**

**Causa:** Ya existe una conexión a un repositorio remoto.

**Solución:**
```bash
git remote remove origin
git remote add origin URL-DEL-NUEVO-REPO
```

---

### **Error 2: Conflictos al hacer merge**

**Causa:** Cambios incompatibles en las mismas líneas de código.

**¿Cómo se ve un conflicto?**
```javascript
<<<<<<< HEAD
const nombre = "Juan";
=======
const nombre = "María";
>>>>>>> feature/login
```

**Solución:**
1. Abrir los archivos marcados con conflictos
2. Decidir qué código mantener
3. Eliminar las marcas `<<<<<<<`, `=======`, `>>>>>>>`
4. Guardar el archivo
5. Hacer commit:
```bash
git add .
git commit -m "Resolver conflictos de merge"
```

---

### **Error 3: "Your branch is behind..."**

**Causa:** El repositorio remoto tiene cambios que no tienes localmente.

**Solución:**
```bash
git pull origin nombre-rama
```

---

### **Error 4: "Please commit your changes or stash them..."**

**Causa:** Intentas cambiar de rama con cambios sin guardar.

**Solución A: Guardar los cambios**
```bash
git add .
git commit -m "Guardar cambios antes de cambiar de rama"
git checkout otra-rama
```

**Solución B: Guardar temporalmente (stash)**
```bash
git stash
git checkout otra-rama
# Cuando regreses, recuperar cambios:
git stash pop
```

---

## **🎓 BUENAS PRÁCTICAS**

### **1. Mensajes de commit descriptivos**

❌ **Mal:**
```bash
git commit -m "cambios"
git commit -m "fix"
git commit -m "actualización"
```

✅ **Bien:**
```bash
git commit -m "Agregar validación de email en formulario de login"
git commit -m "Corregir error de navegación en pantalla de perfil"
git commit -m "Actualizar estilos del botón principal"
```

### **2. Hacer commits frecuentes pero lógicos**

- Hacer commit después de completar una funcionalidad pequeña
- No acumular muchos cambios en un solo commit
- Cada commit debe representar un cambio coherente

### **3. Estructura de ramas recomendada**

```
main          → Código en producción (siempre funcional)
development   → Código en desarrollo (para integrar features)
feature/[nombre] → Nuevas funcionalidades
bugfix/[nombre]  → Corrección de errores
hotfix/[nombre]  → Correcciones urgentes en producción
```

### **4. Antes de hacer push**

```bash
# 1. Ver qué cambios estás subiendo
git status

# 2. Verificar que todo compila
npm run android
# o
npm run ios

# 3. Luego hacer push
git push origin nombre-rama
```

---

## **📚 RECURSOS ADICIONALES**

- **Documentación oficial de Git:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **Visualizar Git:** https://git-school.github.io/visualizing-git/
- **Práctica interactiva:** https://learngitbranching.js.org/

---

## **✅ CHECKLIST DE APRENDIZAJE**

Al finalizar esta práctica, debes ser capaz de:

- [ ] Crear un repositorio en GitHub
- [ ] Conectar un proyecto local con GitHub
- [ ] Crear y cambiar entre ramas
- [ ] Hacer commits y push
- [ ] Fusionar ramas (merge)
- [ ] Resolver conflictos básicos
- [ ] Navegar por el historial de commits
- [ ] Deshacer cambios cuando sea necesario

---

**Profesor:** [Tu Nombre]  
**Materia:** Programación Móvil  
**Semestre:** [Semestre Actual]

---

## **📬 CONTACTO Y DUDAS**

Si tienes dudas durante la práctica:
1. Revisa la sección de "Errores Comunes"
2. Consulta con tus compañeros
3. Pregunta al profesor

**¡Éxito en tu aprendizaje de Git y GitHub!** 🚀
