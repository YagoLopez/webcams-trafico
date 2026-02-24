import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { useAppStore } from '../../store/use-app-store';
import { CustomDrawerContent } from '../custom-drawer-content';

jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children }: any) => <>{children}</>,
  DrawerItemList: () => null,
}));

jest.mock('../../store/use-app-store', () => ({
  useAppStore: jest.fn(),
}));

describe('CustomDrawerContent', () => {
  it('renders "Filtrar Cámaras" and triggers action', () => {
    const mockSetIsFilterModalVisible = jest.fn();
    (useAppStore as unknown as jest.Mock).mockReturnValue(mockSetIsFilterModalVisible);

    const mockNavigation = {
      closeDrawer: jest.fn(),
    };

    render(<CustomDrawerContent navigation={mockNavigation} />);

    expect(screen.getByText('Filtrar Cámaras')).toBeTruthy();

    fireEvent.press(screen.getByText('Filtrar Cámaras'));

    expect(mockSetIsFilterModalVisible).toHaveBeenCalledWith(true);
    expect(mockNavigation.closeDrawer).toHaveBeenCalled();
  });
});
