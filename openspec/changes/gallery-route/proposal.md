## Why
The current full-screen image gallery is implemented as a local `<Modal>` inside the `CamDetailScreen`. This means the application URL does not reflect the "gallery open" state, which breaks standard web routing expectations. More importantly, it does not integrate with Expo Router's navigation stack, meaning the physical back button on Android might navigate away from the screen entirely instead of just closing the modal.

## What
Refactor the full-screen gallery to be a dedicated route within Expo Router.
1. Extract the `ImageViewer` into a new screen: `app/cam/gallery.tsx`.
2. Pass the image URL as a query parameter (e.g., `?url=...`).
3. Update `app/cam/[id].tsx` to navigate to the new route instead of toggling local state.
4. Configure the new route to appear as a transparent modal overlay to preserve the UX.

## Impact
- **Affected components**: `app/cam/[id].tsx`
- **New files**: `app/cam/gallery.tsx`
- **Navigation config**: `app/_layout.tsx`
