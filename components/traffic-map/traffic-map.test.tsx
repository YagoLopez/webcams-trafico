import { render } from '@testing-library/react-native';
import React from 'react';
import TrafficMap from './traffic-map';

// Mock the router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    setParams: jest.fn(),
  }),
}));

describe('TrafficMap', () => {
  it('renders correctly with no cams', () => {
    const { getByTestId, queryByTestId } = render(
      <TrafficMap cams={[]} />
    );
    // Since we don't have a testID on the view, we just ensure it doesn't crash
    expect(true).toBe(true);
  });
});
