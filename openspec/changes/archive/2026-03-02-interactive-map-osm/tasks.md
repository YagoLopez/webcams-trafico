## 1. Setup & Dependencies

- [x] 1.1 Install native map dependencies (`react-native-maps`, `react-native-map-clustering`, `expo-location`)
- [x] 1.2 Install web map dependencies (`leaflet`, `react-leaflet`, `react-leaflet-cluster`, `@types/leaflet`)
- [x] 1.3 Add location permissions to app.json for Android and iOS

## 2. Core Components: TrafficMap

- [x] 2.1 Create base structure for `components/TrafficMap` folder
- [x] 2.2 Implement `TrafficMap.web.tsx` using `react-leaflet` with OSM base layer and clustering
- [x] 2.3 Implement `TrafficMap.native.tsx` using `react-native-maps` with OSM `UrlTile` and clustering
- [x] 2.4 Create `index.tsx` inside `TrafficMap` folder to export the correct platform component dynamically

## 3. Routes and Navigation

- [x] 3.1 Create new `app/map.tsx` route to host the `<TrafficMap />` component
- [x] 3.2 Implement `useLocalSearchParams` in `/map` to listen for `lat` and `lon`
- [x] 3.3 Implement `expo-location` fallback in `/map.tsx` to get user location if coords are missing

## 4. Map Integrations

- [x] 4.1 Update `app/cam/[id].tsx` to navigate to `/map?lat=X&lon=Y` when tapping the camera image
- [x] 4.2 Add "View on Map" entry in the left drawer navigation pointing to `/map`
