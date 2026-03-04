# Specification: Map Clustering

## Objective
Implement native map clustering to handle a large number of markers efficiently, preventing performance degradation and view hierarchy crashes on mobile.

## Requirements

### Requirement: Cluster Integration
- **Description**: The map must automatically group nearby markers into clusters based on the zoom level.
- **Acceptance Criteria**:
  - The `react-native-map-clustering` library is integrated into the `TrafficMap` view.
  - As the user zooms out, individual icons merge into a single cluster icon displaying the count of hidden cameras.
  - As the user zooms in, clusters break apart into smaller clusters or individual camera icons.

### Requirement: Cluster Interaction
- **Description**: Users must be able to interact with clusters to view their contents.
- **Acceptance Criteria**:
  - Tapping on a cluster automatically adjusts the map region (zooms in) to reveal the markers within that cluster.
  - The default behavior provided by the library for expanding a cluster on press should function smoothly.

### Requirement: Marker Integrity
- **Description**: Individual custom markers (cameras) must retain their custom icons, `PointFeature` data grouping logic, and `Callout` functionality when not clustered.
- **Acceptance Criteria**:
  - Unclustered markers display their correct direction/type-based custom icons.
  - Tapping an unclustered marker opens its callout correctly across platforms.

## Scenarios

### Scenario: Dense Area Zoom Out
- **GIVEN** the map is positioned over a dense area (e.g., Madrid city center)
- **WHEN** the user zooms out to view the entire region
- **THEN** camera markers merge into numerical cluster icons, significantly reducing the number of rendered items.

### Scenario: Cluster Interaction
- **GIVEN** a cluster icon is visible on the screen
- **WHEN** the user taps the cluster
- **THEN** the map animates zooming into the bounding box of the clustered markers.
