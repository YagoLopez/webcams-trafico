<artifact>
<id>design</id>
<change>province-filter-dropdown</change>
<type>design</type>
<title>Province Filter & Reusable SelectBox</title>

<architecture>
1.  **Extract `SelectBox` Component**: A reusable component that renders:
    -   A label above the trigger (e.g., "Filtrar carreteras").
    -   A trigger button (styled `TouchableOpacity`).
    -   A `Modal` containing the search bar and `FlatList` of options.
    -   Internal state for `modalVisible` and `searchQuery`.
    -   Props: `label`, `data`, `value`, `setValue`, `placeholder`, `searchPlaceholder`.
2.  **Refactor `WebcamsListScreen`**:
    -   Remove the raw modal and trigger code.
    -   Import and use `SelectBox` twice: once for Roads, once for Provinces.
    -   Pass extracted `roads` and `provinces` (newly extracted from `MOCK_DATA`) to these components.
    -   Update filtering logic to combine `selectedRoad` and `selectedProvince`.
</architecture>

<ui_ux>
- **Labels**: "Filtrar carreteras" and "Filtrar provincias" text above each dropdown.
- **Placement**: Province filter appears vertically stacked below the Road filter.
- **Interaction**: Identical to the current Road filter (tap to open, search, select).
</ui_ux>

<data_structure>
**State in `WebcamsListScreen`**:
```typescript
const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
```

**Derived Data**:
```typescript
const provinces = useMemo(() => Array.from(new Set(MOCK_DATA.map(w => w.location).filter(Boolean))).sort(), []);

const filteredWebcams = useMemo(() => {
  return MOCK_DATA.filter(w => {
    const roadMatch = selectedRoad ? w.road === selectedRoad : true;
    const provinceMatch = selectedProvince ? w.location === selectedProvince : true;
    return roadMatch && provinceMatch;
  });
}, [selectedRoad, selectedProvince]);
```
</data_structure>

</artifact>
