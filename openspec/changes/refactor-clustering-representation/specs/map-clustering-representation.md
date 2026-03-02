# Spec: Map Clustering Representation

## Capability: Efficient Visual Grouping of Cameras

The application must be capable of rendering large volumes of camera markers (approx. 1900+) on an interactive map efficiently, without causing severe rendering lag or visual clutter when zoomed out. 

## Requirements

### 1. Minimal Clustering UI
The map clustering library MUST display a simple, single DOM element or native View per cluster.
- The visual representation MUST be a solid red badge (e.g., `#ef4444`).
- It MUST be perfectly circular.
- It MUST contain the total number of cameras within that cluster, centered horizontally and vertically.
- The text MUST be white for contrast.

### 2. Disable Extraneous Renderings (Web)
To preserve performance on the DOM-based Leaflet implementation for the web:
- The map MUST NOT draw geometric coverage polygons when hover/tapping a cluster.
- The map MUST NOT draw "spiderfy" interaction lines connecting markers when clicking a maximum-zoom cluster.

### 3. Native App Parity (Mobile)
To maintain user experience consistency across platforms:
- The React Native Maps implementation MUST use the exact same visual design for clusters (red circles, white text).
- Default React Native Maps clustering behavior (zooming into the bounds on tap) MUST be preserved.

### 4. Individual Icon Preservation
The styling modifications to the clusters MUST NOT affect the rendering of an individual camera marker.
- An individual camera MUST still display its custom icon (square with a video camera inside).
- Selection states (turning red when selected) for individual cameras MUST continue to function correctly. 
