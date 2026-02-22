## Context

Currently, `webcams-list-screen.tsx` directly imports and manipulates data from `data/webcams.json`. This synchronous data loading does not reflect real-world scenarios where fetching remote data implies latency, loading states, and error handling. We need an architectural setup to ease the transition to a remote backend API in the future without having to rewrite UI components.

## Goals / Non-Goals

**Goals:**
- Implement `ICamsRepository` interface exposing methods: `getAllCams`, `getCamById`, `getAllRoads`, `getAllProvinces`, and `getFilteredCams`.
- Implement `JsonCamsRepository`, effectively wrapping the static JSON reading inside `Promise`s to simulate asynchrony.
- Integrate `@tanstack/react-query` to consume the repository inside `webcams-list-screen.tsx`, handling asynchronous states (loading, success).

**Non-Goals:**
- We are *not* implementing a full network API repository (`ApiCamsRepository`) right now. We only need the JSON implementation.
- Refactoring the entire app. Only the webcam list/filtering logic will be ported to React Query at this time.

## Decisions

**1. Interfaces for Abstraction**
Using `ICamsRepository` allows us to define the contract once. A custom hook (e.g., `useCams`) can instantiate the `JsonCamsRepository` for now. Later, we can inject an API repository without the UI noticing.

**2. Asynchronous Simulation**
Since `JsonCamsRepository` reads data immediately from memory in a JSON block, we will wrap the returned data in `Promise.resolve()` directly. We won't simulate arbitrary timeouts (`setTimeout`) to avoid needless UI delays, but the signature will be strictly `Promise<>`.

**3. State Management with React Query**
React Query is chosen over standard `useEffect` + `useState` because it automatically handles deduping, caching, `isLoading`, an `isError` natively. It simplifies the component code drastically.

## Risks / Trade-offs

- **Risk**: Adding React Query introduces a new dependency and slightly increases bundle size.
  **Mitigation**: The app is built with Expo and React Query is a standard, lightweight async state manager in the React ecosystem. The benefits to DX and architecture significantly outweigh the cost.
- **Risk**: React Query requires a `QueryClientProvider` at the root of the app.
  **Mitigation**: We will need to wrap the main App entry or `_layout` with the React Query provider.
