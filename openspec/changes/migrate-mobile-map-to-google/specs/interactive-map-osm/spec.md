## MODIFIED Requirements

### Requirement: Render Interactive Map (MODIFIED)

The system SHALL render an interactive base map on mobile using **native Google Maps** on Android (via `PROVIDER_GOOGLE`) instead of OpenStreetMap URL tiles.

#### Scenario: User opens map on Android
- **WHEN** the user navigates to the map view on an Android device
- **THEN** the map renders using the native Google Maps SDK
- **THEN** the map displays Google Maps base tiles (roads, labels, terrain)

#### Scenario: User opens map without specific coordinates
- **WHEN** the user navigates to the map view from the drawer menu
- **THEN** the map is centered on the default initial region (Madrid, Spain)
- **THEN** the map displays the Google Maps base layer

#### Scenario: User opens map with specific coordinates
- **WHEN** the user navigates to the map view with `lat` and `lon` query parameters
- **THEN** the map is centered on those coordinates
- **THEN** the map displays the Google Maps base layer

## UNCHANGED Requirements

The following requirements from the base `interactive-map-osm` spec remain unchanged:
- Display Clustered Cameras (clustering behavior is provider-agnostic)
- Interacting with clusters (zoom on tap)
