## Why

Currently, the application uses a bottom tab layout. Moving to a drawer layout with a top header (including a hamburger menu, app title, and webcam count) provides a cleaner UI, prioritizes content, and aligns better with Material Design guidelines.

## What Changes

- **BREAKING**: Replace the current tab-based layout (`app/(tabs)`) with a drawer layout (`app/(drawer)`).
- Implement a custom header containing a hamburger icon, title, and the number of webcams currently listed.
- Create an "Explorar" route accessible from the drawer menu.
- Open the existing `FiltersModal` directly from the drawer menu without creating a new route for it (keeping the codebase simple).
- Remove the `app/(tabs)/_layout.tsx` and integrate the drawer navigation in place.

## Capabilities

### New Capabilities
- `drawer-navigation`: Core capability for navigating between the main list and the map exploration view via a side drawer, including a custom top header.

### Modified Capabilities

## Impact

- Navigation routing structure will change from `(tabs)` to `(drawer)`.
- Global layout `app/_layout.tsx` will be updated to point to the new drawer group.
- Screens currently under `app/(tabs)` will be moved to `app/(drawer)`.
- `FiltersModal` visibility state needs to be managed to open it from the custom drawer content.
