## 1. Map Animation Implementation

- [x] 1.1 Gain access to the Leaflet map instance in `TrafficMapWebClient` by adding a ref (`mapRef`) to the `MapContainer`.
- [x] 1.2 In the `Marker`'s click `eventHandlers`, before or alongside updating the state/router, call `map.flyTo([lat, lon], 15, { animate: true })` using the map instance from the ref.
- [x] 1.3 Verify that the existing `MapController` logic correctly skips the conflicting React-driven center update while the animation executes cleanly.
- [x] 1.4 Test the interaction to ensure there are no popup flashing issues or conflicts with `autoPan`.
