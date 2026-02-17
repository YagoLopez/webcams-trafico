# Spec: Styling

## ADDED Requirements

### Requirement: NativeWind v4 Integration
The system SHALL integrate NativeWind v4 to enable TailwindCSS styling in the React Native application.

#### Scenario: Dependencies Installation
- **WHEN** the project dependencies are installed
- **THEN** `nativewind`, `tailwindcss`, `react-native-reanimated`, and `react-native-css-interop` should be present in `package.json` with compatible versions.

#### Scenario: Configuration Setup
- **WHEN** the project is configured
- **THEN** `tailwind.config.js` should exist with `nativewind/preset` and correct content paths.
- **THEN** `global.css` should exist with Tailwind directives.
- **THEN** `babel.config.js` should be configured for NativeWind.
- **THEN** `metro.config.js` should be configured with `withNativeWind`.
- **THEN** `app/_layout.tsx` should import `global.css`.

### Requirement: Tailwind Class Application
The system SHALL correctly apply TailwindCSS utility classes to React Native components.

#### Scenario: Component Rendering
- **WHEN** a component uses `className="bg-red-500"`
- **THEN** the component background should be red on both Android and iOS.

#### Scenario: Verification Component
- **WHEN** the `TailwindExample` component is rendered
- **THEN** it should display elements styled with Tailwind utilities (text color, background color, padding).
