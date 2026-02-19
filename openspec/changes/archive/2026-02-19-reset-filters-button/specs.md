<artifact>
<id>specs</id>
<change>reset-filters-button</change>
<type>specs</type>
<title>Reset Filters Button Specs</title>

<requirements>
**REQ-1**: Button Existence
- A "Reset Filters" (or "Borrar filtros") button MUST be present in the UI when filters are active.

**REQ-2**: Reset Functionality
- Tapping the button MUST clear ALL active filters (`selectedRoad` and `selectedProvince` -> `null`).

**REQ-3**: Conditional Visibility
- The button SHOULD only be visible or enabled when filters are active (`selectedRoad` or `selectedProvince` is not null).

**REQ-4**: Styling
- The button SHOULD be visually distinct but not intrusive (e.g., text button or outlined button).
- It SHOULD ideally use an icon for visual cue.
</requirements>

<ui_changes>
- Added `TouchableOpacity` button below filters.
</ui_changes>

</artifact>
