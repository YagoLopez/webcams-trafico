# Tasks: Install TailwindCSS

## 1. Dependencies and Configuration Files

- [x] 1.1 Install dependencies: `nativewind@4.0.1`, `tailwindcss@3.3.2`, `react-native-reanimated`, `react-native-css-interop`. (Use `npx expo install` where possible for compatibility).
- [x] 1.2 Create `tailwind.config.js` with `nativewind/preset` and content paths (`app`, `components`).
- [x] 1.3 Create `global.css` with Tailwind directives (`@tailwind base`, etc.).
- [x] 1.4 Create `babel.config.js` configured for NativeWind (required since it doesn't exist).
- [x] 1.5 Create `metro.config.js` with `withNativeWind` wrapper (required since it doesn't exist).

## 2. Application Integration

- [x] 2.1 Update `app/_layout.tsx` to import `../global.css`.
- [x] 2.2 Create `expo-env.d.ts` if needed (or verify existing typescript definitions for NativeWind).
- [x] 2.3 Create verification component `components/TailwindExample.tsx` using Tailwind classes.
- [x] 2.4 Add `TailwindExample` to `app/(tabs)/index.tsx` (or a temporary route) to verify it renders.

## 3. Verification

- [x] 3.1 Run `npx expo start -c` (clear cache) to ensure config is picked up.
- [ ] 3.2 Verify `TailwindExample` renders correctly on Android.
- [x] 3.3 Verify no build errors occur during startup.
