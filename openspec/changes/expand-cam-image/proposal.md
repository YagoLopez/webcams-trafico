## Why

The current detail screen for a webcam only shows a static image. Users want to be able to tap the image to view it in full screen, and to use gestures like pinch-to-zoom and pan to see details more closely. This significantly improves the user experience.

## What

- Add a full-screen image viewer to the `app/cam/[id].tsx` screen.
- The viewer should open when the user taps on the webcam image.
- It should support pinch-to-zoom, panning, double tap to zoom, and swipe to dismiss.
- We will use the `react-native-awesome-gallery` library, as it is modern, performant, and built on top of `react-native-reanimated` and `react-native-gesture-handler` (which are already in the project).

## Impact

- **Affected components**: `app/cam/[id].tsx`
- **Dependencies**: Adds `react-native-awesome-gallery` to `package.json`.
