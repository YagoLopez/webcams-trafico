# Unit Tests Plan

This change modifies configuration (`app.json`) and swaps the map provider in `TrafficMap.tsx`. No new functions, hooks, or components are created — only props are changed and imports removed.

## Unit Tests Checklist

- [ ] Verify `TrafficMap` component renders without errors when `PROVIDER_GOOGLE` is set (mock `react-native-maps` with provider prop)
- [ ] Verify `TrafficMap` does not render a `UrlTile` component (ensure OSM tiles are fully removed)
- [ ] Verify existing marker rendering logic still passes (camera data → Marker components)
- [ ] Verify cluster rendering callback still produces valid Marker output
