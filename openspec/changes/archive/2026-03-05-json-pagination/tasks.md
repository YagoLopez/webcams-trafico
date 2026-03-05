## 1. Pagination Utility

- [x] 1.1 Create `ArrayPaginator.ts` with static `paginate` method.
- [x] 1.2 Implement unit tests for `ArrayPaginator`.

## 2. Hooks and State

- [x] 2.1 Update `hooks/use-cams.ts` to include `useInfiniteFilteredCams`.
- [x] 2.2 Ensure the hook correctly slices the full filtered list using the paginator.

## 3. UI Implementation

- [x] 3.1 Refactor `CamListScreen.tsx` to use `useInfiniteFilteredCams`.
- [x] 3.2 Implement `FlatList` with `onEndReached` to trigger next page loading.
- [x] 3.3 Add loading indicators for initial load and pagination fetch.
