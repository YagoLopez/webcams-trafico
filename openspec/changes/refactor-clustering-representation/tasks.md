# Tasks: Refactor Clustering Representation

## Instructions
1. We will update the clustering visually to a red circular badge displaying the camera count, removing any polygon coverage / spiderfy effects.

## 1. Web Clustering Implementation
- [x] **File**: `components/TrafficMap/TrafficMap.web.client.tsx`
- **Action**: Modify `<MarkerClusterGroup>`

...

## 2. Mobile Clustering Implementation
- [x] **File**: `components/TrafficMap/TrafficMap.tsx`
- **Action**: Add `renderCluster` to `<MapView>`
- **Details**:
  - Implement the `renderCluster` prop.
  - It receives an object (e.g. `cluster`). Let's destructure what we need: `id`, `onPress`, `geometry`, `properties` (where `properties.point_count` has the count).
  - Return a React Native `<Marker>` at `coordinate={{ latitude: geometry.coordinates[1], longitude: geometry.coordinates[0] }}`.
  - Bind `onPress={onPress}` to keep the default zoom-in behavior.
  - Inside the Marker, render a `<View>` with Tailwind CSS classes for a red circle (e.g., `bg-red-500 rounded-full w-10 h-10 items-center justify-center border-2 border-white shadow-md`).
  - Inside the View, render a `<Text>` with `className="text-white font-bold"` displaying `properties.point_count`.

## 3. Verify
- Run the web app (`npm run web` / `npx expo start -w`).
- Ensure the map displays red circular badges with numbers for clusters.
- Ensure hovering/clicking doesn't draw polygons or spider legs on web.
- Run the mobile app (`npm run android` / `npm run ios`).
- Ensure parity (clusters look identical with red circles) and zooming on tap works.
