# Interactive Map OSM Capability

## Purpose
This capability defines the requirements for an interactive map component using OpenStreetMap (OSM) to visualize traffic camera locations with clustering and user localization support.

## Requirements

### Requirement: Render Interactive Map
The system SHALL render an interactive base map using OpenStreetMap (OSM).

#### Scenario: User opens map without specific coordinates
- **WHEN** the user navigates to the map view from the drawer menu
- **THEN** the map is centered on the user's current GPS location
- **THEN** the map displays the base OSM layer

#### Scenario: User opens map with specific coordinates
- **WHEN** the user navigates to the map view with `lat` and `lon` query parameters
- **THEN** the map is centered precisely on those coordinates
- **THEN** the map displays the base OSM layer

### Requirement: Display Clustered Cameras
The system SHALL display all available traffic cameras as markers on the map, grouped into clusters when there is high density to preserve performance.

#### Scenario: Viewing map at a low zoom level
- **WHEN** the map is fully zoomed out (showing a large region)
- **THEN** cameras in close proximity are grouped into a single cluster marker showing the total count of cameras in that area

#### Scenario: Viewing map at a high zoom level
- **WHEN** the user zooms in closely to a specific area
- **THEN** the clusters expand to reveal individual camera markers

#### Scenario: Interacting with a cluster
- **WHEN** the user taps or clicks on a cluster marker
- **THEN** the map automatically zooms into the bounds of that cluster to reveal more individual markers

### Requirement: Cluster Visual Representation
The system SHALL render clusters with a consistent, performance-optimized visual design across all platforms.

#### Scenario: Cluster appearance
- **THEN** the visual representation MUST be a solid red circular badge (e.g., `#ef4444`)
- **AND** it MUST contain the total number of cameras within that cluster in white text, centered both horizontally and vertically.

#### Scenario: Performance optimizations (Web)
- **THEN** the map MUST NOT draw geometric coverage polygons when hover/tapping a cluster.
- **AND** the map MUST NOT draw "spiderfy" interaction lines connecting markers when clicking a maximum-zoom cluster.
