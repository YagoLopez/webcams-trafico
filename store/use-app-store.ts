import { create } from 'zustand';

interface AppState {
  camCount: number;
  setCamCount: (count: number) => void;
  isFilterModalVisible: boolean;
  setIsFilterModalVisible: (visible: boolean) => void;
  selectedRoadName: string | null;
  setSelectedRoadName: (roadName: string | null) => void;
  selectedProvince: string | null;
  setSelectedProvince: (province: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  camCount: 0,
  setCamCount: (count) => set({ camCount: count }),
  isFilterModalVisible: false,
  setIsFilterModalVisible: (visible) => set({ isFilterModalVisible: visible }),
  selectedRoadName: null,
  setSelectedRoadName: (roadName) => set({ selectedRoadName: roadName }),
  selectedProvince: null,
  setSelectedProvince: (province) => set({ selectedProvince: province }),
}));
