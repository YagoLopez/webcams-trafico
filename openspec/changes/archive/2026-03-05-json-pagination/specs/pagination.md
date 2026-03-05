## ADDED Requirements

### Requirement: Generic Pagination Utility
The system must provide a generic utility to slice arrays into pages with descriptive metadata.

#### Scenario: Requesting the first page
- **WHEN** an array and page number 1 are provided to the utility
- **THEN** it returns the first chunk of data and indicates if there are more pages.

### Requirement: Infinite Scrolling List
The camera list must load data incrementally as the user scrolls to the bottom of the visible area.

#### Scenario: Scrolling to the end of the list
- **WHEN** the user reaches the bottom of the current camera list
- **THEN** the system fetches the next page and appends it to the rendered items.
