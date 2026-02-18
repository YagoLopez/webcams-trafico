<artifact id="tasks" change="migrate-inline-styles-to-tailwind">
<!-- Use this as the structure for your output file. Fill in the sections. -->   
## 1. Setup & Exploration

- [x] 1.1 Verify Tailwind CSS and NativeWind configuration is active and working correctly.
- [x] 1.2 Scan codebase for all instances of `style={{` to identify scope of work.

## 2. Component Migration

- [x] 2.1 Migrate global layout components (Screens, Containers) to use `className` for spacing and flex properties.
- [x] 2.2 Migrate common UI elements (Buttons, Inputs, Text) to use `className` for typography, colors, and borders.
- [x] 2.3 Refactor conditional styles to use template literals or simple conditional logic within `className`.
- [x] 2.4 Handle any complex or unsupported styles by verifying NativeWind support or keeping minimal inline styles.

## 3. Verification

- [x] 3.1 Verify consistency of spacing and colors against Tailwind theme.
- [x] 3.2 Ensure valid TypeScript types for `className` props (via `/// <reference types="nativewind/types" />` if needed).
- [x] 3.3 Verify no visual regressions compared to previous state.

</artifact>
