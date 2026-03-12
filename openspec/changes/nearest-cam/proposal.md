## Why

Users need a quick way to find the closest traffic camera while driving on a specific road. Currently, the app shows all cameras on a map or a paginated list, requiring manual search. A "nearest camera" feature lets the user select their road, automatically locate themselves via GPS, and instantly see the closest camera — reducing distraction while driving.

## What Changes

- Add a new drawer screen `/nearby-cam` ("Cámara cercana") with:
  - A `SelectBox` for road selection (reusing existing component and `useRoads` hook)
  - A "Buscar cámara cercana" button
  - A `TrafficMap` showing only cameras on the selected road, with the nearest one pre-selected
- Add a Haversine distance utility function for GPS distance calculations
- Register the new screen in the drawer layout

## Capabilities

### New Capabilities
- `nearest-cam`: Find and display the nearest traffic camera on a user-selected road based on GPS position. Includes road selection, distance calculation, and map visualization with auto-selection.

### Modified Capabilities
- `drawer-navigation`: Add a third drawer entry for the new "Cámara cercana" screen

## Impact

- **New files**: `app/(drawer)/nearby-cam.tsx`, `lib/utils/haversine.ts`
- **Modified files**: `app/(drawer)/_layout.tsx` (add Drawer.Screen)
- **Reused components**: `SelectBox`, `TrafficMap`, `useRoads`, `JsonCamsRepository`
- **Dependencies**: `expo-location` (already installed)
