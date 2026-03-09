# Cam Detail Capability

## Purpose
This capability focuses on the interaction and information architecture of the camera detail view, including how it connects with other features like the interactive map.

## Requirements

### Requirement: Navigate to Map from Detail View
The system SHALL provide a mechanism to open the interactive map directly from a specific camera's detail view, centering the map on that camera. The navigation stack MUST allow the user to return directly to the detail view via the back button.

#### Scenario: User clicks on "Mostrar en mapa" button
- **WHEN** the user is on the camera detail view (`/cam/[id]`)
- **AND** they tap the "Mostrar en mapa" button
- **THEN** the system navigates to the dedicated nested map route (`/cam/[id]/map`)
- **AND** the map is centered on that camera's coordinates
- **AND** when the user performs a back action (gesture or button), they are returned to the camera detail view.
