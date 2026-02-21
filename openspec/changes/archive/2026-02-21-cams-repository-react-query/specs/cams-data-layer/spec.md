## ADDED Requirements

### Requirement: Implement ICamsRepository Interface
The application SHALL define an `ICamsRepository` interface that decouples the source of truth for the cameras.

#### Scenario: Interface availability
- **WHEN** a component or service imports `ICamsRepository`
- **THEN** it must have access to methods `getAllCams()`, `getCamById(id)`, `getAllRoads()`, `getAllProvinces()`, and `getFilteredCams(filters)` returning Promises.

### Requirement: Implement JsonCamsRepository
The application SHALL implement `ICamsRepository` as `JsonCamsRepository` to read data from local JSON.

#### Scenario: Reading from local JSON
- **WHEN** `getAllCams` is called on an instance of `JsonCamsRepository`
- **THEN** it returns a Promise resolving to the list of cameras parsed from `data/webcams.json`.

### Requirement: Transition UI to use React Query
The application SHALL use `@tanstack/react-query` replacing hardcoded data arrays to manage asynchronous data fetching.

#### Scenario: Cams list screen
- **WHEN** the `WebcamsListScreen` mounts
- **THEN** it fetches unique roads and provinces, and the filtered cameras via React Query hooks utilizing `ICamsRepository` implementation.
