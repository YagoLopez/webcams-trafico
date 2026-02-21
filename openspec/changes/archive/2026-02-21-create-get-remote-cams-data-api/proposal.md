## Why

Currently, webcams data is fetched using a standalone node script (`scripts/fetch-webcams.ts`) which outputs to a static JSON file. Moving this logic to an Expo API route (`/get-remote-cams-data`) allows the application to fetch real-time webcam data dynamically. This eliminates data staleness by fetching directly from the source on-demand and shifts data retrieval logic directly into the app's server infrastructure.

## What Changes

- Create a new GET API route at `app/get-remote-cams-data+api.ts` (per Expo Router API conventions) or equivalent location depending on routing config.
- Reuse the existing fetching, XML parsing (`fast-xml-parser`), and data transformation logic from `scripts/fetch-webcams.ts` inside the newly created API route.
- The route will respond with the parsed array of `WebcamData` objects encoded as JSON.
- **Unit Testing**: Implement unit tests for the API route's logic, specifically focusing on XML parsing and error handling scenarios.
- **Note**: The original script can be retained for utility testing or deprecated.

## Capabilities

### New Capabilities
- `remote-cams-api`: An endpoint to dynamically fetch, parse, and return DGT webcam data in JSON format.

### Modified Capabilities
- (None)

## Impact

- **Affected Code**: Addition of `app/get-remote-cams-data+api.ts`.
- **Dependencies**: The API route will rely on `axios` and `fast-xml-parser` which are already present in `package.json`.
