<artifact id="design" change="migrate-inline-styles-to-tailwind">

## Context
The application currently uses inline styles (`style={{ ... }}`) for UI components. This is standard in React Native but leads to verbosity and inconsistency. We have `nativewind` and `tailwindcss` installed (as seen in `package.json`). The goal is to fully leverage Tailwind for styling to improve developer experience and consistency.

## Goals / Non-Goals

**Goals:**
- Replace static inline styles with Tailwind utility classes in `className`.
- Use `clsx` (or simple template literals) for conditional styling logic.
- Ensure zero visual regression—the app should look exactly the same after migration.

**Non-Goals:**
- Redesigning the application's UI.
- Removing `style` props that are used for truly dynamic values (e.g., animated values or user-driven coordinates that can't be classes) unless they can be mapped to Tailwind arbitrary values.

## Decisions

### 1. Style Migration Strategy
We will iterate through components and replace the `style` prop with `className`.
- **Static Styles**: Directly map to Tailwind classes (e.g., `style={{ flexDirection: 'row' }}` -> `className="flex-row"`).
- **Conditional Styles**: Use template literals or `clsx` if available for conditional classes (e.g., `style={{ color: isActive ? 'red' : 'blue' }}` -> `className={${isActive ? 'text-red-500' : 'text-blue-500'}}`).
- **Hybrid Approach**: If a style property is not supported by NativeWind or is highly dynamic, we will retain the `style` prop for that specific property while moving others to `className`.

### 2. Configuration
We will use the standard Tailwind configuration. If specific values (colors, spacing) from the current inline styles do not exist in the default theme, we will either:
- Use Tailwind arbitrary values (e.g., `w-[123px]`) for one-offs.
- Extend `tailwind.config.js` if the value is reused frequently.

## Risks / Trade-offs

### Risk: Missing Tailwind Utilities for React Native
Some React Native specific style properties (like `elevation` or specific shadow props on Android) might not have direct Tailwind equivalents or might require specific NativeWind plugins.
*Mitigation*: We will verify these styles and leave them as inline styles or use NativeWind's specific patterns if necessary.

### Risk: Visual Regression
Mistranslating a style value (e.g., `flex: 1` vs `flex-grow`) could break layouts.
*Mitigation*: We will be careful with mappings (e.g., `flex: 1` -> `flex-1`).

</artifact>
