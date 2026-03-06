# Implementation Tasks

## 1. Setup Camera Detail Map Route
- [x] Create file `app/cam/[id]/map.tsx`.
- [x] Implement the returning component in this file.
- [x] Read `lat`, `lon`, and `cameraId` from `useLocalSearchParams()`.
- [x] Import and render the `<TrafficMap>` component passing these parameters, similar to how `app/(drawer)/map.tsx` manages it.

## 2. Update Navigation from Detail Screen
- [x] Open `app/cam/[id].tsx`.
- [x] Locate the "Mostrar en mapa" `Pressable` component.
- [x] Change the `router.push` destination from: \`/map\`
      to: \`/cam/[id]/map\` (e.g., using an object with `pathname: '/cam/[id]/map'` and providing the `lat`, `lon`, `cameraId` params properly).
