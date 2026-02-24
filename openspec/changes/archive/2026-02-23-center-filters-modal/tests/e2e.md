# center-filters-modal E2E Tests Plan

## E2E Tests Checklist

- [ ] `e2e/home.test.ts`: Update tests that interact with the filters modal. Verify that opening the filters modal still works correctly and that the "Filtros" header is visible.
- [ ] `e2e/home.test.ts`: Verify that closing the filters modal (using the close button or tapping outside) works as expected.
- [ ] `e2e/home.test.ts`: Update tests that interact with the `SelectBox` dropdowns. Verify that tapping a `SelectBox` correctly opens the internal search modal.
- [ ] `e2e/home.test.ts`: Verify that selecting an item from the `SelectBox` internal modal correctly updates the filter state and closes the internal modal.
- [ ] **Manual Visual Regression**: Since E2E tests (Playwright) primarily check DOM presence and interactions, a manual visual check is required on both Web (Desktop size) and Android (Emulator/Device) to ensure the modals are centered and the Android keyboard does not obscure the `SelectBox` search input.
