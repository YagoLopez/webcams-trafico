<artifact>
<id>design</id>
<change>search-roads-in-modal</change>
<type>design</type>
<title>Road Selector Search Design</title>

<ui_ux>
Inside the `Modal` component:
- **Header**: "Select Road" text + Close button (existing).
- **Search Bar**: A new text input below the header.
  - Placeholder: "Filter roads..." or similar.
  - Icon: Search icon on the left.
  - Clear Option: 'X' icon if text is present to quickly clear search.
- **List**:
  - The `FlatList` data source will be derived from `roads.filter(...)`.
  - Should display "No roads found" if search yields no results.
</ui_ux>

<data_structure>
**State**:
```typescript
const [roadSearch, setRoadSearch] = useState('');
```

**Derived Data**:
```typescript
const filteredRoads = useMemo(() => {
  if (!roadSearch) return ['All Roads', ...roads];
  const query = roadSearch.toLowerCase();
  const matches = roads.filter(r => r.toLowerCase().includes(query));
  return matches.length > 0 ? matches : []; // Optionally keep "All Roads" or not based on search
}, [roadSearch, roads]);
// Actually, if searching, 'All Roads' might not be relevant unless user explicitly clears, but keeping it visible if query is empty is good.
```
</data_structure>

<implementation_details>
- Reset `setRoadSearch('')` when modal visibility changes to `false` (on close) or `true` (on open).
- `TextInput` props: `autoCorrect={false}`, `returnKeyType="search"`.
</implementation_details>

</artifact>
