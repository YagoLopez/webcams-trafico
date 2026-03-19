import { Cam } from '@/architecture/domain/entities/cam';
import { render } from '@testing-library/react-native';
import React from 'react';
import TrafficMap from '../traffic-map/traffic-map';

// Mock the router
const mockSetParams = jest.fn();
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    setParams: mockSetParams,
  }),
}));

jest.mock('react-native-map-clustering', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  const MockClustering = (props: any) => <View testID="map-clustering" {...props}>{props.children}</View>;
  MockClustering.displayName = 'MockClustering';
  return MockClustering;
});

jest.mock('@/architecture/infraestructure/use-cams', () => ({
  useNextCam: jest.fn(() => ({ data: null })),
  usePrevCam: jest.fn(() => ({ data: null })),
}));

jest.mock('react-native-maps', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  const MockMapView = (props: any) => <View testID="map-view" {...props}>{props.children}</View>;
  MockMapView.displayName = 'MockMapView';
  const MockMarker = (props: any) => <View testID={props.testID} {...props} />;
  MockMarker.displayName = 'MockMarker';
  MockMapView.Marker = MockMarker;
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_GOOGLE: 'PROVIDER_GOOGLE',
  };
});

const mockCams: Cam[] = [
  {
    id: '1',
    latitude: 40.4168,
    longitude: -3.7038,
    location: 'Madrid Center',
    roadName: 'M-30',
    roadDestination: '',
    kilometer: 5,
    imageUrl: 'https://example.com/cam1.jpg',
    status: 'active'
  },
  {
    id: '2',
    latitude: 40.4268,
    longitude: -3.7138,
    location: 'Madrid North',
    roadName: 'M-40',
    roadDestination: '',
    kilometer: 10,
    imageUrl: 'https://example.com/cam2.jpg',
    status: 'active'
  }
];

describe('TrafficMap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with no cams', () => {
    const { getByTestId } = render(
      <TrafficMap cams={[]} />
    );
    expect(getByTestId('map-clustering')).toBeTruthy();
  });

  it('renders markers correctly on the map', () => {
    const { getByTestId } = render(
      <TrafficMap cams={mockCams} />
    );

    // Check that we have the markers rendered with the expected testIDs
    expect(getByTestId('map-marker-1')).toBeTruthy();
    expect(getByTestId('map-marker-2')).toBeTruthy();
  });

  it('renders the pseudo-callout popup correctly when a camera is selected', () => {
    const { getByTestId, getByText } = render(
      <TrafficMap cams={mockCams} selectedCameraId="1" />
    );

    // The callout should be rendered
    expect(getByTestId('pseudo-callout')).toBeTruthy();

    // The details of the active camera should be visible
    expect(getByText('Madrid Center')).toBeTruthy();
    expect(getByText('M-30 - Km 5')).toBeTruthy();
  });

  it('does not render the pseudo-callout when no camera is selected', () => {
    const { queryByTestId } = render(
      <TrafficMap cams={mockCams} />
    );

    // The callout should not be rendered
    expect(queryByTestId('pseudo-callout')).toBeNull();
  });
});
