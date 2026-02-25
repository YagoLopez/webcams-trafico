import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Modal } from 'react-native';
import { SelectBox } from '../ui/select-box';

// Mock MaterialIcons to avoid font loading issues in Jest
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

describe('<SelectBox />', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <SelectBox
        label="Test Label"
        data={['Option 1', 'Option 2']}
        value={null}
        onValueChange={jest.fn()}
        placeholder="Select Option"
      />
    );

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByText('Select Option')).toBeTruthy();
  });

  it('modal has fade animation and displays options when opened', () => {
    const { getByText, UNSAFE_getByType } = render(
      <SelectBox
        label="Test Label"
        data={['Option 1', 'Option 2']}
        value={null}
        onValueChange={jest.fn()}
        placeholder="Select Option"
      />
    );

    // Open the modal
    fireEvent.press(getByText('Select Option'));

    // Check if Modal has animationType="fade"
    const modal = UNSAFE_getByType(Modal);
    expect(modal.props.animationType).toBe('fade');

    // Check if options are visible
    expect(getByText('Option 1')).toBeTruthy();
  });
});
