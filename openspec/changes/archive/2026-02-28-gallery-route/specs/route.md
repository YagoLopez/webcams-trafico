# Route-based Gallery

## Requirements

- **GIVEN** the user is on the `CamDetailScreen` viewing a camera
- **WHEN** the user taps the image
- **THEN** they navigate to `/cam/gallery?url=...`
- **AND** the full-screen gallery loads the image from the URL parameter

- **GIVEN** the user is viewing the full screen image at `/cam/gallery`
- **WHEN** the user presses the 'Close' button or swipes down
- **THEN** they navigate back to the previous screen using `router.back()`

- **GIVEN** the user is viewing the full screen image at `/cam/gallery`
- **WHEN** the user presses the physical device back button (Android)
- **THEN** the route pops from the stack and closes the gallery without exiting the app
