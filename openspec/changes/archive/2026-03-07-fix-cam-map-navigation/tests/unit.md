# Unit Tests Plan

## Navigation Tests

### Testing `cam/[id].tsx` Map Button
- [ ] Mock `expo-router`'s `useRouter`.
- [ ] Render the `CamDetailScreen` with a valid camera mock.
- [ ] Find the "Mostrar en mapa" button.
- [ ] Fire a press event on the button.
- [ ] Verify that `router.push` was called with `{ pathname: '/cam/[id]/map', params: { lat: expect.any(Number), lon: expect.any(Number), cameraId: 'mock-id' } }`.

### Testing `cam/[id]/map.tsx`
- [ ] Mock `expo-router`'s `useLocalSearchParams` to return mock `lat`, `lon`, and `cameraId`.
- [ ] Render the new `CameraMapScreen`.
- [ ] Verify that `<TrafficMap>` is rendered.
- [ ] Verify that `<TrafficMap>` receives the correct `center` prop derived from the mocked search params.
