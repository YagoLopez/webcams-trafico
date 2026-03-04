## Context

The mobile `TrafficMap.tsx` component currently uses `react-native-maps` with `mapType="none"` and an OpenStreetMap `UrlTile` overlay. This workaround was used because no Google Maps API key was available. It has caused persistent native rendering bugs on Android (crash on `addViewAt`, missing markers, `TurboModuleRegistry` errors).

A Google Maps API key has now been obtained and is stored in `.env` as `GOOGLE_MAPS_API_KEY`.

## Goals / Non-Goals

**Goals:**

- Switch the mobile map provider from OSM tiles to native Google Maps on Android
- Configure the Google Maps API key in `app.json` for the Android build
- Preserve all existing map behaviors: clustering, markers, callouts, center animation, camera selection
- Eliminate the native rendering bugs caused by the `mapType="none"` + `UrlTile` workaround

**Non-Goals:**

- Changing the web map implementation (Leaflet stays as-is)
- Adding new map features (Street View, different map styles, etc.)
- Migrating to `expo-maps` (evaluated and rejected due to alpha status and lack of clustering)
- iOS-specific changes (Google Maps on iOS requires additional CocoaPods configuration — out of scope for now)

## Decisions

1. **Keep `react-native-maps`** — It already supports `PROVIDER_GOOGLE` natively. No library change needed.

2. **Keep `react-native-map-clustering`** — Fully compatible with `PROVIDER_GOOGLE`. The clustering library works independently of the tile provider.

3. **Hardcode API key in `app.json`** — For simplicity, the API key will be placed directly in `app.json` under `android.config.googleMaps.apiKey`. A `.env`-based injection via `app.config.js` is possible but adds complexity for a single key that is already public-facing (Android API keys are restricted by package name + SHA-1, not by secrecy).

4. **Remove `mapType="none"` and `UrlTile`** — These were the workaround for not having a Google Maps key. With the native provider, Google Maps renders its own base tiles.

5. **Default `mapType` to `"standard"`** — This shows the standard Google Maps view (roads, labels, terrain coloring). Other options (`satellite`, `hybrid`, `terrain`) are available but not needed now.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Requires full Android rebuild (not just hot reload) | Expected — document in tasks |
| Google Maps API key is visible in `app.json` / APK | Android keys are restricted by package SHA-1 fingerprint, not by secrecy. Standard practice. |
| `react-native-map-clustering` behavior may differ slightly with Google provider | Library explicitly supports Google provider. Existing clustering props are preserved. |
| iOS will still use Apple Maps (default provider) | Out of scope. Can be addressed in a future change if needed. |
