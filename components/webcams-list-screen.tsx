import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFilteredCams, useProvinces, useRoads } from '../hooks/use-cams';
import { Cam } from '../types/cam';
import { FiltersModal } from './filters-modal';
import { WebcamCard } from './webcam-card';
import { WebcamsListHeader } from './webcams-list-header';
import { WebcamsListSubheader } from './webcams-list-subheader';

export const WebcamsListScreen = () => {
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);

  // Use the new custom hooks to fetch data asynchronously
  const { data: roads = [] } = useRoads();
  const { data: provinces = [] } = useProvinces();

  const { data: filteredCams = [], isLoading } = useFilteredCams({
    road: selectedRoad,
    province: selectedProvince,
  });

  const renderItem = useCallback(({ item }: { item: Cam }) => (
    <WebcamCard item={item} />
  ), []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
      {/* Header */}
      <WebcamsListHeader onOpenFilters={() => setIsFiltersModalVisible(true)} />

      {/* Subheader */}
      <WebcamsListSubheader cameraCount={filteredCams.length} />

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

      {/* List / Loading indicator */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" className="text-primary" />
        </View>
      ) : (
        <FlatList
          className="flex-1 bg-white dark:bg-background-dark px-4"
          data={filteredCams}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};
