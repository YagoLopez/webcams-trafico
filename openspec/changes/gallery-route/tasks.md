# Implementation Tasks

## 1. Create Gallery Route
- [x] 1.1 Create `app/cam/gallery.tsx`.
- [x] 1.2 Implement the `GalleryScreen` function. Use `useLocalSearchParams` to extract `url` and `router.back()` for the close interactions in the `ImageViewer`.
- [x] 1.3 Add a `Stack.Screen` config directly in `app/cam/gallery.tsx` (using `<Stack.Screen options={{ presentation: 'transparentModal', animation: 'fade', headerShown: false }} />`) or in the root `_layout.tsx`.

## 2. Refactor Cam Detail Screen
- [x] 2.1 In `app/cam/[id].tsx`, remove `isExpanded` state and the `Modal`/`ImageViewer` tree at the bottom.
- [x] 2.2 Change the `Pressable` `onPress` wrapping the `Image` to `router.push({ pathname: '/cam/gallery', params: { url: cam.imageUrl } })`.

## 3. Update E2E Tests
- [x] 3.1 In `e2e/cam-detail.spec.ts`, adjust the test for opening the image gallery since it's now a route change.
- [x] 3.2 Ensure the close button test waits for the navigation back to complete.
