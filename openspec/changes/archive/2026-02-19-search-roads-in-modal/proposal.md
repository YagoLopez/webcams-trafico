<artifact>
<id>proposal</id>
<change>search-roads-in-modal</change>
<type>feature</type>
<title>Search Roads in Selector Modal</title>

<motivation>
The list of roads extracted from the DGT XML is extensive (likely > 100). Scrolling to find a specific road (e.g., "M-30") in the current simple list is cumbersome. The user explicitly requested adding search functionality inside the road selection modal to improve usability.
</motivation>

<approach>
1.  **UI Update**: Add a `TextInput` (Search Bar) inside the `Modal` component, above the road list.
2.  **State Management**: Add a `roadSearchQuery` state variable.
3.  **Filtering Logic**: Filter the list of `roads` displayed in the modal's `FlatList` based on the search query.
4.  **UX**:
    - The search input should focus automatically or be prominent.
    - The list updates in real-time as the user types.
    - Clearing the modal (closing it) should reset the search query.
</approach>

<inputs>
- `components/WebcamsListScreen.tsx`
</inputs>

<outputs>
- Updated `WebcamsListScreen.tsx` with search functionality in the modal.
</outputs>

<success_criteria>
- A search bar is visible inside the Road Selector modal.
- Typing in the search bar filters the list of roads.
- Selecting a filtered road works correctly.
- The search query is reset when reopening the modal (optional, but good UX).
</success_criteria>

</artifact>
