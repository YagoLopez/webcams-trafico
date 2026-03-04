## 1. Setup and Dependencies

- [x] 1.1 Add `react-native-map-clustering` dependency to the project (e.g., `npm install react-native-map-clustering`).
- [x] 1.2 Verify Google Maps API key configuration in `app.json` for Android and iOS is still valid and unchanged (since we are moving back to native maps over OSM tiles).

## 2. Refactor TrafficMap Component

- [x] 2.1 Import `PROVIDER_GOOGLE` from `react-native-maps` and the default MapView from `react-native-map-clustering` in `components/TrafficMap/TrafficMap.tsx`.
- [x] 2.2 Revert the previous OSM tile workaround (removing `<UrlTile>` if present) and set the `provider={PROVIDER_GOOGLE}` on the new map component for Android/iOS.
- [x] 2.3 Pass the mapped `<Marker>` components directly as children to the clustered MapView instead of using a custom supercluster logic state.
- [x] 2.4 Ensure the web implementation (`TrafficMap.web.tsx`) remains unaffected by these native changes, or ensure cross-platform compatibility if a unified component is used.

## 3. Marker Optimization

- [x] 3.1 Optimize native marker rendering. Ensure `tracksViewChanges` is handled correctly (e.g., set to `false` after the initial render) on custom `Marker` images to prevent the `addViewAt` crash on Android.
- [x] 3.2 Verify that custom icons (`camera-icon.png` or similar) display correctly when markers are unclustered.
- [x] 3.3 Ensure the `Callout` components inside the markers still trigger correctly when an individual marker is pressed.

## 4. Testing & Verification

- [x] 4.1 Run the app on an Android emulator/device and verify the map loads using Google Maps natively.
- [x] 4.2 Verify clustering behavior: zooming out groups markers, zooming in or tapping a cluster expands them without crashes.
- [x] 4.3 Verify the web fallback still loads correctly using the `react-leaflet` implementation.
