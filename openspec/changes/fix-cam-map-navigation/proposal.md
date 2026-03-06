## Why

Currently, when navigating from a camera's detail screen to the map, pressing the physical "Back" button (on Android) takes the user to the camera list instead of back to the camera detail. This happens because the global map is part of the Drawer navigator, and navigating to it pops the detail screen off the stack. We want to provide a native navigation experience where the user returns to the previous screen.

## What

We will create a dedicated map route for camera details (`app/cam/[id]/map.tsx`) that reuses the existing `<TrafficMap />` component. We will then update the "Mostrar en mapa" button in `app/cam/[id].tsx` to push to this new route instead of the global drawer map. This ensures the map is pushed onto the global stack, preserving the detail screen in the navigation history.

## Impact

*   **Users:** A more intuitive and expected navigation flow (Back button works as intended).
*   **Code:** Clean separation between the global drawer map and the detail-specific map, utilizing React Navigation's native stack behavior without needing complex `BackHandler` hacks.
