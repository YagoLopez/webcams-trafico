# Unit Tests Plan

Identify units (functions, components, hooks) altered or created during the implementation tasks.

## Unit Tests Checklist

- [x] Zustand Store (`useAppStore`) initializes with default values and setter actions work correctly.
  - Technique: Direct store interaction tests.
- [x] `<CustomDrawerHeader>` component renders correctly with title and hamburger menu icon.
  - Technique: React Native Testing Library component render test.
  - Mocks: Mock `expo-router`'s navigation hooks and `usePathname`.
- [x] `<CustomDrawerHeader>` displays the correct webcam count based on current state.
  - Technique: Component state integration test.
  - Mocks: Mock the Zustand store providing the `camCount`.
- [x] Drawer Content Component renders its items, including the "Filtrar Cámaras" action.
  - Technique: RTL element query by text.
  - Mocks: `DrawerContentComponentProps` from `@react-navigation/drawer`.
- [x] "Filtrar Cámaras" action updates the global state and closes the drawer.
  - Technique: Mock the Zustand store setter for modal visibility and `navigation.closeDrawer()`, fire a press event on the filter button, and verify both mocks were called.
  - Mocks: Drawer navigation prop (`closeDrawer`), Zustand store setter (`setIsFilterModalVisible`).
