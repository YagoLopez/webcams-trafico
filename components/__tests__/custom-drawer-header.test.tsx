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
    openDrawer: jest.fn(),
  },
}));

jest.mock('../../hooks/use-color-scheme', () => ({
  useColorScheme: jest.fn(() => 'light'),
}));

jest.mock('../../store/use-app-store', () => ({
  useAppStore: jest.fn(),
}));

describe('CustomDrawerHeader', () => {
  it('renders correctly with title', () => {
    (useAppStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ camCount: 5 })
    );

    render(<CustomDrawerHeader title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('5 cámaras')).toBeTruthy();
  });

  it('navigates to open drawer on icon press', () => {
    const mockDispatch = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
    (useAppStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ camCount: 5 })
    );

    render(<CustomDrawerHeader title="Test Title" />);

    const button = screen.getByTestId('drawer-menu-button');
    fireEvent.press(button);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('opens filter modal on filter icon press', () => {
    const mockSetIsFilterModalVisible = jest.fn();
    (useAppStore as unknown as jest.Mock).mockImplementation((selector) => {
      // Return the mock function for setIsFilterModalVisible, and an arbitrary number for camCount
      if (selector.toString().includes('setIsFilterModalVisible')) {
        return mockSetIsFilterModalVisible;
      }
      return 5;
    });

    render(<CustomDrawerHeader title="Test Title" />);

    const filterButton = screen.getByTestId('open-filters-button');
    fireEvent.press(filterButton);

    expect(mockSetIsFilterModalVisible).toHaveBeenCalledWith(true);
  });
});
