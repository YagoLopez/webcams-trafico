import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

describe('Simple Test', () => {
  test('renders text', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });
});
