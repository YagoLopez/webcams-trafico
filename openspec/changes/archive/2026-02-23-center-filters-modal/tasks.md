# center-filters-modal Tasks

## 1. Modify FiltersModal Component
- [ ] 1.1 In `components/filters-modal.tsx`, change `Modal` `animationType` prop from `"slide"` to `"fade"`.
- [ ] 1.2 In `components/filters-modal.tsx`, update the dark overlay `View` container classes. Change `justify-end` to `justify-center items-center`. Ensure padding is present (e.g., `p-4`).
- [ ] 1.3 In `components/filters-modal.tsx`, update the main modal content `View` container classes. Change `rounded-t-[32px]` to `rounded-3xl` (or `rounded-2xl`).
- [ ] 1.4 In `components/filters-modal.tsx`, add width constraints to the main modal content `View` container (e.g., add `max-w-md w-[90%]`).

## 2. Modify SelectBox Component
- [ ] 2.1 In `components/ui/select-box.tsx`, change the internal `Modal` `animationType` prop from `"slide"` to `"fade"`.
- [ ] 2.2 In `components/ui/select-box.tsx`, update the dark overlay `View` container classes. Change `justify-end` to `justify-start pt-20 items-center` (to center horizontally but display near the top vertically to mitigate Android keyboard overlap).
- [ ] 2.3 In `components/ui/select-box.tsx`, update the main modal content `View` container classes. Change `rounded-t-3xl` to `rounded-3xl`.
- [ ] 2.4 In `components/ui/select-box.tsx`, adjust the dimensions of the main modal content `View` container. Change `h-[80%] w-full` to `max-h-[80%] max-w-md w-[90%]`.

## 3. Testing and Verification
- [ ] 3.1 Verify changes in web platform (desktop layout). Ensure both modals look like a standard centered dialog.
- [ ] 3.2 Verify changes in Android (or iOS) emulator/device. Ensure modals are usable and the `SelectBox` dropdown remains accessible when the keyboard is open.
