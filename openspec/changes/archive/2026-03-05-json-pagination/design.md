## Context
The application currently renders a large list of cameras without pagination, leading to performance issues on low-end devices.

## Goals / Non-Goals
**Goals:**
- Improve list performance by rendering camera cards in pages.
- Provide a seamless "infinite scroll" experience.
- Maintain a reusable, framework-agnostic pagination utility.

**Non-Goals:**
- Implementing server-side pagination (currently restricted to local JSON data).
- Changing the cam filtering logic itself.

## Decisions
- **Utility Pattern**: Create an `ArrayPaginator` class that slices arrays into pages with metadata (`totalItems`, `totalPages`, etc.).
- **Infinite Hook**: Use `@tanstack/react-query`'s `useInfiniteQuery` to manage the fetching of sequential pages.
- **FlatList Integration**: Leverage `onEndReached` and `ListFooterComponent` for a standard mobile infinite scroll pattern.

## Risks / Trade-offs
- **In-memory Filtering**: Since we still load the full JSON to filter it before paginating, initial filtering performance might still be a bottleneck for extremely large datasets, though significantly better than rendering everything.
