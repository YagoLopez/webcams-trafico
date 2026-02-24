## Context

PR #6 implemented a centered layout using NativeWind classes for `FiltersModal`. The current unit tests check for text existence but do not verify that the critical flex and centering classes (`justify-center`, `items-center`, `p-4`, `max-w-md`) are applied to the modal's container views. 

## Goals / Non-Goals

**Goals:**
- Update `components/__tests__/filters-modal.test.tsx` to assert that the critical layout-specific NativeWind classes are correctly applied to the rendering components.

**Non-Goals:**
- Altering the implementation of `FiltersModal` or `SelectBox`.
- Modifying or verifying E2E tests (skipped as per explicit requirement).

## Decisions

- **Decision 1: Use `className` property assertions in React Native Testing Library.**
  - *Rationale:* Since NativeWind applies styles via the `className` prop, we can query the rendered component tree and inspect the `className` string to ensure `justify-center`, `items-center`, `p-4`, and `max-w-md` are present. This provides robust verification without needing snapshot testing, which can be overly brittle.

## Risks / Trade-offs

- **Risk:** Tests may become brittle if styling refactoring removes or renames these specific Tailwind classes.
  - *Mitigation:* Assert only the essential classes that define the "centered modal" pattern, rather than every visual utility class.
