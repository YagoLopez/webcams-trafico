import React, { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_DATA } from '../data/mock-webcams';
import { WebcamData } from '../types/webcam';
import { FiltersModal } from './filters-modal';
import { WebcamCard } from './webcam-card';
import { WebcamsListHeader } from './webcams-list-header';
import { WebcamsListSubheader } from './webcams-list-subheader';


export const WebcamsListScreen = () => {
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);

  // Extract unique roads
  const roads = useMemo(() => {
    const allRoads = MOCK_DATA.map((w) => w.road).filter(Boolean);
    return Array.from(new Set(allRoads)).sort((a, b) => {
      // Numeric sort for roads is better if possible (A-1 vs A-10), but alphanumeric is fine for now
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
  }, []);

  // Extract unique provinces
  const provinces = useMemo(() => {
    const allProvinces = MOCK_DATA.map((w) => w.location).filter(Boolean);
    return Array.from(new Set(allProvinces)).sort();
  }, []);

  const filteredWebcams = useMemo(() => {
    return MOCK_DATA.filter((w) => {
      const roadMatch = selectedRoad ? w.road === selectedRoad : true;
      const provinceMatch = selectedProvince ? w.location === selectedProvince : true;
      return roadMatch && provinceMatch;
    });
  }, [selectedRoad, selectedProvince]);

  const renderItem = useCallback(({ item }: { item: WebcamData }) => (
    <WebcamCard item={item} />
  ), []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
      {/* Header */}
      <WebcamsListHeader onOpenFilters={() => setIsFiltersModalVisible(true)} />

      {/* Subheader */}
      <WebcamsListSubheader cameraCount={filteredWebcams.length} />


      {/* Filters Modal */}
      <FiltersModal
        visible={isFiltersModalVisible}
        onClose={() => setIsFiltersModalVisible(false)}
        roads={roads}
        provinces={provinces}
        selectedRoad={selectedRoad}
        selectedProvince={selectedProvince}
        onSelectRoad={setSelectedRoad}
        onSelectProvince={setSelectedProvince}
      />

      {/* List */}
      <FlatList
        className="flex-1 bg-white dark:bg-background-dark px-4"
        data={filteredWebcams}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
