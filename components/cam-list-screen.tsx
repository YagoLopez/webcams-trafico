import { JsonCamsRepository } from '@/lib/JsonCamsRepository';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
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

  const { data: roads = [] } = useRoads(cams);
  const { data: provinces = [] } = useProvinces(cams);
  const { data: filteredCams = [], isLoading } = useFilteredCams(cams, {
    road: selectedRoad,
    province: selectedProvince,
  });

  const renderItem = useCallback(({ item }: { item: Cam }) => (
    <CamCard item={item} />
  ), []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
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
