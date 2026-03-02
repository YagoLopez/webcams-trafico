# Design: Refactor Clustering Representation

## Architecture

We are replacing the visual representation of clusters in both web and mobile environments with a custom, lightweight component (a red circle with the webcam count) while preserving the underlying clustering logic and the appearance of individual camera markers.

## Components & Data Flow

### 1. Web Implementation (`components/TrafficMap/TrafficMap.web.client.tsx`)
- **Current Behavior:** `<MarkerClusterGroup>` uses default Leaflet icons (which we override with our blue/red SVG) and draws coverage polygons and spiderfy lines on interaction.
- **New Behavior:** 
  - We will pass `showCoverageOnHover={false}` and `spiderfyOnMaxZoom={false}` to `<MarkerClusterGroup>`.
  - We will use the `iconCreateFunction` prop of `<MarkerClusterGroup>` to return a custom `L.divIcon`.
  - The `L.divIcon` will contain HTML/CSS for a circular red badge (`border-radius: 50%`, `background-color: #ef4444`, `color: white`, centered text) displaying the `cluster.getChildCount()`.

### 2. Mobile Implementation (`components/TrafficMap/TrafficMap.tsx`)
- **Current Behavior:** `<MapView>` from `react-native-map-clustering` uses a default blue circle with text (defined by `clusterColor="#3b82f6"`).
- **New Behavior:**
  - We will use the `renderCluster` prop of `<MapView>`.
  - The function will receive `cluster` details (including point count and coordinates).
  - It will return a custom React Native `<Marker>` containing a `<View>` styled as a red circular badge (using Tailwind classes like `bg-red-500 rounded-full items-center justify-center w-10 h-10 border-2 border-white shadow-md`) with a `<Text>` containing the count.
  - Tapping this custom cluster marker should retain the default behavior (zooming into the cluster), which can be triggered using the `onPress` event provided by `renderCluster` parameters to call the map reference's `animateToRegion` method.

## Alternatives Considered

- **Using Ionicons for clusters:** Considered using an `Ionicons` component (like a stacked camera icon) with a notification badge for the count. *Rejected* because a solid circle with a large centered number is more instantly recognizable on a crowded map and computationally lighter for web DOM rendering than complex SVG paths plus badges.
- **Replacing the clustering library:** *Rejected*. The current libraries (which use Supercluster under the hood) are highly optimized for mathematical grouping. The inefficiency lies purely in the *rendering* of the visual elements (polygons/lines), not the calculation.

## Security & Privacy
No security or privacy implications. This is purely a UI rendering optimization.
