<artifact>
<id>specs</id>
<change>fetch-traffic-cams</change>
<type>specs</type>
<title>Traffic Webcam Script & Integration Specs</title>

<requirements>
**REQ-1**: Fetch Data
- The script MUST fetch the XML content from `https://nap.dgt.es/datex2/v3/dgt/DevicePublication/camaras_datex2_v36.xml`.
- The fetch operation SHOULD handle network errors and log appropriately.

**REQ-2**: Parse XML
- The script MUST parse the fetched XML payload into a JavaScript object.
- The parser MUST handle XML namespaces if necessary (or ignore them if simpler).

**REQ-3**: Transform Data
- The script MUST filter for valid webcam entries.
- Each webcam entry MUST be mapped to the following schema:
    - `id`: Extracted from the `id` attribute of `ns2:device`.
    - `imageUrl`: Extracted from `fse:deviceUrl`.
    - `road`: Extracted from `loc:roadName`.
    - `kilometer`: Constructed as "Pk " + `lse:kilometerPoint` + " - " + the available `loc:roadDestination` (or appropriate format logic).
    - `location`: Constructed as `lse:province`.
    - `status`: Default to 'active'.

**REQ-4**: Output File
- The script MUST write the transformed array to `data/webcams.json`.
- The file SHOULD be formatted with indentation for readability.

**REQ-5**: Execution
- The script MUST be executable via `npx tsx scripts/fetch-webcams.ts` (or package.json script).

**REQ-6**: App Integration
- The application MUST import `data/webcams.json` instead of `data/mockWebcams.ts`.
- The `MOCK_DATA` in `data/mockWebcams.ts` should be replaced or the file deprecated in favor of the JSON file. 
- The application logic consuming webcam data MUST be updated to use the imported JSON.
</requirements>

<api_changes>
No API changes.
</api_changes>

<ui_changes>
- The UI will display real-time webcam data (images and location info) sourced from `data/webcams.json`.
</ui_changes>

</artifact>
