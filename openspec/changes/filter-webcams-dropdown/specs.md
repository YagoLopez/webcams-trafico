<artifact>
<id>specs</id>
<change>filter-webcams-dropdown</change>
<type>specs</type>
<title>Road Selector Specifications</title>

<requirements>
**REQ-1**: Extract Unique Roads
- The component MUST analyze the loaded webcam data (`MOCK_DATA`) to extract all unique `road` values.
- This list MUST be sorted alphanumericly.
- The extraction SHOULD be memoized (computed once).

**REQ-2**: Selector UI
- A "Dropdown" trigger button MUST be visible in place of the province chips.
- The trigger MUST display "All Roads" when no filter is active, or the selected road name.
- Tapping the trigger MUST open a selection interface (Modal/Overlay).
- The selection interface:
    - MUST list all available roads.
    - SHOULD be scrollable.
    - MUST allow selecting a single road.
    - SHOULD have a "Clear" or "All Roads" option to reset.
    - MUST close upon selection.

**REQ-3**: Filtering Behavior
- Selecting a road MUST filter the main webcam list to show ONLY cameras where `road` matches the selection.
- The `FlatList` MUST update immediately.
- Selecting "All Roads" MUST show all cameras.

**REQ-4**: Header Updates
- The header text MUST update to match the selected Road (e.g., "A-6 Cameras").
</requirements>

<ui_changes>
- **Dropdown Trigger**: A styled `Pressable` with an arrow icon.
- **Selection Modal**: A simple full-screen or large modal to handle the potentially long list of roads.
- **Removed**: The horizontal province chips.
</ui_changes>

</artifact>
