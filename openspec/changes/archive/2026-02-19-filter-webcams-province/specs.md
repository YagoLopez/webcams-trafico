<artifact>
<id>specs</id>
<change>filter-webcams-province</change>
<type>specs</type>
<title>Province Filtering Specifications</title>

<requirements>
**REQ-1**: Extract Unique Provinces
- The component MUST analyze the loaded webcam data (`MOCK_DATA`) to extract all unique `location` values (assumed to be provinces).
- This list MUST be sorted alphabetically.
- The extraction SHOULD be memoized (computed once/when data changes).

**REQ-2**: Province Filter UI
- The horizontal filter list MUST display "All" as the first option.
- Following "All", it MUST display chips for each extracted province.
- Each chip MUST be tappable.
- There MUST be visual feedback for the selected chip (active state) vs unselected chips (inactive state).

**REQ-3**: Filtering Behavior
- Selecting "All" (or having no selection) MUST display all webcams.
- Selecting a specific province chip MUST filter the displayed list to show ONLY webcams where `location` matches the selected province.
- The `FlatList` MUST update immediately upon selection.

**REQ-4**: Default State
- The default state on load MUST be "All" (no specific province selected).

**REQ-5**: Header Update
- The section header ("A-6 Cameras" currently hardcoded) SHOULD be updated to reflect the current filter state (e.g., "All Cameras" or "{Province Name} Cameras").
</requirements>

<ui_changes>
- Horizontal ScrollView in `WebcamsListScreen`:
    - Replaced hardcoded cities with dynamic province list.
    - Updated styles for active/inactive states.
- Section Header: Updated text based on selection.
</ui_changes>

</artifact>
