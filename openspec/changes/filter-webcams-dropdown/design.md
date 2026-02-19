<artifact>
<id>design</id>
<change>filter-webcams-dropdown</change>
<type>design</type>
<title>Road Selector Design</title>

<architecture>
The filtering logic will migrate from `selectedProvince` to `selectedRoad` (or both, but focusing on Road this iteration as requested).
The `RoadSelector` will be a composite component using a `Modal` and `FlatList` for selection.
It will replace the horizontal scroll view of chips.
</architecture>

<ui_ux>
**Trigger**: A button/box that looks like a dropdown ("Select Road" or currently selected road).
**Selection Modal**:
- Full screen or partial sheet modal.
- Search input at the top (optional, highly recommended given number of roads).
- Scrollable list of roads.
- "Clear" button to reset selection.
**Feedback**:
- When a road is selected, the trigger displays the road name.
- The list of cameras immediately filters to show only cameras on that road.
</ui_ux>

<data_structure>
**State**:
```typescript
const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
const [isSelectorVisible, setSelectorVisible] = useState(false);
```

**Derived Data**:
```typescript
const roads = useMemo(() => {
  const allRoads = MOCK_DATA.map(w => w.road).filter(Boolean);
  return Array.from(new Set(allRoads)).sort();
}, []);

const filteredWebcams = useMemo(() => {
  if (!selectedRoad) return MOCK_DATA;
  return MOCK_DATA.filter(w => w.road === selectedRoad);
}, [selectedRoad]);
```
</data_structure>

<implementation_details>
- **Avoid External Libs**: To keep it dependency-light, we'll implement a custom modal selector.
- **Placement**: This will replace the `<ScrollView horizontal ...>` block in `WebcamsListScreen`.
- **Styling**: Consistent with the app theme (slate backgrounds, rounded corners).
</implementation_details>

</artifact>
