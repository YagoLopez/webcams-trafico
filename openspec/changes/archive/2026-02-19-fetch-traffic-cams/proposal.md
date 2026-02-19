<artifact>
<id>proposal</id>
<change>fetch-traffic-cams</change>
<type>feature</type>
<title>Fetch and Transform DGT Wrapper Script</title>

<!-- Explain the motivation for this change. What problem does this solve? Why now? -->
<motivation>
The application needs to display real-time traffic webcam data. The source data from DGT (Dirección General de Tráfico) is provided in XML format at `https://nap.dgt.es/datex2/v3/dgt/DevicePublication/camaras_datex2_v36.xml`. To integrate this efficiently into the React Native app, we need a script to fetch this XML data and transform it into a JSON format that matches our application's data structure (`WebcamData`).
</motivation>

<!-- Describe the high-level approach. How will you solve the problem? -->
<approach>
1.  **Script Creation**: Create a standalone TypeScript script (e.g., `scripts/fetch-webcams.ts`) using `ts-node` or `tsx` to run.
2.  **Fetching**: Use `axios` or similar to fetch the XML content.
3.  **Parsing**: Use `fast-xml-parser` or `xml2js` to parse the XML into a JavaScript object.
4.  **Transformation**: Map the parsed XML structure to our `WebcamData` interface (id, image url, location, etc.).
5.  **Output**: Save the transformed data to `data/webcams.json` for the app to consume.
</approach>

<!-- List input artifacts this change depends on (e.g., specific specs or designs) -->
<inputs>
- DGT XML URL: `https://nap.dgt.es/datex2/v3/dgt/DevicePublication/camaras_datex2_v36.xml`
- Existing `WebcamData` type definition in `types/webcam.ts`.
</inputs>

<!-- List what this change will produce (code, docs, tests, etc.) -->
<outputs>
- `scripts/fetch-webcams.ts`: The script to fetch and transform data.
- `data/webcams.json`: The generated JSON data file.
- Updates to `package.json` to add the script command (optional).
</outputs>

<!-- Define success criteria. How will we know this is done? -->
<success_criteria>
- The script runs successfully without errors.
- The script fetches the XML from the DGT URL.
- The script outputs a valid JSON file (`data/webcams.json`).
- The JSON output matches the `WebcamData` interface structure.
- The React Native app can load and display this JSON data.
</success_criteria>

<unlocks>
- Real-time traffic camera feed.
- Future automation of data updates.
</unlocks>

</artifact>
