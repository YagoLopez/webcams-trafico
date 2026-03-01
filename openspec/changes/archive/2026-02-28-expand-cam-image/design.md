## Context

Currently, the webcam image in `app/cam/[id].tsx` is displayed as a simple static `<Image>` component. Users cannot zoom in or interact with the image to see finer details like traffic conditions.

## Architecture & Approach

We will implement a clean, lightweight integration using local component state and the `react-native-image-zoom-viewer` library.

1. **State Management**: Add a local state `isExpanded` via `useState(false)` in `CamDetailScreen`.
2. **Trigger**: Wrap the existing `Image` component inside a `Pressable` that sets `isExpanded` to `true` on press.
3. **Full-Screen Viewer**: Add the `ImageViewer` component from `react-native-image-zoom-viewer` to the render tree.
   - It will receive `[{ url: cam.imageUrl }]` as its data.
   - The `onSwipeDown` property (or equivalent close handler) will set `isExpanded` to `false`.

## Technical Details

- **Dependencies**: Install `react-native-image-zoom-viewer`. It works reliably across multiple platforms including web.
- **Component**: `ImageViewer` provides pinch-to-zoom, panning, double tap to zoom, and swipe-to-dismiss.
- **Fallbacks**: If the camera is offline, we will not allow expansion (the `Pressable` will be disabled or not rendered around the offline placeholder).

## Trade-offs & Alternatives

1. **Custom Implementation via Reanimated/Gesture Handler**
   - *Pros*: Zero new dependencies.
   - *Cons*: Implementing robust pan/zoom physics, bounding boxes, and fluid swipe-to-dismiss is complex, time-consuming, and prone to edge-case bugs.
2. **`react-native-image-viewing` or `react-native-awesome-gallery`**
   - *Pros*: Slightly easier API, very popular, or more modern performance.
   - *Cons*: Found issues running seamlessly on the web platform during implementation.

`react-native-image-zoom-viewer` provides the best balance of multi-platform compatibility and ease of integration.
