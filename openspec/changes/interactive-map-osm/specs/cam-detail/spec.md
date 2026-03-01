## ADDED Requirements

### Requirement: Navigate to Map from Detail View
The system SHALL provide a mechanism to open the interactive map directly from a specific camera's detail view, centering the map on that camera.

#### Scenario: User clicks on camera image
- **WHEN** the user is on the camera detail view
- **THEN** clicking the camera image or a dedicated "View on Map" button
- **THEN** navigates to the `/map` route with the camera's `lat` and `lon` as query parameters
