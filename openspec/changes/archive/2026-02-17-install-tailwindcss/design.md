# Design: Install TailwindCSS

## Context
The project is an Expo React Native application currently using standard stylesheets. We want to introduce a utility-first styling system to improve development velocity and consistency. We will use [NativeWind](https://www.nativewind.dev/), which allows using Tailwind CSS classes in React Native components.

## Goals / Non-Goals

**Goals:**
- Install and configure `nativewind` (v4), `tailwindcss`, and `react-native-reanimated`.
- Configure `tailwind.config.js` to scan relevant files (`app/**/*.{js,jsx,ts,tsx}`, `components/**/*.{js,jsx,ts,tsx}`).
- Set up `global.css` and import it in the root layout (`app/_layout.tsx`).
- Update `babel.config.js` and `metro.config.js` as required by NativeWind v4.
- Create a simple `TailwindExample` component to verify that classes are applied correctly.

**Non-Goals:**
- Migrating existing components or screens to Tailwind (this will be handled in separate changes).
- Customizing the Tailwind theme extensively (default theme is sufficient for now).

## Decisions

### 1. Library Selection: NativeWind v4
We will use NativeWind v4 because:
- It uses the Metro bundler to process styles at build time, offering better performance than runtime solutions like `twrnc`.
- It supports Tailwind CSS v3 features.
- It has good integration with Expo Router.

### 2. Configuration Strategy
- **File Scanning**: We will configure content paths to include all likely source directories: `app`, `components`, and `hooks` if applicable.
- **Presets**: Use the `nativewind/preset` in `tailwind.config.js` to ensure React Native compatibility.
- **Global CSS**: We will create a `global.css` file to hold Tailwind directives (`@tailwind base`, etc.) and import this at the topmost component (`app/_layout.tsx`).

### 3. Verification
- We will create a dedicated component `components/TailwindExample.tsx` that uses various utility classes (colors, spacing, typography) to visually confirm the setup.

## Risks / Trade-offs

- **Build Configuration**: NativeWind v4 interacts deeply with Metro and Babel. Incorrect configuration can lead to build errors or styles not applying. We must follow the installation guide precisely.
- **Cache Issues**: Changes to `tailwind.config.js` or `global.css` often require clearing the Metro bundler cache (`npx expo start -c`).
- **Dependency Conflicts**: `react-native-reanimated` version must be compatible with the current Expo SDK version. We will use `npx expo install` to ensure compatible versions.
