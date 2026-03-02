## Context

Currently, the `TrafficMap.web.client.tsx` component handles marker clicks by updating the `selectedCameraId` and re-routing. To prevent jarring visual layout jumps when React pushes down new `center` props, the internal `MapController` intentionally skips setting the view if the difference is larger than a small threshold (`0.0001`), essentially relying on instantaneous recentering or manual user panning.
This creates a functional but non-fluid experience. We want to introduce a smooth pan/fly animation to the selected camera, enhancing the application's spatial feel. Since `react-leaflet` controls the map reactively, we need a way to trigger Leaflet's imperative animation APIs (`flyTo` or `panTo`) immediately upon user interaction without fighting the React render cycle or the `MapController`'s skip logic.

## Goals / Non-Goals

**Goals:**
- Provide a smooth visual animated transition when centering the map on a clicked camera marker.
- Ensure the animation does not conflict with React Router state updates.
- Keep the `MapController`'s skip logic intact for non-interactive center updates if needed.

**Non-Goals:**
- Completely rewriting the map state management.
- Changing how clustering or marker rendering works.
- Altering behavior on native platforms (this scope is strictly Web/Leaflet).

## Decisions

**Decision 1: Use imperative `flyTo` inside the Marker's `eventHandlers` click callback.**
*Rationale:* When a user clicks a `Marker`, we have direct access to the Leaflet marker event and the `useMap` map instance. By calling `map.flyTo([lat, lon], 15, { animate: true })` immediately in the click handler, we instruct Leaflet to start the animation *before* React reconciles the new URL or state.
*Alternatives considered:*
- Updating `MapController` to conditionally allow animation: This is possible but complex. We'd need to distinguish between a "user click" center update vs. an "external routing" center update to know when to animate. The imperative approach is more direct and avoids complex state passing.

**Decision 2: Obtain the map instance efficiently.**
*Rationale:* We can obtain the Leaflet map instance within the `TrafficMapWebClient` either by moving the `Marker` mapping into a child component that uses `useMap()`, or by accessing the `_map` property of the `Marker` references already being collected in `markerRefs`. 
A cleaner React approach is to wrap the Markers mapping logic in a component that calls `useMap()`, passing `map` down, or simply use `MapContainer`'s `whenCreated` (or `ref` in newer react-leaflet versions) to store the map instance in a ref (`mapRef.current`). We will use a `mapRef` on the `MapContainer`.

## Risks / Trade-offs

- **Risk: Popup flashing/auto-panning conflict.** -> *Mitigation:* Leaflet popups also try to auto-pan the map to ensure visibility. If both `flyTo` and `popup.autoPan` run simultaneously, they can conflict. We may need to pass `autoPan: false` to the `<Popup>` if conflicts arise, or ensure `flyTo` logic handles the timing correctly.
- **Risk: React re-render interrupts Leaflet animation.** -> *Mitigation:* `MapContainer` does not re-instantiate the map on prop changes unless key props change. Since we keep the same map instance, `flyTo` will continue uninterrupted across React renders. The existing `MapController`'s `skip animation` logic will correctly ignore the React state update since `dx` and `dy` will be 0 once `flyTo` finishes or starts pulling towards the same coordinate.
