## 1. Setup Data Layer Abstraction

- [x] 1.1 Create `repositories/ICamsRepository.ts` containing the `ICamsRepository` and `CamFilters` interfaces.
- [x] 1.2 Create `repositories/JsonCamsRepository.ts` implementing `ICamsRepository`.

## 2. React Query Integration

- [x] 2.1 Update package.json to install `@tanstack/react-query` and `@tanstack/react-query-dev` if necessary. (We will use the simple `@tanstack/react-query`)
- [x] 2.2 Wrap the main application entry point (e.g. `app/_layout.tsx` or `App.tsx`) with `QueryClientProvider` and initialize `QueryClient`.

## 3. Frontend Refactor

- [x] 3.1 Refactor `components/webcams-list-screen.tsx`: create custom hooks wrapper utilizing `useQuery` mapped directly to `JsonCamsRepository` instance to fetch `roads`, `provinces`, and `cams`.
- [x] 3.2 Update `webcams-list-screen.tsx` layout functionality to observe the new loading states from React Query.
- [x] 3.3 Ensure the list items and UI works strictly out of the fetched values rather than synchronous static data.
