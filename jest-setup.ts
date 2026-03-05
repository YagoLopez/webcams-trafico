import '@testing-library/jest-native/extend-expect';

// Mock all expo vector icons to prevent font loading issues and act() warnings during tests
const mockIconComponent = () => 'Icon';
jest.mock('@expo/vector-icons/MaterialIcons', () => mockIconComponent);
jest.mock('@expo/vector-icons/Ionicons', () => mockIconComponent);
jest.mock('@expo/vector-icons/FontAwesome', () => mockIconComponent);
jest.mock('@expo/vector-icons/FontAwesome5', () => mockIconComponent);
jest.mock('@expo/vector-icons/Entypo', () => mockIconComponent);
jest.mock('@expo/vector-icons/Feather', () => mockIconComponent);
jest.mock('@expo/vector-icons/AntDesign', () => mockIconComponent);
jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => mockIconComponent);

// Also mock vector-icons root if any component imports directly from it
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: mockIconComponent,
  Ionicons: mockIconComponent,
  FontAwesome: mockIconComponent,
  FontAwesome5: mockIconComponent,
  Entypo: mockIconComponent,
  Feather: mockIconComponent,
  AntDesign: mockIconComponent,
  MaterialCommunityIcons: mockIconComponent,
}));
