## MODIFIED Requirements

### Requirement: Centering map on camera selection
The system SHALL smoothly animate (flyTo/panTo) the map center to the camera's location when a user clicks on a camera marker, substituting instantaneous jumps.

#### Scenario: User clicks on a camera marker that is not centered
- **WHEN** user clicks on a camera marker on the map
- **THEN** the map performs a smooth animated transition to center on the selected camera's coordinates
- **AND** the URL is updated to reflect the new state
- **AND** the camera's popup is opened.
