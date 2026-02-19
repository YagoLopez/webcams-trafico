<artifact>
<id>design</id>
<change>fetch-traffic-cams</change>
<type>design</type>
<title>Traffic Webcam Fetch Script Design</title>

<architecture>
The script will be a standalone TypeScript file located in `scripts/fetch-webcams.ts`.
It will be executed via `npx tsx` or `ts-node`.
It will read from the DGT XML URL and write to `data/webcams.json`.

**Flow:**
1.  **Fetch**: HTTP GET request to the DGT XML endpoint.
2.  **Parse**: Convert XML string to JS object using `fast-xml-parser`.
3.  **Transform**: Map the complex DATEX II structure to a simplified `WebcamData` array.
4.  **Write**: Serialize the array to JSON and write to `data/webcams.json`.
</architecture>

<data_structure>
**Input XML (Simplified Schema relevant for mapping):**
- `d2:payload` (Root)
    - `ns2:device` (Array)
        - `id` (Attribute)
        - `fse:deviceUrl` (Image URL)
        - `ns2:pointLocation`
            - `loc:supplementaryPositionalDescription`
                - `loc:roadInformation`
                    - `loc:roadName` (Road)
                    - `loc:roadDestination` (Destination/Direction)
            - `loc:tpegPointLocation`
                - `loc:point`
                    - `loc:pointCoordinates` (Lat/Lon)
                    - `loc:_tpegNonJunctionPointExtension`
                        - `loc:extendedTpegNonJunctionPoint`
                            - `lse:kilometerPoint` (KM)
                            - `lse:province` (Location context)

**Output JSON (`WebcamData`):**
```typescript
interface WebcamData {
  id: string;
  imageUrl: string;
  road: string;
  kilometer: string; // e.g. "PK 12.5 - Salida Aravaca" or based on KM + Destination
  location: string; // e.g. "Madrid, Moncloa" or Province + Destination
  status: 'active' | 'inactive';
}
```
</data_structure>

<implementation_details>
**Libraries:**
- `axios`: For HTTP requests.
- `fast-xml-parser`: For XML parsing.
- `fs/promises`: For file system operations.

**Transformation Logic:**
- Filter out devices that are not cameras if mixed types exist (though XML suggests all are cameras).
- `status` defaults to 'active'.
- `location` constructed from `lse:province` + `loc:roadDestination`.
- `kilometer` constructed from `lse:kilometerPoint`.
</implementation_details>

<ui_impact>
No direct UI changes, but the app will consume this new data file instead of mocked data.
</ui_impact>

</artifact>
