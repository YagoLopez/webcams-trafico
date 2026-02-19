<artifact>
<id>proposal</id>
<change>province-filter-dropdown</change>
<type>feature</type>
<title>Province Filter Dropdown with Search</title>

<motivation>
The current application allows filtering webcams by road using a searchable dropdown. The user wants to add a similar filtering capability for provinces, placed below the road filter. This will allow users to narrow down the webcam list by province in addition to road. The user also requested explicit labels for "Filtrar carreteras" and "Filtrar provincias" above each selector.
</motivation>

<approach>
1.  **Extract Unique Provinces**: Similar to roads, extract unique `location` values from `MOCK_DATA`.
2.  **Add State**: Add `selectedProvince`, `provinceSearchQuery`, and `isProvinceSelectorVisible` to `WebcamsListScreen`.
3.  **UI Updates**:
    -   Add a "Filtrar carreteras" label above the existing road selector.
    -   Add a new "Filtrar provincias" label below the road selector.
    -   Add a new TouchableOpacity (acting as the dropdown trigger) for Province selection.
    -   Add a new Modal for Province selection, mirroring the Road selection modal (including search functionality).
4.  **Refactoring (Optional but Recommended)**: Create a reusable `FilterSelector` component (Dropdown Trigger + Modal) to avoid code duplication since both filters share identical logic and layout.
5.  **Filtering Logic**: Update `filteredWebcams` to filter by BOTH `selectedRoad` AND `selectedProvince`. If both are selected, webcams must match both criteria.
</approach>

<inputs>
- `components/WebcamsListScreen.tsx`
- `data/webcams.json`
</inputs>

<outputs>
- Updated `WebcamsListScreen.tsx` (now with two filters and labels).
- (Ideally) New `FilterSelector.tsx` component.
</outputs>

<success_criteria>
- A new Province dropdown is visible below the Road dropdown.
- Both dropdowns have indicative labels ("Filtrar carreteras", "Filtrar provincias").
- The Province dropdown opens a searchable modal.
- Selecting a province filters the webcam list correctly.
- Both filters work together (AND logic).
</success_criteria>

</artifact>
