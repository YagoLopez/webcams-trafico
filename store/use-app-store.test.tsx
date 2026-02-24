import { act } from '@testing-library/react-hooks';
import { useAppStore } from './use-app-store';

describe('useAppStore', () => {
  afterEach(() => {
    // Reset store state between tests
    const store = useAppStore.getState();
    store.setCamCount(0);
    store.setIsFilterModalVisible(false);
    store.setSelectedRoad(null);
    store.setSelectedProvince(null);
  });

  it('initializes with default values', () => {
    const state = useAppStore.getState();
    expect(state.camCount).toBe(0);
    expect(state.isFilterModalVisible).toBe(false);
    expect(state.selectedRoad).toBeNull();
    expect(state.selectedProvince).toBeNull();
  });

  it('updates camCount', () => {
    act(() => {
      useAppStore.getState().setCamCount(42);
    });
    expect(useAppStore.getState().camCount).toBe(42);
  });

  it('updates isFilterModalVisible', () => {
    act(() => {
      useAppStore.getState().setIsFilterModalVisible(true);
    });
    expect(useAppStore.getState().isFilterModalVisible).toBe(true);
  });

  it('updates selectedRoad', () => {
    act(() => {
      useAppStore.getState().setSelectedRoad('A-1');
    });
    expect(useAppStore.getState().selectedRoad).toBe('A-1');
  });

  it('updates selectedProvince', () => {
    act(() => {
      useAppStore.getState().setSelectedProvince('MADRID');
    });
    expect(useAppStore.getState().selectedProvince).toBe('MADRID');
  });
});
