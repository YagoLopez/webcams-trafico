import { create } from 'zustand';

interface AppState {
  camCount: number;
  setCamCount: (count: number) => void;
  isFilterModalVisible: boolean;
  setIsFilterModalVisible: (visible: boolean) => void;
  selectedRoad: string | null;
  setSelectedRoad: (road: string | null) => void;
  selectedProvince: string | null;
  setSelectedProvince: (province: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  camCount: 0,
  setCamCount: (count) => set({ camCount: count }),
  isFilterModalVisible: false,
  setIsFilterModalVisible: (visible) => set({ isFilterModalVisible: visible }),
  selectedRoad: null,
  setSelectedRoad: (road) => set({ selectedRoad: road }),
  selectedProvince: null,
  setSelectedProvince: (province) => set({ selectedProvince: province }),
}));
