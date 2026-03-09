# Specifications: Camera Detail Map Navigation

## Feature Description

When a user views a specific camera's details (`cam/[id]`) and taps "Mostrar en mapa", they should be taken to a map centered on that camera. When they press the hardware "back" button (Android) or use the back gesture (iOS), they should be returned to the camera details screen, rather than the drawer's root list.

## Acceptance Criteria

- **GIVEN** a user is on the camera detail screen (`/cam/[id]`)
- **WHEN** they tap "Mostrar en mapa"
- **THEN** they navigate to a map view dedicated to this camera flow (`/cam/[id]/map`)
- **AND WHEN** they press the back button or swipe back from that map
- **THEN** they are returned exactly to the camera detail screen they came from.

## Edge Cases

- Tapping the map from the Drawer menu directly should still work as before (global map view).
- If the camera lacks coordinates, the "Mostrar en mapa" button is already disabled. This behavior remains unchanged.
