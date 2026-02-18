<artifact id="spec" capability="styling-system">

## ADDED Requirements

### Requirement: Use Tailwind Utility Classes
All UI components within the application MUST use Tailwind CSS utility classes via the `className` prop for styling instead of inline styles passed via the `style` prop.

#### Scenario: Component Rendering
- **WHEN** a component is rendered with `className="bg-red-500"`
- **THEN** the component should have a red background color.

### Requirement: Consistent Spacing
The application MUST use Tailwind's spacing scale (e.g., `p-4`, `m-2`) to ensure consistent padding and margins across all screens.

#### Scenario: Screen Layout
- **WHEN** viewing any screen
- **THEN** elements should align to the 4px grid system defined by Tailwind.

### Requirement: Dynamic Styling via Class Names
Dynamic styles that can be mapped to Tailwind classes (e.g., conditional colors) MUST use conditional class logic (e.g., `clsx` or template literals) instead of inline styles.

#### Scenario: Conditional Rendering
- **WHEN** a button is in a disabled state
- **THEN** it should have the `opacity-50` class applied.

## REMOVED Requirements

### Requirement: Inline Styling
**Reason**: Replaced by Tailwind CSS for consistency and maintainability.
**Migration**: Convert all `style={{ ... }}` props to equivalent `className="..."` strings.

</artifact>
