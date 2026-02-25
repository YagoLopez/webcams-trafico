import { fireEvent, render, screen } from '@testing-library/react-native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { useAppStore } from '../../store/use-app-store';
import { CustomDrawerHeader } from '../custom-drawer-header';

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  DrawerActions: {
    openDrawer: jest.fn(() => ({ type: 'OPEN_DRAWER' })),
  },
}));

jest.mock('../../hooks/use-color-scheme', () => ({
  useColorScheme: jest.fn(() => 'light'),
}));

jest.mock('../../store/use-app-store', () => ({
  useAppStore: jest.fn(),
}));

describe('CustomDrawerHeader', () => {
  const mockDispatch = jest.fn();
  const mockSetIsFilterModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
    (useAppStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        camCount: 5,
        setIsFilterModalVisible: mockSetIsFilterModalVisible,
        selectedRoad: '',
        selectedProvince: '',
      })
    );
  });

  it('renders correctly with title', () => {
    render(<CustomDrawerHeader title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('5 cams')).toBeTruthy();
  });

  it('navigates to open drawer on icon press', () => {
    render(<CustomDrawerHeader title="Test Title" />);

    const button = screen.getByTestId('drawer-menu-button');
    fireEvent.press(button);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'OPEN_DRAWER' });
  });

  it('opens filter modal on filter icon press', () => {
    render(<CustomDrawerHeader title="Test Title" />);

    const filterButton = screen.getByTestId('open-filters-button');
    fireEvent.press(filterButton);

    expect(mockSetIsFilterModalVisible).toHaveBeenCalledWith(true);
  });

  it('shows red background on filter icon when filters are active', () => {
    (useAppStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        camCount: 5,
        setIsFilterModalVisible: mockSetIsFilterModalVisible,
        selectedRoad: 'A-1',
        selectedProvince: '',
      })
    );

    render(<CustomDrawerHeader title="Test Title" />);

    const filterButton = screen.getByTestId('open-filters-button');
    // Check if it has the active class (NativeWind) or style
    // Since we are using NativeWind 4, it might be reflected in the props
    expect(filterButton.props.className).toContain('bg-red-600');
  });
});
