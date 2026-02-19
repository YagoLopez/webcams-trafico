<artifact>
<id>design</id>
<change>filter-webcams-province</change>
<type>design</type>
<title>Province Filtering Design</title>

<architecture>
The filtering logic will be implemented client-side within the `WebcamsListScreen` component.
We will calculate unique provinces from `MOCK_DATA` once (or use a `memo`).
We will manage `selectedProvince` state.
The `FlatList` data source will be derived by filtering `MOCK_DATA` based on the selected province.
</architecture>

<ui_ux>
The horizontal `ScrollView` currently containing predefined cities will be replaced with dynamically generated filter "chips".
- **First Chip**: "All" (Resets filter).
- **Subsequent Chips**: One for each unique province found in the data, sorted alphabetically.
- **Interaction**: Tapping a chip sets it as active. Active chip changes visual style (e.g., dark background for light mode), inactive chips have default style.
- **Scroll**: The list of provinces is long, so the horizontal scroll is essential.
</ui_ux>

<data_structure>
**State**:
```typescript
const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
```

**Derived Data**:
```typescript
const provinces = useMemo(() => {
  const allProvinces = MOCK_DATA.map(w => w.location).filter(Boolean);
  return Array.from(new Set(allProvinces)).sort();
}, []);

const filteredWebcams = useMemo(() => {
  if (!selectedProvince) return MOCK_DATA;
  return MOCK_DATA.filter(w => w.location === selectedProvince);
}, [selectedProvince]);
```
</data_structure>

<implementation_details>
**Performance Consideration**: 
- Using `useMemo` for deriving the province list and filtered data is crucial to prevent recalculation on every render.
- The default view (when `selectedProvince` is null) still renders all items. We might want to limit the initial render count or simply rely on `FlatList` virtualization, which `react-native` handles well by default.
</implementation_details>

</artifact>
