<artifact>
<id>specs</id>
<change>province-filter-dropdown</change>
<type>specs</type>
<title>Province Filter & SelectBox Specs</title>

<requirements>
**REQ-1**: Reusable SelectBox Component
- Create a reusable `SelectBox` component in `components/common/SelectBox.tsx` (or similar).
- The `SelectBox` MUST accept `label`, `placeholder`, `searchPlaceholder`, `data` (list of strings), `value` (selected string), and `onValueChange` callback.
- The `SelectBox` MUST display a label above the trigger button.
- The Component MUST manage its own modal visibility and search query state.
- The Modal MUST handle searching within the provided `data` list as defined in `search-roads-in-modal` specs.

**REQ-2**: Province Filtering
- `WebcamsListScreen` MUST compute unique provinces from `MOCK_DATA`.
- A `SelectBox` for "Filtrar provincias" MUST be added below the road filter.
- Selecting a province MUST update `selectedProvince` state.

**REQ-3**: Combined Filtering
- The main `FlatList` MUST filter by `selectedRoad` AND `selectedProvince`.
- If both are selected, webcams must satisfy BOTH criteria.
- If only one is selected, filter by that one.
- If neither, show all.

**REQ-4**: Labels
- The Road filter MUST have a label "Filtrar carreteras" above it.
- The Province filter MUST have a label "Filtrar provincias" above it.
</requirements>

<ui_changes>
- Replaced direct Modal logic with `SelectBox` component instances.
- Added second `SelectBox` for provinces.
- Added labels above selectors.
</ui_changes>

</artifact>
