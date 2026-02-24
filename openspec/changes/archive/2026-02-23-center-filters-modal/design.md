# center-filters-modal Design

## Context
The application uses two modal components for filtering data: `FiltersModal` and an inner `SelectBox` component. Currently, both use a "Bottom Sheet" design pattern (appearing from the bottom with a slide animation). While suitable for mobile devices, this pattern provides a poor user experience on web platforms where screens are much wider. The user wants to change this behavior to use a traditional centered modal dialog box for both components, prioritizing a correct web appearance while ensuring it remains usable on mobile, particularly Android.

## Goals / Non-Goals
**Goals:**
- Change the `FiltersModal` to appear horizontally and vertically centered with a maximum width limit.
- Change the `SelectBox` modal to also appear centered with a maximum width limit.
- Change the enter/exit animation of both modals from `slide` to `fade`.
- Ensure the modal remains fully usable on Android devices when the virtual keyboard is open (especially the search input within the `SelectBox`).

**Non-Goals:**
- Implementing conditional platform logic (e.g., keeping bottom sheet on mobile and centered on web). The goal is to use the centered pattern universally.
- completely rewriting the internal structure of the `SelectBox` or `FiltersModal`. Handlers, props, and state should remain unchanged.

## Decisions

1. **Centering the Modals:** Instead of using React Native's `justify-end` to push the modal content to the bottom of the screen, we will use `justify-center` and `items-center` on the overlay container to center the modal content.
2. **Animation:** The `animationType` prop of the React Native `Modal` component will be changed from `"slide"` to `"fade"` to match standard centered dialog behavior.
3. **Dimensions & Borders:** 
   - `FiltersModal`: The bottom sheet's `rounded-t-[32px]` will be changed to `rounded-3xl` to round all corners. We will add `max-w-md` and `w-[90%]` to restrict the width on large screens while keeping padding on mobile.
   - `SelectBox`: Currently uses `h-[80%]`. We will change this to `max-h-[80%]` so it shrinks if there are few items, but doesn't exceed 80% of the screen. We will apply similar width constraints (`max-w-md w-[90%]`) and rounding (`rounded-3xl`) as the `FiltersModal`.
4. **Android Keyboard Mitigation (The "Trick"):** To prevent the Android keyboard from covering the `SelectBox` modal content (specifically the text input and top results), we will adjust the alignment. Instead of perfect centering (`justify-center`), we will push the modal slightly towards the top of the screen when the keyboard is inactive or active. We can achieve this by using `justify-start` combined with a top margin/padding (e.g., `pt-20` on the overlay container) or by applying a negative bottom margin if using `justify-center`. The `justify-start pt-20` approach is simpler and more robust because the modal simply hangs from the top downwards, leaving the bottom half of the screen free for the keyboard.

## Risks / Trade-offs

- **Risk:** The virtual keyboard on smaller Android devices might still obscure the bottom items of the `FlatList` inside the `SelectBox` modal.
  - **Mitigation:** The `justify-start pt-20` approach keeps the most critical parts (the search bar and the first few results) visible at the top. The `FlatList` itself is scrollable, allowing users to reach obscured items. Testing on a physical Android device or emulator with a keyboard is critical.
- **Trade-off:** We are trading the ergonomic "thumb-friendly" bottom sheet on mobile for a universal design that prioritizes a "desktop-first" or standard web appearance. The user has explicitly accepted this trade-off.
