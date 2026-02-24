import { render } from '@testing-library/react-native';
import React from 'react';
import { CustomDrawerContent } from '../custom-drawer-content';

jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children }: any) => <>{children}</>,
  DrawerItemList: () => null,
}));


describe('CustomDrawerContent', () => {
  it('renders correctly', () => {
    const mockNavigation = {
      closeDrawer: jest.fn(),
    };

    render(<CustomDrawerContent navigation={mockNavigation} />);
    // Just verifying it renders without crashing since we mocked the inner components
  });
});
