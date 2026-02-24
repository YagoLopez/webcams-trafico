## Why

PR #6 feedback highlighted that the `FiltersModal` unit test only verifies text presence, not the actual application of the centered layout classes (e.g., `justify-center`, `items-center`, `p-4`, `max-w-md`). We need to enhance the unit test to assert these layout constraints are applied robustly.

## What Changes

- Enhance `components/__tests__/filters-modal.test.tsx` to assert the presence of specific layout classes on the modal's container views.
- *Note:* Verification related to E2E tests is explicitly skipped for this change as per user request.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. (This change only affects test implementation details, not spec-level app requirements or behavior).

## Impact

- `components/__tests__/filters-modal.test.tsx`
- No production code, APIs, or dependencies are affected.
