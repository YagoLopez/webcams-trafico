## Context

La aplicación requiere mostrar la ubicación de las cámaras de tráfico (1.091 en total) en un mapa interactivo para mejorar la contextualización geográfica. Actualmente, la app soporta plataformas móviles (Android, iOS) y web, por lo que se requiere una solución de mapas que funcione correctamente en todos los entornos usando OpenStreetMap (OSM). Renderizar tantos marcadores de forma nativa u optimizada requiere una estrategia de clustering para evitar problemas severos de rendimiento y UX.

## Goals / Non-Goals

**Goals:**
- Implementar un mapa base de OSM funcional en Android, iOS y Web.
- Soportar el renderizado eficiente de +1.000 marcadores simultáneamente mediante clustering.
- Permitir la navegación fluida hacia la ubicación exacta de una cámara partiendo desde su vista de detalle.
- Permitir abrir el mapa centrado en la ubicación actual del usuario desde el menú lateral.
- Encapsular la complejidad de la plataforma en un componente agnóstico (`<TrafficMap />`).

**Non-Goals:**
- No se implementarán rutas o navegación paso a paso entre la ubicación del usuario y la cámara.
- No se soportará otro proveedor de mapas que no sea OpenStreetMap.
- No se implementará caché offline avanzada de "tiles" del mapa en esta iteración.

## Decisions

**1. Proveedor de Mapas por Plataforma**
- *Decisión:* Usar `react-native-maps` con `UrlTile` (apuntando a OSM) en móvil, y `react-leaflet` en web.
- *Rationale:* `react-native-maps` ofrece el mejor rendimiento nativo pero tiene un soporte web deficiente y no confiable. `react-leaflet` es el estándar de oro para mapas web interactivos. Delegar la implementación por plataforma permite extraer el máximo rendimiento de cada entorno.
- *Alternativas:* Usar un WebView universal con Leaflet. Descartado porque el rendimiento de scroll/pan en nativo no se sentiría fluido (como una app real).

**2. Librería de Clustering**
- *Decisión:* Usar `react-native-map-clustering` en móvil y `react-leaflet-cluster` en web.
- *Rationale:* Ambas librerías abstraen el algoritmo Supercluster (Mapbox) adaptándolo a los primitivos de cada ecosistema. Evitamos tener que implementar y sincronizar un algoritmo de QuadTree y cálculo de deltas manualmente.

**3. Navegación y Centrado de Cámara**
- *Decisión:* El componente `<TrafficMap />` aceptará props iniciales `center={lat, lon}` (obtenidos vía `useLocalSearchParams` en `/map`). Si se proveen, centrará el mapa de forma imperativa. Si no se proveen, usará `expo-location` para obtener la ubicación del usuario.
- *Rationale:* Desacopla la lógica de visualización del mapa de la lógica de enrutamiento y obtención GPS, haciendo que `<TrafficMap />` sea puramente presentacional.

## Risks / Trade-offs

- **[Risk]** Divergencia en la API de los mapas. Al usar dos librerías base distintas (react-native-maps vs Leaflet), cualquier nueva "feature" del mapa (ej. dibujar polígonos) tendrá que implementarse dos veces.
  - *Mitigation:* Mantener la superficie de la API del componente `<TrafficMap />` lo más reducida y declarativa posible (solo recibiendo `cameras` y `center`).
- **[Risk]** Los mapas de la web de Leaflet podrían no cargar correctamente dentro de la arquitectura de Expo Router Web si hay problemas con la inyección dinámica o los estilos globales de Leaflet.
  - *Mitigation:* Asegurarse de importar `leaflet/dist/leaflet.css` correctamente en la entrada web o en el componente específico de webpack/metro.
