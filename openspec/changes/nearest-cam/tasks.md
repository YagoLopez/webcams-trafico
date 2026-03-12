## 1. Utility: Haversine Distance

- [x] 1.1 Create `lib/utils/haversine.ts` with `haversineDistance(lat1, lon1, lat2, lon2): number` function returning distance in km

## 2. Nearest Camera Screen

- [x] 2.1 Create `app/(drawer)/nearby-cam.tsx` with road selector (`SelectBox` + `useRoads`), search button, and loading/error states
- [x] 2.2 Implement GPS location request using `expo-location` (foreground permission)
- [x] 2.3 Implement nearest camera logic: filter cameras by selected road, compute Haversine distances, select the minimum
- [x] 2.4 Render `TrafficMap` with filtered cameras and `selectedCameraId` set to the nearest camera

## 3. Drawer Registration

- [x] 3.1 Add `nearby-cam` as a `Drawer.Screen` in `app/(drawer)/_layout.tsx` with title "Cámara cercana" and a location icon

## 4. Tests

- [x] 4.1 Create unit test for `haversineDistance` with known coordinate pairs
