# center-filters-modal Proposal

## The Problem
Currently, the `FiltersModal` and the `SelectBox` internal modal use a "Bottom Sheet" design pattern (appearing from the bottom with a slide animation). While this is popular in mobile interfaces, it presents two main issues:
1. **Web Platform Inconsistency:** When the app is built for the web, a bottom sheet spanning the full width of a desktop monitor looks unnatural and provides a poor user experience compared to a traditional centered dialog box.
2. **UX Improvement Opportunity:** A centered modal (with a `max-width` constraint) provides a more focused and standard interface for filtering options, particularly on larger screens (tablets/web).

## The Solution
We will implement a centered modal design for both the filtering options (`FiltersModal`) and its internal selectors (`SelectBox`). 

To achieve this while maintaining a good experience on mobile (specifically Android, where the virtual keyboard could obscure the center of the screen when searching in the `SelectBox`), we will:
1. Change the animation from `slide` to `fade`.
2. Center the modal content on the screen using tailwind classes (`justify-center items-center` instead of `justify-end`).
3. Apply a maximum width (`max-w-md w-[90%]`) so it doesn't stretch infinitely on wide screens.
4. Add a slight upward offset (e.g., using margin-top or padding-top) to the `SelectBox` modal to ensure the search input and results remain visible even when the mobile keyboard is open.

## Impact
### Modified Capabilities
- `FiltersModal`: Will no longer dock to the bottom. It will appear centered on the screen with rounded corners on all sides (`rounded-3xl` instead of `rounded-t-3xl`).
- `SelectBox` (Modal state): Will also appear centered instead of as a full-height bottom sheet.

### Affected Code
- `components/filters-modal.tsx`
- `components/ui/select-box.tsx`
