# Expand Cam Image Gallery

## Requirements

- **GIVEN** the user is on the `CamDetailScreen` and the camera is online
- **WHEN** the user taps the camera image
- **THEN** a full-screen gallery modal opens showing the image

- **GIVEN** the full-screen gallery is open
- **WHEN** the user double taps the image
- **THEN** the image zooms in (or out if already zoomed in)

- **GIVEN** the full-screen gallery is open
- **WHEN** the user pinches the image
- **THEN** the image scales according to the pinch gesture

- **GIVEN** the full-screen gallery is open
- **WHEN** the user swipes down on the image
- **THEN** the gallery modal closes and the user returns to the detail view

- **GIVEN** the user is on the `CamDetailScreen` and the camera is offline
- **WHEN** the user taps the offline placeholder
- **THEN** nothing happens (the offline image cannot be expanded)
