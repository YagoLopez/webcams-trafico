## Context
Currently, the `TrafficMap` component in mobile apps is experiencing performance slowdowns, broken callouts, and displacement of camera markers when rendering many points simultaneously. Previous solutions, including a custom supercluster approach or using standard OpenStreetMap tiles on native, have presented varied issues. Based on recent best practices for Expo (e.g., Medium article "Exploring Maps in Expo with React Native"), combining standard `react-native-maps` with `PROVIDER_GOOGLE` and the third-party library `react-native-map-clustering` is the recommended path for clustered map views natively in Expo.

## Architecture
- **Component**: `TrafficMap.tsx`
- **Core Library**: `react-native-maps` using `PROVIDER_GOOGLE` (requires Android API key in `app.json`).
- **Clustering Library**: `react-native-map-clustering` providing the `<MapViewCluster>` (or exported default as `MapView`) component. This wraps the standard map, takes a list of `<Marker>` children, and dynamically clusters them based on zoom level.
- **Markers**: Custom markers will be passed as children to `MapViewCluster`. We will ensure `tracksViewChanges` is optimized (e.g., disabled after initial render or kept false for static images) to prevent the Android `addViewAt` crash.

## Data Flow
1. `TrafficMap` receives `webcams` data from Zustand store (`useWebcamsStore`).
2. The component maps over the `webcams` array to create `<Marker>` elements.
3. These `<Marker>` elements are passed as children to the `<MapViewCluster>` component (from `react-native-map-clustering`).
4. The clustering library internally calculates superclusters and renders cluster markers or individual markers depending on the current map region.

## API Changes
- No backend API changes.
- Add dependency: `npm install react-native-map-clustering` (or `expo install`).
- Update `TrafficMap.tsx` imports to use the clusterer.

## Trade-offs
- **Pros**: Easy to implement using a proven community package. Solves performance UI clutter without writing a custom clusterer implementation. Integrates well with native Google Maps.
- **Cons**: Adds a third-party dependency specifically for clustering. We are reliant on `react-native-map-clustering`'s compatibility with future `react-native-maps` updates. May still need careful management of `tracksViewChanges` for custom marker images on Android.
