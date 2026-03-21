## Context

The app currently has two drawer screens: camera list (`index`) and map (`map`). The map screen loads all ~1700 cameras and centers on the user's GPS position using `expo-location`. The `TrafficMap` component supports a `selectedCameraId` prop that highlights a marker and shows a pseudo-callout with the camera's image.

The goal is to add a third screen that combines road selection with GPS-based proximity search to find and highlight the nearest camera.

## Goals / Non-Goals

**Goals:**
- Let users select a road and find the nearest camera on that road based on GPS
- Reuse existing components (`SelectBox`, `TrafficMap`, `useRoads`)
- Keep the architecture simple — single screen with two states (selection → results)

**Non-Goals:**
- Automatic road detection via reverse geocoding
- Real-time tracking / continuous location updates
- Background location permissions (foreground-only is sufficient)

## Decisions

### 1. Haversine formula for distance calculation
**Decision**: Use the Haversine formula as a pure utility function.
**Rationale**: The Haversine formula computes great-circle distance between two GPS points. It's simple, has no external dependencies, and is accurate enough for finding the nearest camera (we don't need sub-meter precision). Alternatives like Vincenty's formula offer better accuracy for long distances but are overkill here.

### 2. Single-screen layout
**Decision**: One screen with a top selector panel and a bottom map, rather than a two-step wizard.
**Rationale**: Avoids navigation complexity. The user sees the map immediately and it updates in-place when they search. The `SelectBox` + button sit in a compact bar above the map.

### 3. Filter cameras client-side
**Decision**: Use `getFilteredCams({ roadName })` to filter, then compute distances in-memory.
**Rationale**: Data is already loaded locally from `webcams.json`. No network call needed. Filtering ~1700 items and computing distances is instantaneous.

### 4. Show only cameras from selected road
**Decision**: Pass only the filtered camera list to `TrafficMap`, not all cameras.
**Rationale**: User explicitly chose a road — showing other roads' cameras would add noise. The selected road's cameras provide enough context.

## Risks / Trade-offs

- **Location permission denied** → Show a user-friendly message explaining GPS is needed, with a fallback suggestion to use the regular map screen instead.
- **No cameras on selected road** → Edge case if data is corrupt. Show a "No cameras found" message.
- **GPS accuracy** → In areas with poor GPS (tunnels, buildings), the "nearest" camera might be slightly off. Acceptable for this use case.
