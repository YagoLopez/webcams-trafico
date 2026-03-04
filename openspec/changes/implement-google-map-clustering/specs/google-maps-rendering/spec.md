# Specification: Google Maps Rendering natively

## Objective
Implement native map rendering using `PROVIDER_GOOGLE` on Android for the mobile traffic camera map, overriding any previous OSM (OpenStreetMap) tile workarounds, to assure performance and compatibility with clustering.

## Requirements

### Requirement: Native Rendering on Android
- **Description**: The MapView component must use the Google Maps SDK on Android devices.
- **Acceptance Criteria**:
  - `PROVIDER_GOOGLE` is explicitly imported and used in the MapView (or MapViewCluster) component for the Android build.
  - The map successfully renders the Google Maps base layer rather than OSM tiles.

### Requirement: Cross-Platform Compatibility (Web)
- **Description**: The change to Google Maps on native should not break the existing web fallback (react-leaflet).
- **Acceptance Criteria**:
  - The `react-native-maps` implementation is isolated to the native platform, likely continuing the current practice of having separate `.tsx` and `.web.tsx` files or platform-specific logic.

## Scenarios

### Scenario: User opens map on Android
- **GIVEN** the user navigates to the traffic map screen
- **WHEN** the map component mounts
- **THEN** it should render the native Google Map API base tiles.

### Scenario: User opens map on Web
- **GIVEN** the user navigates to the traffic map on a web browser
- **WHEN** the map component mounts
- **THEN** it should gracefully fall back to the existing Leaflet implementation without Google Maps specific errors.
