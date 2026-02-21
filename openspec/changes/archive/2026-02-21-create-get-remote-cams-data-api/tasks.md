## 1. Setup

- [x] 1.1 Create `app/get-remote-cams-data+api.ts` file in the Expo Router structure to serve as the new API endpoint for `/get-remote-cams-data`.

## 2. API Route Implementation

- [x] 2.1 Export an asynchronous `GET` function from `app/get-remote-cams-data+api.ts` following Expo's API route conventions.
- [x] 2.2 Migrate the XML fetching logic (via `axios.get`) and `fast-xml-parser` logic from `scripts/fetch-webcams.ts` into the new `GET` handler.
- [x] 2.3 Refactor the internal mapping logic to translate the parsed XML data into the predefined `WebcamData` schema array.
- [x] 2.4 Update the success branch to return the constructed array utilizing Expo's `Response.json(webcams)` rather than writing locally to a JSON file.

## 3. Error Handling

- [x] 3.1 Provide a `catch` block within the `GET` function to intercept network disruptions or bad XML parsing.
- [x] 3.2 Return an appropriate 500 error HTTP response structure (`Response.json({ error: 'Failed to fetch webcam data' }, { status: 500 })`) when errors happen.

## 4. Unit Testing

- [x] 4.1 Create a test file for the API route (e.g., `app/__tests__/get-remote-cams-data.test.ts`).
- [x] 4.2 Mock the DGT XML response and verify the parsing logic for successful data conversion.
- [x] 4.3 Implement tests for error cases (e.g., malformed XML, network failure).
- [x] 4.4 Run and verify all tests pass.

