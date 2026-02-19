<artifact>
<id>proposal</id>
<change>filter-webcams-province</change>
<type>feature</type>
<title>Filter Webcams by Province</title>

<!-- Explain the motivation for this change. What problem does this solve? Why now? -->
<motivation>
The application currently loads over 15,000 webcams from a static JSON file (`data/webcams.json`). Displaying all of them at once in a single list is inefficient and provides a poor user experience, making it difficult for users to find relevant cameras. The user specifically requested the ability to filter webcams by province first, as a step towards more complex filtering.
</motivation>

<!-- Describe the high-level approach. How will you solve the problem? -->
<approach>
1.  **Extract Unique Provinces**: Dynamically extract the list of unique provinces from the `WebcamData` (specifically the `location` field, which currently maps to province).
2.  **UI for Province Selection**: Implement a horizontal scrollable list of "Chips" or a Dropdown in the `WebcamsListScreen` to allow users to select a province.
3.  **Filtering Logic**: State management (React `useState`) to keep track of the selected province and filter the `MOCK_DATA` before passing it to the `FlatList`.
4.  **Initial State**: Either show "All" (potentially paginated/limited) or prompt the user to select a province to start (to avoid rendering 15k items initially). For this iteration, we'll default to "All" but emphasize the filter.
</approach>

<!-- List input artifacts this change depends on (e.g., specific specs or designs) -->
<inputs>
- `data/webcams.json`: Source of data.
- `types/webcam.ts`: Type definition.
- `components/WebcamsListScreen.tsx`: Target component for UI changes.
</inputs>

<!-- List what this change will produce (code, docs, tests, etc.) -->
<outputs>
- Updated `WebcamsListScreen.tsx` with filtering logic and UI.
- (Optional) Helper utility to extract unique provinces if logic is complex.
</outputs>

<!-- Define success criteria. How will we know this is done? -->
<success_criteria>
- A comprehensive list of provinces extracted from the data is visible to the user.
- Tapping a province updates the list to show only cameras from that province.
- Tapping "All" (or deselecting) resets the list.
- The UI remains responsive.
</success_criteria>

<unlocks>
- Improved performance by rendering fewer items.
- Better user experience for finding relevant cameras.
- Foundation for further filtering (e.g., by road name).
</unlocks>

</artifact>
