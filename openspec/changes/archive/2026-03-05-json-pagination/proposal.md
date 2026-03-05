# Proposal: Paginating Web Camera List

## Problem
The current application loads the entire list of ~2000 webcams from a JSON file into memory and renders them all at once. This causes significant performance issues, including UI lag and high memory consumption on mobile devices.

## Solution
Implement a pagination mechanism for the webcam list. We will use `useInfiniteQuery` from `@tanstack/react-query` to load data in chunks and implement an agnostic `ArrayPaginator` to handle the logic of slicing the local JSON data.

## Scope
- Create `ArrayPaginator` utility to slice arrays into pages.
- Update `hooks/use-cams.ts` to include `useInfiniteFilteredCams`.
- Refactor `CamListScreen` to use the new infinite hook and a `FlatList` with `onEndReached`.
- Update tests to verify paginated data loading.
