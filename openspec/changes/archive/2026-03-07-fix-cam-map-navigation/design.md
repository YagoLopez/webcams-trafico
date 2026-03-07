## Architecture

We will introduce a new nested route in Expo Router: `app/cam/[id]/map.tsx`. This screen will take the necessary URL parameters (like `lat`, `lon`, and `cameraId`) and render the existing `TrafficMap` component. This leverages React Navigation's standard Stack Navigator behavior, pushing the map view on top of the `cam/[id]` detail view.

The global map will remain at `app/(drawer)/map.tsx` for general use. The `app/cam/[id].tsx` file will be modified to use `router.push({ pathname: '/cam/[id]/map', params: ... })` instead of `/map`.

## Components

1.  **`app/cam/[id]/map.tsx` [NEW]**:
    *   A new Expo Router route.
    *   It will read `lat`, `lon`, and `cameraId` from `useLocalSearchParams()`.
    *   It will render the existing `<TrafficMap />` component, similar to how the Drawer map does it, but without being bound to the Drawer navigator logic.
2.  **`app/cam/[id].tsx` [MODIFY]**:
    *   Update the `Pressable` onPress handler for the map preview.
    *   Change the target route from `/map` to `/cam/[id]/map`.

## Data Flow

Route parameters (`lat`, `lon`, `cameraId`) will be passed via Expo Router's navigation parameters from the Detail screen to the Detail Map screen. The `TrafficMap` component internally manages the display of these cameras.

## Trade-offs and Risks

*   **Risk**: Minor duplication of the screen wrapper code around `<TrafficMap />`.
*   **Mitigation**: The wrapper is very thin (mostly just `useLocalSearchParams` and passing props).
*   **Trade-off**: Adding a new file vs. hacking the back button. Creating a new route aligns with the framework's intended architecture for nested navigation, providing robust back-button handling natively on both iOS and Android.
