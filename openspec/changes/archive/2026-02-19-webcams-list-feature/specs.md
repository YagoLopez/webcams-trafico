<artifact id="specs" change="webcams-list-feature" schema="spec-driven">
<!--
title: Webcam List Specifications
classification: Functional Requirements
status: Approved
-->

## ADDED Requirements

### Requirement: Display Webcam List
The application SHALL display a scrollable list of traffic cameras.

#### Scenario: Render List
- **WHEN** the `WebcamsListScreen` component is mounted
- **THEN** it renders a `FlatList` containing webcam items.
- **THEN** the list is scrollable vertically.

### Requirement: Display Webcam Item Details
Each item in the list SHALL display the webcam feed image, road identifier, kilometer point, and location description.

#### Scenario: Item Content
- **WHEN** a `WebcamCard` is rendered with valid data
- **THEN** it displays an image with `resizeMode="cover"`.
- **THEN** it shows the road name (e.g. "A-6") in a badge.
- **THEN** it shows the kilometer point and direction (e.g. "Pk 12.5 - Salida Aravaca").
- **THEN** it shows the location description (e.g. "Madrid, Moncloa").

### Requirement: Visual Styling Compliance
The UI implementation SHALL adhere to the specified color palette and typography.

#### Scenario: Color Palette Application
- **WHEN** components are rendered
- **THEN** the primary color `#137fec` is used for primary actions/badges.
- **THEN** the background colors `#f6f7f8` (light) or `#101922` (dark) are applied based on the theme.
- **THEN** typography uses the Inter font family (or system sans-serif fallback).

### Requirement: Responsive Image Handling
Webcam images SHALL fill their container width and maintain a fixed aspect ratio without distortion.

#### Scenario: Image Sizing
- **WHEN** an image of arbitrary dimensions is loaded
- **THEN** it fills 100% of the container width.
- **THEN** it maintains a fixed height (e.g., 12rem/192px as per design ~h-48) or aspect ratio ~1.6.
- **THEN** `resizeMode="cover"` is applied to prevent whitespace or distortion.

<unlocks>
Completing this artifact enables: tasks
</unlocks>

</artifact>
