# Duel Companion

PWA inicial para llevar puntos de vida y modificar ATK/DEF durante duelos. No utiliza servicios externos ni necesita conexión después de la primera carga.

## Archivos

- `index.html`: interfaz, estilos y lógica de la aplicación.
- `manifest.webmanifest`: nombre, iconos y opciones de instalación.
- `service-worker.js`: caché de los archivos necesarios para abrir la aplicación offline.
- `icons/`: iconos de la aplicación.

## Publicar en GitHub Pages

1. Creá un repositorio, por ejemplo `duel-companion`.
2. Subí el contenido de esta carpeta a la raíz del repositorio (no hace falta subir la carpeta contenedora).
3. En GitHub, entrá en **Settings → Pages**.
4. En **Build and deployment**, elegí **Deploy from a branch**, seleccioná la rama `main` y la carpeta `/ (root)`.
5. Abrí la URL publicada con Chrome en Android y esperá a que cargue por primera vez.
6. Usá el menú de Chrome → **Instalar aplicación** o **Agregar a pantalla principal**.
7. Abrí la aplicación una vez y luego probala con el modo avión activado.

## Importante para GitHub Pages

Las rutas de los archivos son relativas (`./...`) para que funcione tanto en un dominio propio como en una URL de proyecto del tipo `https://usuario.github.io/duel-companion/`.

## Actualizaciones

Cuando hagas cambios y quieras que los dispositivos descarguen una nueva versión del contenido guardado en caché, cambiá el valor de `CACHE_NAME` en `service-worker.js`, por ejemplo de `duel-companion-v1` a `duel-companion-v2`.

## Manifest

El archivo está escrito en JSON aunque su extensión sea `.webmanifest`. Si preferís llamarlo `manifest.json`, cambiá el `href` del `<link rel="manifest">` en `index.html` y la entrada correspondiente en `APP_SHELL` en `service-worker.js`.
