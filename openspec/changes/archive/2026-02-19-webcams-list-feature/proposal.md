<artifact id="proposal" change="webcams-list-feature" schema="spec-driven">
<!--
title: Webcam List Feature
classification: Feature
status: Proposed
-->

## Goal
Implement a "Webcam List View" screen in React Native that displays a grid/list of traffic cameras (DGT), matching the design and interactions of the provided Stitch HTML mockup.

## Success Criteria
- [ ] `WebcamsListScreen` renders a performant `FlatList` of webcams.
- [ ] `WebcamCard` component accurately reflects the provided design (image, title, location, status colors).
- [ ] UI Visuals match the Stitch design:
    - Primary Color: `#137fec`
    - Typography: Inter (or system sans-serif)
    - Specific padding, margins, and shadow styles from Tailwind config.
- [ ] Data handling:
    - `WebcamData` interface defined.
    - Mock data (`MOCK_DATA`) provided for immediate viewing.
- [ ] Implementation uses TailwindCSS (`nativewind` or compatible) for styling.
- [ ] Images use `resizeMode="cover"` and maintain aspect ratio.

## Unlocks
design, specs

## Why
Users need a way to view real-time traffic conditions. This feature implements the core browsing interface for the DGT traffic cameras.
</artifact>
