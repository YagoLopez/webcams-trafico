<artifact>
<id>proposal</id>
<change>reset-filters-button</change>
<type>feature</type>
<title>Reset Filters Button</title>

<motivation>
The recent addition of road and province filters significantly enhances functionality, but users currently have no quick way to return to the default view (no filters) without manually deselecting each filter individually. A "Reset Filters" button will streamline this interaction.
</motivation>

<approach>
1.  **Add Reset Button**: Place a "Reset" or "Clear All" button below the filter selectors.
2.  **State Management**: The button will reset both `selectedRoad` and `selectedProvince` states to `null`.
3.  **UI Logic**: The button should ideally only be visible or enabled when filters are active.

</approach>

<inputs>
- `components/WebcamsListScreen.tsx`
- `components/ui/SelectBox.tsx` (view only)
</inputs>

<outputs>
- Updated `WebcamsListScreen.tsx` with the reset button.
</outputs>

<success_criteria>
- A "Reset Filters" button appears when filters are active.
- Tapping the button clears both road and province selections.
- The webcam list updates to show all cameras.
</success_criteria>

</artifact>
