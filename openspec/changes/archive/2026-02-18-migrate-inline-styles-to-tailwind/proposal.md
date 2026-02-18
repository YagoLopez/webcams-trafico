<artifact id="proposal" change="migrate-inline-styles-to-tailwind" schema="spec-driven">

# Proposal: Migrate Inline Styles to Tailwind

## Why
The application currently relies on inline styles passed via the `style` prop. This approach leads to code duplication, inconsistency, and makes global style updates difficult. By migrating to Tailwind CSS and using the `className` prop, we can unify the styling system, improve maintainability, and leverage the utility-first approach for faster development and consistent design.

## Capabilities
- `styling-system`: The core styling methodology of the application is strict adherence to Tailwind CSS utility classes instead of inline styles.

## Impact
- **Affected Components**: All React Native components currently using the `style` prop for visual styling.
- **Dependencies**: Tailwind CSS configuration (ensure all custom values needed are present).
- **Codebase**: Widespread changes across UI components to replace `style={{ ... }}` with `className="..."`.

## Success Criteria
- All instances of inline `style` props (excluding dynamic values that cannot be mapped to classes) are replaced with equivalent Tailwind `className` strings.
- The visual appearance of the application is identical to the version before the migration.
- The `nativewind` or relevant Tailwind integration is correctly handling the new class names.

</artifact>
