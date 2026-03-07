# Center Map on Camera Click Proposal

## Goal
Improve the user experience when interacting with traffic webcams on the map by smoothly centering the selected webcam using map animations (`flyTo`), avoiding abrupt re-renders.

## Motivation
Currently, when a user clicks on a webcam icon on the map, the component updates the `center` prop explicitly via the router/state. The internal `MapController` intentionally skips the animation to prevent layout jumps. However, this creates a generic, static transition. We want the camera to "fly" to the selected marker smoothly, keeping context and providing a premium spatial feel.

## Impact
- **Affected code:** `TrafficMap.web.client.tsx`, specifically the click handler within `Marker` and the `MapController` component.
- **User experience:** Fluid transition when focusing on a specific camera on the map.

## Capabilities

### New Capabilities
- None. This is an improvement to an existing capability.

### Modified Capabilities
- `<map-navigation>`: Clicking a camera marker now triggers a smooth map animation (`flyTo`) before/alongside the URL state upate, replacing the static recentering behavior.
