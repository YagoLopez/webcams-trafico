# Unit Tests Plan

Identify units (functions, components, hooks) altered or created during the implementation tasks.

## Unit Tests Checklist

- [ ] `<TrafficMap />` (Web implementation) renders `react-leaflet` with `UrlTile` properly.
- [ ] `<TrafficMap />` (Native implementation) renders `react-native-maps` properly (mock native modules using `jest`).
- [ ] `<TrafficMap />` centers on the provided `lat` and `lon` props on mount.
- [ ] `<TrafficMap />` fetches and uses user location via `expo-location` if `lat`/`lon` props are missing.
- [ ] `/map` route successfully parses `lat` and `lon` from `useLocalSearchParams` and passes them to `<TrafficMap />`.
- [ ] `/cam/[id]` detail view navigates to `/map` with correct `lat`/`lon` parameters when the map button is pressed (mock `useRouter`).
