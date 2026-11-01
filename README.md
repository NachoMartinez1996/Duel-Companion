# Duel Companion

Aplicación web instalable (PWA) para acompañar duelos físicos de Yu-Gi-Oh! TCG. Funciona localmente y puede utilizarse sin conexión después de la primera carga.

## Archivos

- `index.html`: interfaz, tablero y lógica del duelo.
- `manifest.webmanifest`: metadatos para instalar la aplicación.
- `service-worker.js`: guarda el app shell en caché para el uso offline.
- `icons/`: iconos de 192 y 512 píxeles.

## Publicar en GitHub Pages

1. Subí el contenido de esta carpeta a la raíz del repositorio (no el ZIP).
2. En **Settings → Pages**, seleccioná **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. Abrí la URL publicada una vez con conexión y agregá la aplicación a la pantalla de inicio desde Chrome.
4. Después de la primera carga, el tablero y las herramientas locales funcionan sin conexión.

Las rutas son relativas para funcionar también cuando GitHub Pages publica el sitio dentro de una subcarpeta del dominio.

## Tablero

- Dos campos de jugador con cinco Zonas de Monstruos y cinco Zonas de Mágicas/Trampas cada uno.
- Dos Zonas de Monstruos Extra compartidas entre ambos jugadores.
- Una Zona de Campo independiente para cada jugador.
- Las zonas se tocan para abrir un editor contextual; las cartas no generan formularios permanentes en la página.
- Las Zonas de Péndulo se señalan en los extremos de la fila de Mágicas/Trampas.
- Las Mágicas de Equipo pueden asociarse a un monstruo propio o adversario, incluido uno en una Zona de Monstruos Extra. El tablero muestra la relación en ambos espacios.
- La orientación del monstruo se representa en el icono de carta: vertical para Ataque, horizontal para Defensa y dorso para Defensa boca abajo.
- Deck, Extra Deck, Cementerio y Desterradas se muestran como referencias visuales; no se administra el contenido de esas pilas en esta versión.

## Herramientas

- Contador de puntos de vida para dos jugadores.
- Seguimiento manual de fases.
- Registro de monstruos: ATK/DEF, Nivel, Rango, Valor de Enlace, Atributo, Tipo/Raza, Péndulo, escalas, posición, efecto negado y contadores.
- Registro de Mágicas/Trampas: tipo, estado, negación de efecto, contadores y objetivo de las Mágicas de Equipo.
- Dados y moneda.

La aplicación registra el estado indicado por los jugadores; no interpreta cartas ni resuelve cadenas o reglas automáticamente.

## Persistencia y actualizaciones

La partida se guarda en `localStorage` de este dispositivo. No se sincroniza entre navegadores o dispositivos.

El Service Worker utiliza actualmente `CACHE_NAME = "duel-companion-v2"`, solicitado para esta versión mientras la primera actualización aún no se publique. Después de publicar esta versión, incrementá ese nombre (por ejemplo, a `duel-companion-v1.0.1`) en la próxima actualización para renovar la caché.
