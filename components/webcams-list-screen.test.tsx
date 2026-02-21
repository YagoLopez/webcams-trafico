import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebcamsListScreen } from './webcams-list-screen';

jest.mock('expo-image', () => {
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
jest.mock('../hooks/use-cams', () => ({
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

describe('WebcamsListScreen', () => {
  test('renders the list cards directly based on mocked hooks', () => {
    // We don't need QueryClientProvider if we mock the hooks returning data!
    render(
      <SafeAreaProvider>
        <WebcamsListScreen />
      </SafeAreaProvider>
    );

    // Header check
    expect(screen.getByText(/Cámaras DGT/i)).toBeTruthy();

    // With 1 mocked camera, the subheader text should show "1 Cámaras" (or 1 Cámara)
    expect(screen.getByText(/1 Cámaras/i)).toBeTruthy();
  });
});
