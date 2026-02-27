# Unit & Component Tests

## What to test
We need to ensure that the `CamDetailScreen` correctly integrates `AwesomeGallery` and manages the `isExpanded` state properly.

## Test Cases

1. **Renders static image initially**
   - **GIVEN** `CamDetailScreen` is mounted with an online camera
   - **THEN** it should render the `Image` component wrapped in a `Pressable`
   - **AND** `AwesomeGallery` should not be rendered yet

2. **Opens gallery on press**
   - **GIVEN** the initial screen is rendered
   - **WHEN** the user presses the `Pressable` wrapping the camera image
   - **THEN** the `isExpanded` state becomes true
   - **AND** `AwesomeGallery` should be present in the component tree

3. **Passes correct data to AwesomeGallery**
   - **GIVEN** the gallery is open
   - **THEN** the `AwesomeGallery` component should receive an array with one object: `{ uri: cam.imageUrl }`

4. **Closes gallery on swipe to close**
   - **GIVEN** the gallery is open
   - **WHEN** the `onSwipeToClose` callback of `AwesomeGallery` is triggered
   - **THEN** the `isExpanded` state becomes false
   - **AND** `AwesomeGallery` is unmounted

5. **Offline cameras cannot be expanded**
   - **GIVEN** `CamDetailScreen` is mounted with an offline camera
   - **WHEN** the user attempts to press the image placeholder
   - **THEN** the gallery should not open
   - **AND** the `Pressable` should either be disabled or omitted

## Implementation details
- We will use `@testing-library/react-native` to render `CamDetailScreen` and fire press events.
- We might need to mock `react-native-awesome-gallery` if it tries to use native modules that are not available in the Jest environment.
