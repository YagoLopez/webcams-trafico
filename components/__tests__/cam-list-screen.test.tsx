import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CamListScreen } from '../cam-list-screen';

jest.mock('expo-image', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  return { Image: (props: any) => <View {...props} /> };
});

jest.mock('react-native-css-interop', () => ({
  withTransition: (comp: any) => comp,
  remapProps: () => { },
}));

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }: any) => children,
    SafeAreaConsumer: ({ children }: any) => children(inset),
    SafeAreaView: ({ children }: any) => children,
    useSafeAreaInsets: () => inset,
  };
});

// Mock the custom hooks completely
jest.mock('../../hooks/use-cams', () => ({
  useRoads: () => ({ data: ['A-1', 'A-2'], isLoading: false }),
  useProvinces: () => ({ data: ['MADRID', 'BARCELONA'], isLoading: false }),
  useFilteredCams: () => ({
    data: [
      {
        id: 'cam-1',
        road: 'A-1',
        location: 'MADRID',
        status: 'Activa',
      },
    ],
    isLoading: false,
  }),
}));

// Mock the Zustand store
jest.mock('../../store/use-app-store', () => ({
  useAppStore: jest.fn((selector) => {
    const mockStore = {
      selectedRoad: null,
      selectedProvince: null,
      setCamCount: jest.fn(),
      isFilterModalVisible: false,
      setIsFilterModalVisible: jest.fn(),
    };
    return selector(mockStore);
  }),
}));

describe('CamsListScreen', () => {
  test('renders the list cards directly based on mocked hooks', () => {
    // We don't need QueryClientProvider if we mock the hooks returning data!
    render(
      <SafeAreaProvider>
        <CamListScreen />
      </SafeAreaProvider>
    );

    // Check if the flatlist item renders based on the mocked cams hook
    expect(screen.getByText('MADRID')).toBeTruthy();
  });
});
