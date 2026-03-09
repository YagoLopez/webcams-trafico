## Why
The current map implementation needs an upgrade to improve performance and user experience when displaying numerous traffic cameras. Rendering a large number of individual markers on a mobile map can cause severe lag, visual clutter, and potential crashes on Android (`addViewAt: failed to insert view` error, as seen in past issues). This change implements Google Maps with map clustering to address these issues, following standard practices for Expo and `react-native-maps`.

## Proposed Solution
Refactor `components/TrafficMap/TrafficMap.tsx` to utilize native Google Maps (`PROVIDER_GOOGLE`) and integrate the `react-native-map-clustering` library to automatically group dense nearby markers. This involves:
- Adding `react-native-map-clustering` as a dependency.
- Replacing the standard `MapView` with the clustered `MapView` component.
- Ensuring custom map markers (camera icons) and their popups continue to function correctly within clusters.
- Providing consistent configurations for both mobile and any compatible web fallbacks if applicable.

## Capabilities
- `google-maps-rendering`: The mobile app will render maps using the native Google Maps SDK for a more standard and performant experience.
- `map-clustering`: The map will automatically cluster nearby cameras when zoomed out, displaying a cluster icon with the number of hidden markers, which expands upon interaction or zooming.

## Impact
- `components/TrafficMap/TrafficMap.tsx`: Major update to import and configure `react-native-map-clustering` and `PROVIDER_GOOGLE`.
- `package.json` / `yarn.lock` / `package-lock.json`: Add `react-native-map-clustering`.
- `app.json` (potentially): Ensure the Google Maps API Key configuration for Android/iOS remains correctly set up for native rendering.
