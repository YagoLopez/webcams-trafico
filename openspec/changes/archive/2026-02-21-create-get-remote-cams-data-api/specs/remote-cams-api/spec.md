## ADDED Requirements

### Requirement: Expose Remote Webcams API
The system MUST provide a GET API route (located at `app/get-remote-cams-data+api.ts` or equivalently accessible at `/get-remote-cams-data`) that dynamically retrieves and parses the DGT XML feed. The endpoint MUST return the webcams data in an array of `WebcamData` JSON objects.

#### Scenario: Successful API Fetch
- **WHEN** the client sends a valid GET request to the endpoint
- **THEN** the API fetching logic requests XML from the DGT system, parses it using `fast-xml-parser`, and returns a HTTP 200 response with a JSON array of webcams including `id`, `imageUrl`, `road`, `kilometer`, `location`, and `status` properties.

#### Scenario: Source Error Handling
- **WHEN** the API attempts to fetch XML from the DGT feed and encounters a network error or the payload root is invalid
- **THEN** the API catches the error and returns a HTTP 500 error response.

### Requirement: Verified API Logic
The API's data transformation and error handling logic MUST be covered by unit tests to ensure regressions are caught during development.

#### Scenario: Verify Transformation Logic
- **WHEN** the test suite runs and provides a sample DGT XML to the parsing logic
- **THEN** the parsing logic MUST return a correctly mapped `WebcamData` array matching the input.

