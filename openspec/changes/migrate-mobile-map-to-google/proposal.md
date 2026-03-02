## Why

The mobile `TrafficMap.tsx` currently uses `react-native-maps` with `mapType="none"` and OpenStreetMap URL tiles as a workaround to avoid needing a Google Maps API key. This approach has caused multiple critical bugs:

- **`addViewAt: failed to insert view`** crashes when panning/zooming on Android
- **`TurboModuleRegistry.getEnforcing: 'RNMapsAirModule' could not be found`** errors
- **Invisible custom marker icons** on Android
- **Map not loading at all** on mobile in some sessions

Now that we have a Google Maps API key (`GOOGLE_MAPS_API_KEY` in `.env`), we can switch to Google Maps native rendering, which eliminates the root cause of these issues.

## What Changes

- Configure `app.json` with the Google Maps API key under `android.config.googleMaps.apiKey`
- Modify `TrafficMap.tsx` to use `PROVIDER_GOOGLE` and remove the OSM `UrlTile` workaround
- Remove `mapType="none"` since Google Maps provides its own base tiles
- Keep `react-native-map-clustering` for marker clustering (compatible with Google provider)
- No changes to the web map (Leaflet remains for web)

## Capabilities

### New Capabilities

_None — this is a migration of the existing map to a different provider._

### Modified Capabilities

- `interactive-map-osm`: The mobile map provider changes from OSM tiles to native Google Maps. All existing behaviors (clustering, camera markers, callouts, center animation) are preserved. The base map layer changes from OpenStreetMap tiles to Google Maps native tiles on Android.

## Impact

- **`app.json`**: New `android.config.googleMaps` block with API key
- **`TrafficMap.tsx`**: Replace `mapType="none"` + `UrlTile` with `provider={PROVIDER_GOOGLE}`
- **Build**: Requires a full rebuild of the Android binary (the API key is injected into `AndroidManifest.xml` at build time — hot reload is not sufficient)
- **Dependencies**: No new dependencies; `react-native-maps` already supports Google provider
- **Web**: No impact — Leaflet-based web map is untouched
