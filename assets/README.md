# Assets

## Imágenes Requeridas

Para que la aplicación funcione completamente, necesitas agregar las siguientes imágenes:

### Iconos y Splash
- `icon.png` (1024x1024) - Icono de la aplicación
- `adaptive-icon.png` (1024x1024) - Icono adaptativo para Android
- `splash.png` (1284x2778) - Pantalla de inicio
- `favicon.png` (48x48) - Favicon para web

## Generar Assets

Puedes usar herramientas online gratuitas para generar estos assets:

1. **Icon Kitchen** (https://icon.kitchen/)
2. **App Icon Generator** (https://appicon.co/)
3. **Expo Assets** - Expo puede generar automáticamente estos assets

### Comando Expo para generar assets

```bash
npx expo-asset-icon generate icon.png
```

## Placeholder

Por ahora, la app funcionará sin estas imágenes. Expo usará iconos por defecto.
