## 1. Setup

- [x] 1.1 Install required drawer dependencies (`@react-navigation/drawer`, `react-native-gesture-handler`, `react-native-reanimated`)
- [x] 1.2 Install Zustand for global state management (`zustand`)
- [x] 1.3 Rename `app/(tabs)` directory to `app/(drawer)`
- [x] 1.4 Update global configuration in `app/_layout.tsx` to reference `(drawer)` instead of `(tabs)`

## 2. Global State Implementation (Zustand)

- [x] 2.1 Create a Zustand store (`store/use-app-store.ts`) for managing `camCount` and `isFilterModalVisible`
- [x] 2.2 Wire the list or data provider to update the `camCount` in the Zustand store

## 3. Drawer Navigation Implementation

- [x] 3.1 Replace `<Tabs>` with `<Drawer>` in `app/(drawer)/_layout.tsx`
- [x] 3.2 Create `<CustomDrawerHeader>` component containing screen title, hamburger icon, and webcam count (from Zustand store)
- [x] 3.3 Configure the drawer layout to use the custom header for its screens

## 4. Screen Integrations

- [x] 4.1 Define the "Explorar" screen as a standard navigable item within the drawer
- [x] 4.2 Implement a custom drawer content component to house the standard links plus the "Filtrar Cámaras" action
- [x] 4.3 Integrate `<FiltersModal>` directly into `app/(drawer)/_layout.tsx`, driven by `isFilterModalVisible` from the Zustand store
- [x] 4.4 Wire the "Filtrar Cámaras" list item in the custom drawer to toggle `isFilterModalVisible` and close the drawer
