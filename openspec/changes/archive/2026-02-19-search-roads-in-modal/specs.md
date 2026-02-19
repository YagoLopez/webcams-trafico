<artifact>
<id>specs</id>
<change>search-roads-in-modal</change>
<type>specs</type>
<title>Road Selector Search Specifications</title>

<requirements>
**REQ-1**: Search Input
- The Road Selector Modal MUST contain a search input field.
- The input MUST focus appropriately (though auto-focus might be jarring on mobile, so user-initiated focus is acceptable).
- The input MUST have a placeholder (e.g., "Search road...").

**REQ-2**: Filtering Modal List
- Typing in the search bar MUST filter the displayed list of roads in the modal.
- The filtering MUST be case-insensitive.
- If the search query is empty, ALL roads (including "All Roads" option) MUST be displayed.
- If the search query is not empty, ONLY matching roads MUST be displayed. "All Roads" option MAY be hidden during search.

**REQ-3**: Search Reset
- Closing the modal MUST clear the search query so it is empty the next time the modal opens.
- A "clear search" icon/button inside the input (if implemented) MUST clear the text.

**REQ-4**: No Results
- If the search yields no results, a "No roads found" message or empty list SHOULD be displayed (user should be able to deduce no matches).
</requirements>

<ui_changes>
- Added `TextInput` and container inside `Modal`.
- Logic to filter the `FlatList` data.
</ui_changes>

</artifact>
