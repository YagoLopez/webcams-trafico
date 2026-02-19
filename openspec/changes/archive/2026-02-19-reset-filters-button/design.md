<artifact>
<id>design</id>
<change>reset-filters-button</change>
<type>design</type>
<title>Reset Filters UI Design</title>

<ui_ux>
- **Placement**: A small button or text link to the right of the "Filters" section header (if added) or centered below the filters.
- **Styling**: `TouchableOpacity` with text "Reset Filters" (or "Borrar filtros") and a trash icon.
- **Conditional Rendering**: Only show if `selectedRoad` OR `selectedProvince` is not null.
</ui_ux>

<data_structure>
**State Logic**:
```typescript
const isAnyFilterActive = selectedRoad !== null || selectedProvince !== null;

const handleReset = () => {
    setSelectedRoad(null);
    setSelectedProvince(null);
};
```
</data_structure>

<implementation_details>
- Add the button inside the existing Filters View in `WebcamsListScreen.tsx`.
- Use a `TouchableOpacity` for the interaction.
- Use `MaterialIcons` for a "delete-outline" or "refresh" icon.
</implementation_details>

</artifact>
