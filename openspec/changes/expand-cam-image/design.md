## Context

Currently, the webcam image in `app/cam/[id].tsx` is displayed as a simple static `<Image>` component. Users cannot zoom in or interact with the image to see finer details like traffic conditions.

## Architecture & Approach

We will implement a clean, lightweight integration using local component state and the `react-native-awesome-gallery` library.

1. **State Management**: Add a local state `isExpanded` via `useState(false)` in `CamDetailScreen`.
2. **Trigger**: Wrap the existing `Image` component inside a `Pressable` that sets `isExpanded` to `true` on press.
3. **Full-Screen Viewer**: Add the `AwesomeGallery` component from `react-native-awesome-gallery` to the render tree.
   - It will receive `[{ uri: cam.imageUrl }]` as its data.
   - The `onSwipeToClose` property (or equivalent close handler) will set `isExpanded` to `false`.

## Technical Details

- **Dependencies**: Install `react-native-awesome-gallery`. It is built on `react-native-reanimated` and `react-native-gesture-handler`, which are already configured and working in the project, minimizing integration risk.
- **Component**: `AwesomeGallery` provides high-performance pinch-to-zoom, panning, double tap to zoom, and swipe-to-dismiss with native-like physics.
- **Fallbacks**: If the camera is offline, we will not allow expansion (the `Pressable` will be disabled or not rendered around the offline placeholder).

## Trade-offs & Alternatives

1. **Custom Implementation via Reanimated/Gesture Handler**
   - *Pros*: Zero new dependencies.
   - *Cons*: Implementing robust pan/zoom physics, bounding boxes, and fluid swipe-to-dismiss is complex, time-consuming, and prone to edge-case bugs.
2. **`react-native-image-viewing`**
   - *Pros*: Slightly easier API, very popular.
   - *Cons*: Uses the older React Native Animated API, resulting in less fluid gestures compared to modern Reanimated-based solutions like `AwesomeGallery`.

`react-native-awesome-gallery` provides the best balance of modern performance and ease of integration.
