## Why

Actualmente, las cámaras de tráfico se visualizan únicamente en un formato de lista o detalle individual. Para mejorar la experiencia del usuario y proporcionar un contexto geográfico claro, es necesario integrar un mapa interactivo. Este mapa permitirá a los usuarios ver la distribución de todas las cámaras (1.091 en total) de un vistazo, facilitando la identificación de la densidad del tráfico en diferentes áreas y ofreciendo una navegación más intuitiva hacia cámaras específicas cercanas a su ubicación o a puntos de interés.

## What Changes

- **Integración de Mapa Base:** Implementación de un mapa base utilizando OpenStreetMap (OSM) para todas las plataformas (Android, iOS y Web).
- **Arquitectura de Plataforma Específica:** Creación de un componente contenedor `<TrafficMap />` que delegará la renderización a implementaciones específicas por plataforma (`react-native-maps` + `UrlTile` para móvil y `react-leaflet` para web) para garantizar el mejor rendimiento.
- **Clustering de Cámaras:** Implementación de agrupación de marcadores (clustering) para manejar de manera eficiente y fluida la renderización simultánea de las 1.091 cámaras de tráfico en todas las plataformas (`react-native-map-clustering` en móvil y `react-leaflet-cluster` en web).
- **Navegación desde Detalle:** Adición de funcionalidad en la vista de detalle de la cámara para que, al hacer clic en la imagen, el usuario sea redirigido a la nueva vista de mapa, centrando la vista en las coordenadas exactas de esa cámara.
- **Navegación desde el Drawer:** Creación de un nuevo elemento en el menú lateral (drawer) que dirija a la vista de mapa. Si no se especifican coordenadas en la ruta, el mapa se centrará por defecto en la ubicación GPS actual del dispositivo del usuario.
- **Gestión de Ubicación:** Integración de la solicitud de permisos y obtención de la ubicación del dispositivo utilizando `expo-location`.

## Capabilities

### New Capabilities
- `interactive-map-osm`: Implementación de la vista principal del mapa interactivo con soporte para OSM, renderizado condicional por plataforma, clustering de marcadores masivos y manejo de la ubicación del usuario.

### Modified Capabilities
- `cam-detail`: Actualización para incluir la navegación hacia la ruta de mapa (`/map?lat=X&lon=Y`) al interactuar con la imagen de la cámara.

## Impact

- **Nuevas Rutas:** Adición de la ruta `/map` en `expo-router`.
- **Nuevos Componentes:** Creación del directorio y componentes en `components/TrafficMap/` (`index.tsx`, `TrafficMap.native.tsx`, `TrafficMap.web.tsx`).
- **Nuevas Dependencias (Móvil):** `react-native-maps`, `react-native-map-clustering`, `expo-location`.
- **Nuevas Dependencias (Web):** `leaflet`, `react-leaflet`, `react-leaflet-cluster`, `@types/leaflet`.
- **Modificaciones en Vistas Existentes:** Cambios en el archivo correspondiente a la vista de detalle de cámara (`app/cam/[id].tsx` o similar) y en el componente de menú lateral (drawer).
- **Permisos:** Actualización de los archivos de configuración (ej. `app.json`) para solicitar permisos de ubicación (Location) en Android e iOS.
