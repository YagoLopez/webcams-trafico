# Implementation Tasks

## 1. Setup Dependencies
- [x] 1.1 Install `react-native-awesome-gallery` using the package manager.

## 2. Update CamDetailScreen
- [x] 2.1 Import `useState` and `AwesomeGallery`.
- [x] 2.2 Add local state `const [isExpanded, setIsExpanded] = useState(false);` to the `CamDetailScreen` component.
- [x] 2.3 Modify the existing `Image` container conditionally: if the camera is online, wrap the `Image` in a `Pressable` that calls `setIsExpanded(true)` `onPress`.
- [x] 2.4 Add the `AwesomeGallery` component to the root of the screen (or as a Modal child) that renders conditionally when `isExpanded` is true.
  - Set `data={[{ uri: cam.imageUrl }]}`.
  - Set `onSwipeToClose={() => setIsExpanded(false)}`.

## 3. Verification
- [x] 3.1 Test that tapping the image opens the gallery.
- [x] 3.2 Test pinch-to-zoom, pan, and double-tap-to-zoom gestures.
- [x] 3.3 Test swipe-to-dismiss gesture smoothly closes the gallery.
- [x] 3.4 Test that an offline camera image cannot be expanded.
