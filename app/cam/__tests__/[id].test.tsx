import { useCamById } from '@/hooks/use-cams';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CamDetailScreen from '../[id]';

// Mock expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ id: 'cam-1' })),
  useRouter: jest.fn(),
  Stack: {
    Screen: ({ children }: any) => <>{children}</>,
  },
}));

// Mock hooks
jest.mock('@/hooks/use-color-scheme', () => ({
  useColorScheme: () => 'light',
}));

jest.mock('@/hooks/use-cams', () => ({
  useCamById: jest.fn(),
}));

// Mock icons
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

// Mock safe area context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }: any) => children,
    SafeAreaConsumer: ({ children }: any) => children(inset),
    SafeAreaView: ({ children }: any) => children,
    useSafeAreaInsets: () => inset,
  };
});

describe('CamDetailScreen', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
  });

  test('renders loading indicator when data is loading', () => {
    (useCamById as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    const { root } = render(
      <SafeAreaProvider>
        <CamDetailScreen />
      </SafeAreaProvider>
    );

    // We can query for ActivityIndicator using its type or text if any,
    // Since ActivityIndicator doesn't have a testID by default, we can check root.findByType
    const activityIndicator = root.findByType(ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });

  test('renders error state when camera is not found', () => {
    (useCamById as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(
      <SafeAreaProvider>
        <CamDetailScreen />
      </SafeAreaProvider>
    );

    expect(screen.getByText('Camera not found')).toBeTruthy();

    const goBackButton = screen.getByText('Go Back');
    fireEvent.press(goBackButton);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  test('renders camera details correctly', () => {
    const mockCam = {
      id: 'cam-1',
      road: 'A-1',
      location: 'MADRID',
      kilometer: 'Km 10',
      status: 'Live',
      imageUrl: 'http://example.com/cam.jpg',
      latitude: 40.4168,
      longitude: -3.7038,
    };

    (useCamById as jest.Mock).mockReturnValue({ data: mockCam, isLoading: false });

    render(
      <SafeAreaProvider>
        <CamDetailScreen />
      </SafeAreaProvider>
    );

    expect(screen.getByText('Webcam Detail')).toBeTruthy();
    expect(screen.getByText('A-1')).toBeTruthy();
    expect(screen.getAllByText('MADRID')).toBeTruthy();
    expect(screen.getAllByText('Km 10')).toBeTruthy();
    expect(screen.getByText('40.4168')).toBeTruthy();
    expect(screen.getByText('-3.7038')).toBeTruthy();
  });

  test('renders offline styling correctly', () => {
    const mockCamOffline = {
      id: 'cam-2',
      road: 'A-2',
      location: 'BARCELONA',
      kilometer: 'Km 20',
      status: 'offline',
    };

    (useCamById as jest.Mock).mockReturnValue({ data: mockCamOffline, isLoading: false });

    render(
      <SafeAreaProvider>
        <CamDetailScreen />
      </SafeAreaProvider>
    );

    expect(screen.getByText('Webcam Detail')).toBeTruthy();
    expect(screen.getAllByText('Offline')).toBeTruthy();
  });
});
