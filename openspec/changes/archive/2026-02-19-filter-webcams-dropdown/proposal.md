<artifact>
<id>proposal</id>
<change>filter-webcams-dropdown</change>
<type>feature</type>
<title>Road Filtering via Dropdown</title>

<!-- Explain the motivation for this change. What problem does this solve? Why now? -->
<motivation>
Users need to filter webcams by specific roads (e.g., "A-6"). The previous chip-based UI for provinces is not scalable for the large number of roads available. The user explicitly requested replacing the filtering mechanism with a Dropdown (Select Box) listing all road names. Selecting a road from this dropdown should filter the webcam list accordingly.
</motivation>

<!-- Describe the high-level approach. How will you solve the problem? -->
<approach>
1.  **Extract Unique Roads**: Dynamically extract all unique `road` names from `MOCK_DATA`.
2.  **UI Component**: Replace the existing horizontal `ScrollView` of chips with a Dropdown component.
    - Since standard React Native doesn't have a native "Select" component that works identically across platforms easily, we will build a custom modal-based picker or use a lightweight library approach if available (e.g., a modal list).
    - *Decision*: Build a simple custom Modal-based dropdown to avoid heavy dependencies for now, or use a standard pattern like a trigger button opening a selection modal.
3.  **Filtering Logic**: Update the filtering state to track `selectedRoad` instead of (or in addition to, but request implies replacement) `selectedProvince`.
    - *Clarification*: The request says "change mechanism", implying we should likely remove the province chips or repurpose the UI area. We will focus on Road filtering as requested.
4.  **Interaction**: User Taps "Select Road" -> List appears -> User selects "A-6" -> Modal closes -> List updates.
</approach>

<!-- List input artifacts this change depends on (e.g., specific specs or designs) -->
<inputs>
- `components/WebcamsListScreen.tsx`
- `data/webcams.json`
</inputs>

<!-- List what this change will produce (code, docs, tests, etc.) -->
<outputs>
- Updated `WebcamsListScreen.tsx`.
- New `RoadSelector` component (either inline or separate file).
</outputs>

<!-- Define success criteria. How will we know this is done? -->
<success_criteria>
- A dropdown/selector for Roads is visible.
- The list of roads is dynamically populated from the data.
- Selecting a road filters the webcam list.
- The UI handles the long list of roads gracefully (scrollable selection).
</success_criteria>

<unlocks>
- More granular filtering capability.
- Scalable UI for many filter options.
</unlocks>

</artifact>
