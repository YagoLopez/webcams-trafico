## Context

The application currently uses a bottom tab layout powered by Expo Router's `<Tabs>` component. To better align with Material Design guidelines and provide a more content-focused interface, we are transitioning to a side drawer navigation layout. This includes a custom top header that displays a hamburger menu, the application title, and the count of currently listed webcams.

## Goals / Non-Goals

**Goals:**
- Replace the existing `(tabs)` group with a new `(drawer)` group.
- Implement a custom header used by the drawer screens.
- Provide a navigation item for "Explorar" inside the drawer leading to the map view.
- Provide a "Filtrar Cámaras" action in the drawer that opens the existing `<FiltersModal>` directly without navigating to a new route.
- Keep the implementation simple by leveraging Expo Router's official `drawer` integration constraint mapping to `react-navigation/drawer`.

**Non-Goals:**
- Completely redesign the inner contents of the list or map screens.
- Create a routed map for the filter modal.

## Decisions

- **Use `expo-router/drawer` over custom gesture implementation**: Building a side drawer from scratch involves extremely complex gesture handling, animations, and accessibility management. Using the official package guarantees 60fps native animations and standard interactions.
- **No new route for "Filtrar Cámaras"**: Implementing a route-based modal via Expo Router's `presentation: 'modal'` adds complexity. Directly controlling the visibility state of `<FiltersModal>` from a custom drawer content component is much simpler and maintains existing patterns.
- **Custom Header Component**: We will implement a custom header to display dynamic data like the webcam count seamlessly alongside a hamburger menu.

## Risks / Trade-offs

- [Risk] Reanimated and Gesture Handler setup issues -> Mitigation: These libraries are already in `package.json`. We will verify their setup.
- [Risk] State sharing for webcam count -> Mitigation: Use Zustand as global state management.
