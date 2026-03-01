# Image Gallery

## Requirements

### Requirement: Image Zoom & Pan
The system SHALL provide a full-screen interactive view for camera images.

#### Scenario: Open gallery from detail
- **GIVEN** the user is on the `CamDetailScreen` and the camera is online
- **WHEN** the user taps the camera image
- **THEN** the application navigates to `/cam/gallery?url=...`
- **AND** the full-screen gallery loads the image from the URL parameter

#### Scenario: Gestures in gallery
- **GIVEN** the full-screen gallery is open
- **WHEN** the user double taps, pinches, or pans the image
- **THEN** the image responds with zoom and translation as expected

#### Scenario: Close gallery
- **GIVEN** the full-screen gallery is open
- **WHEN** the user presses the 'Close' button, swipes down, or uses the physical back button
- **THEN** the gallery closes and the user returns to the previous screen using `router.back()`

#### Scenario: Offline cameras
- **GIVEN** the user is on the `CamDetailScreen` and the camera is offline
- **WHEN** the user taps the offline placeholder
- **THEN** no navigation or modal action is triggered
