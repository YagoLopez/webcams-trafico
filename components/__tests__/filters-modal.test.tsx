import { render } from '@testing-library/react-native';
import React from 'react';
import { FiltersModal } from '../filters-modal';

// Mock MaterialIcons to avoid font loading issues in Jest
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

describe('<FiltersModal />', () => {
  it('renders correctly and has fade animation', () => {
    const { getByText, UNSAFE_getByType } = render(
      <FiltersModal
        visible={true}
        onClose={jest.fn()}
        roads={['A-1']}
        provinces={['MADRID']}
        selectedRoad={null}
        selectedProvince={null}
        onSelectRoad={jest.fn()}
        onSelectProvince={jest.fn()}
      />
    );

    // Check if the title exists
    expect(getByText('Filtros')).toBeTruthy();

    // Check if Modal has animationType="fade"
    const { Modal } = require('react-native');
    const modal = UNSAFE_getByType(Modal);
    expect(modal.props.animationType).toBe('fade');
  });

  it('applies the correct centered layout classes to container views', () => {
    const { getByTestId, getByText } = render(
      <FiltersModal
        visible={true}
        onClose={jest.fn()}
        roads={['A-1']}
        provinces={['MADRID']}
        selectedRoad={null}
        selectedProvince={null}
        onSelectRoad={jest.fn()}
        onSelectProvince={jest.fn()}
      />
    );

    // Verify it renders without crashing by checking for an expected element
    expect(getByText('Aplicar Filtros')).toBeTruthy();

    const overlay = getByTestId('filters-modal-overlay');
    const content = getByTestId('filters-modal-content');

    // Assert overlay layout classes
    expect(overlay.props.className).toContain('justify-center');
    expect(overlay.props.className).toContain('items-center');
    expect(overlay.props.className).toContain('p-4');

    // Assert content layout classes
    expect(content.props.className).toContain('max-w-md');
  });
});
