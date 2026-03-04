# Unit Tests Plan: Google Map Clustering

## 1. TrafficMap Component Rendering

- [ ] **Test Setup**: Mock `react-native-maps` and `react-native-map-clustering`. Mock `useWebcamsStore` to return a small set of webcams.
- [ ] **Test Case 1.1**: Verifies that the native component renders the mapped `Marker` components correctly within the expected map cluster wrapper.
- [ ] **Test Case 1.2**: Verifies that the map uses `PROVIDER_GOOGLE` on native platforms.

## 2. Platform Specific Rendering

- [ ] **Test Setup**: Use `Platform.OS` mocking to test behavior across platforms.
- [ ] **Test Case 2.1**: Verifies that on the web, the component continues to render using `react-leaflet` (or the equivalent fallback logic) and does not crash attempting to load Google Maps native modules.

## 3. Marker Interaction (Optional / Mocked)

- [ ] **Test Setup**: Mock the `onPress` event on the markers.
- [ ] **Test Case 3.1**: Verifies that calling `onPress` on an unclustered marker still correctly sets the active camera state or triggers the Callout function.
