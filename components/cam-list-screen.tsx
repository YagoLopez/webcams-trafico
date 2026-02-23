import { JsonCamsRepository } from '@/lib/JsonCamsRepository';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFilteredCams, useProvinces, useRoads } from '../hooks/use-cams';
import { Cam } from '../types/cam';
import { CamCard } from './cam-card';
import { CamListHeader } from './cam-list-header';
import { CamListSubheader } from './cam-list-subheader';
import { FiltersModal } from './filters-modal';


export const CamListScreen = () => {
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
  const cams = JsonCamsRepository.getInstance();
  const { width } = useWindowDimensions();
  const numColumns = width >= 1280 ? 3 : width >= 640 ? 2 : 1;

  const { data: roads = [] } = useRoads(cams);
  const { data: provinces = [] } = useProvinces(cams);
  const { data: filteredCams = [], isLoading } = useFilteredCams(cams, {
    road: selectedRoad,
    province: selectedProvince,
  });

  const renderItem = useCallback(({ item }: { item: Cam }) => (
    <View className="px-1" style={{ width: numColumns === 3 ? '33.33%' : numColumns === 2 ? '50%' : '100%' }}>
      <CamCard item={item} />
    </View>
  ), [numColumns]);

  return (
    <SafeAreaView className="flex-1 w-full md:w-[80%] lg:w-[70%] bg-white dark:bg-background-dark">
      {/* Header */}
      <CamListHeader onOpenFilters={() => setIsFiltersModalVisible(true)} />

      {/* Subheader */}
      <CamListSubheader cameraCount={filteredCams.length} />

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
          key={`camera-list-${numColumns}-cols`}
          className="flex-1 bg-white dark:bg-background-dark px-2"
          data={filteredCams}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};
