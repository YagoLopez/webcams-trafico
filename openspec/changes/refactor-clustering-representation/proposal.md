# Proposal: Refactor Clustering Representation

## Problem Statement
The current representation of camera clusters in both the Web and Mobile map views is computationally inefficient. When grouping large numbers of cameras (1901 webcams), the mapping libraries (`react-leaflet-cluster` and `react-native-map-clustering`) render dynamic coverage polygons (`showCoverageOnHover`) on hover/click and connect individual markers with spider-like lines (`spiderfyOnMaxZoom`) when tapped. Rendering these SVG/canvas paths dynamically for nearly 2000 points consumes unnecessary CPU/GPU resources and clutters the interface visually.

## Proposed Solution
We will optimize the cluster representation by entirely removing the dynamic line and polygon drawing, and replacing the default cluster markers with a highly efficient, custom-styled native element.

### Visual Changes:
- **Clusters:** Will be represented as a solid red circular badge with the total number of cameras centered inside (white text).
- **Individual Cameras:** The custom marker icon for an individual camera will remain entirely unchanged.

### Technical Approach:
1.  **Web (`TrafficMap.web.client.tsx`):**
    - Disable default visual calculations in `<MarkerClusterGroup>` by setting `showCoverageOnHover={false}` and `spiderfyOnMaxZoom={false}`.
    - Implement a custom `iconCreateFunction` to inject a lightweight HTML/CSS string representing the red circle badge, avoiding heavy React element bridging inside Leaflet's engine.
2.  **Mobile (`TrafficMap.tsx`):**
    - Utilize the `renderCluster` property in `<MapView>` (from `react-native-map-clustering`) to return a highly optimized, native-backed `<View>` styled as a red circle with a `<Text>` element.

## Impact
### Modified Capabilities
- `<TrafficMapWebClient>`: Overriding the Leaflet cluster icon and disabling spiderfy/coverage behaviors.
- `<TrafficMapNative>`: Overriding the React Native Maps cluster node representation via `renderCluster`.

No APIs or backend systems are affected. The underlying clustering algorithm (e.g., Supercluster) remains unchanged, ensuring calculating the groups remains extremely fast.

## Success Criteria
- Map clusters in the web browser appear as solid red circles with a number.
- Hovering over or clicking a cluster in the web browser no longer draws a geometric boundary polygon or spider-legs.
- Map clusters in the mobile app appear as solid red circles with a number.
- Performance (especially panning and zooming on the web) feels perceptibly smoother due to reduced DOM/SVG node repaints.
- Individual camera marker icons still look exactly the same as before.
