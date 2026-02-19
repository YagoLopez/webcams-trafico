<artifact id="design" change="webcams-list-feature" schema="spec-driven">
<!--
title: Webcam List UI Design
classification: UI Implementation
status: Draft
-->

## Context
We are implementing the "Webcam List View" screen based on the provided Stitch HTML design. The goal is to create a responsive, performant list of traffic cameras using React Native and TailwindCSS.

## Goals / Non-Goals

**Goals:**
- Create a reusable `WebcamCard` component matching the visual design.
- Implement `WebcamsListScreen` using `FlatList` for performance.
- Use TailwindCSS for styling to match the provided color palette and typography.
- Define a strict TypeScript interface `WebcamData` for type safety.
- Ensure images are responsive and handle aspect ratios correctly.

**Non-Goals:**
- Real API integration (we will use mock data for this iteration).
- Detailed "Map" or "Settings" screens (only the Webcams List is in scope).
- complex filtering logic beyond the UI representation.

## Decisions

### Component Structure
- **`WebcamCard`**: A functional component that takes `item: WebcamData` as a prop.
    - Uses `Image` with `width: '100%'` and `aspectRatio` (calculated from design ~1.6) to prevent layout shifts.
    - Uses absolute positioning for the status badge (bottom-left) and icon (top-right).
- **`WebcamsListScreen`**: The main screen container.
    - Uses `FlatList` with `numColumns={1}` for mobile (as per design) but flexible for tablet/desktop `numColumns={2}` if screen width allows.
    - Header components (Search, Filters) will be rendered via `ListHeaderComponent` to scroll with the list.

### Styling Strategy
- **Library**: NativeWind (TailwindCSS for React Native).
- **Theme**: Extend Tailwind config with custom colors extracted from design:
    - `primary`: `#137fec`
    - `background-light`: `#f6f7f8`
    - `background-dark`: `#101922`
- **Typography**: Use standard React Native font handling, applying `font-display` utility class if custom font is loaded, otherwise system default.

### Data Model
```typescript
interface WebcamData {
  id: string;
  imageUrl: string;
  road: string;      // e.g., "A-6"
  kilometer: string; // e.g., "Pk 12.5"
  location: string;  // e.g., "Madrid, Moncloa"
  status: 'active' | 'offline'; 
}
```

## Risks / Trade-offs
- **Image Aspect Ratio**: The design has fixed height images. We must ensure varying image sizes don't break the layout. `resizeMode="cover"` is the chosen mitigation.
- **Performance**: Large lists of images can be memory intensive. `FlatList` optimization props (`initialNumToRender`, `windowSize`) will be used.

</artifact>
