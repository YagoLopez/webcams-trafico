## 1. Configuration

- [ ] 1.1 Add `android.config.googleMaps.apiKey` to `app.json` with the Google Maps API key from `.env`
- [ ] 1.2 Verify `app.json` has valid JSON structure after modification

## 2. TrafficMap Component Migration

- [ ] 2.1 Import `PROVIDER_GOOGLE` from `react-native-maps` in `TrafficMap.tsx`
- [ ] 2.2 Add `provider={PROVIDER_GOOGLE}` prop to the `MapView` component
- [ ] 2.3 Remove `mapType="none"` prop (or change to `mapType="standard"`)
- [ ] 2.4 Remove the `<UrlTile>` component (OSM tiles are no longer needed)
- [ ] 2.5 Remove the `UrlTile` import from `react-native-maps`

## 3. Verification

- [ ] 3.1 Rebuild Android binary with `eas build` or local build
- [ ] 3.2 Launch app on Android emulator and verify Google Maps base tiles render
- [ ] 3.3 Verify camera markers appear with correct icons
- [ ] 3.4 Verify clustering works at low zoom levels
- [ ] 3.5 Verify callout popup appears when tapping a marker
- [ ] 3.6 Verify center animation works when selecting cameras from the list
- [ ] 3.7 Verify web map (Leaflet) is unaffected
