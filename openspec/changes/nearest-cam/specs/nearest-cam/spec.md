## ADDED Requirements

### Requirement: Road selection for nearest camera search
The system SHALL present a road selector allowing the user to choose which road to search for the nearest camera.

#### Scenario: Select a road
- **WHEN** the user opens the "Cámara cercana" screen
- **THEN** the system SHALL display a `SelectBox` populated with all available road names

#### Scenario: No road selected
- **WHEN** the user has not selected a road and taps "Buscar cámara cercana"
- **THEN** the system SHALL not perform the search and the button SHALL remain inactive or show a hint

### Requirement: GPS-based nearest camera discovery
The system SHALL locate the nearest traffic camera on the selected road based on the user's current GPS position.

#### Scenario: Successful nearest camera search
- **WHEN** the user selects a road and taps "Buscar cámara cercana"
- **THEN** the system SHALL request foreground GPS permission, obtain the current position, compute the Haversine distance to each camera on that road, and identify the one with the minimum distance

#### Scenario: GPS permission denied
- **WHEN** the user denies location permission
- **THEN** the system SHALL display a message indicating that GPS access is required to find the nearest camera

### Requirement: Map display with nearest camera pre-selected
The system SHALL display a map showing only the cameras on the selected road, with the nearest camera pre-selected.

#### Scenario: Map renders with nearest camera highlighted
- **WHEN** the nearest camera has been identified
- **THEN** the system SHALL render the `TrafficMap` component centered on the user's position, with `cams` containing only the cameras on the selected road, and `selectedCameraId` set to the nearest camera's ID

#### Scenario: Pseudo-callout for nearest camera
- **WHEN** the map displays the nearest camera as selected
- **THEN** the system SHALL show the pseudo-callout with the camera's image, location, road name, and kilometer

### Requirement: Haversine distance calculation
The system SHALL provide a utility function to compute the great-circle distance between two GPS coordinates using the Haversine formula.

#### Scenario: Known distance calculation
- **WHEN** given coordinates for Madrid (40.4168, -3.7038) and Barcelona (41.3874, 2.1686)
- **THEN** the system SHALL return a distance of approximately 504 km (±5 km tolerance)
