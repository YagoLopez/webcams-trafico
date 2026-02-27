## Context
We need to decouple the full-screen ImageViewer modal from `app/cam/[id].tsx` and move it into Expo Router so the URL updates and back-button navigations work seamlessly.

## Architecture & Approach
We will create a new route `app/cam/gallery.tsx` mapped to `/cam/gallery`.
1. **Screen creation**: Data points like the image URL will be passed via query string since the image is already downloaded and we just need a string: `useLocalSearchParams<{ url: string }>()`.
2. **Component Separation**: `ImageViewer` from `react-native-image-zoom-viewer` will be the top-level element in this new screen. It will fill the screen with a black background.
3. **Closing the Gallery**: The close button or swipe-down gesture will trigger `router.back()` instead of updating local state.
4. **App Layout configuration**: In `app/_layout.tsx` (or whatever stack manages this route), we configure the `cam/gallery` route to use `presentation: 'transparentModal'` and `animation: 'fade'` to retain the feel of a modal overlay.

## Technical Details
- File `app/cam/[id].tsx`: Remove local `isExpanded` state and `<Modal>` wrapper. The `Pressable` wrapping the image will now call `router.push('/cam/gallery?url=' + encodeURIComponent(cam.imageUrl))`.
- File `app/cam/gallery.tsx`: Renders `<ImageViewer imageUrls={[{ url }]} onSwipeDown={() => router.back()} />`.
- `Playwright Tests`: In `cam-detail.spec.ts`, update the assertions since opening the gallery causes a navigation event rather than just showing a DOM modal. The URL will change to `/cam/gallery?url=...`.
