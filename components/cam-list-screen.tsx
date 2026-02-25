import { JsonCamsRepository } from '@/lib/JsonCamsRepository';
import { useAppStore } from '@/store/use-app-store';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, useWindowDimensions } from 'react-native';
import { useFilteredCams } from '../hooks/use-cams';
import { Cam } from '../types/cam';
import { CamCard } from './cam-card';

export const CamListScreen = () => {
  const selectedRoad = useAppStore((state) => state.selectedRoad);
  const selectedProvince = useAppStore((state) => state.selectedProvince);
  const setCamCount = useAppStore((state) => state.setCamCount);
  const cams = JsonCamsRepository.getInstance();
  const { width } = useWindowDimensions();
  const numColumns = width >= 1280 ? 3 : width >= 640 ? 2 : 1;

  const { data: filteredCams = [], isLoading } = useFilteredCams(cams, {
    road: selectedRoad,
    province: selectedProvince,
  });

  useEffect(() => {
    setCamCount(filteredCams.length);
  }, [filteredCams.length, setCamCount]);

  const renderItem = useCallback(({ item }: { item: Cam }) => (
    <View className="px-1" style={{ width: numColumns === 3 ? '33.33%' : numColumns === 2 ? '50%' : '100%' }}>
      <CamCard item={item} />
    </View>
  ), [numColumns]);

  return (
    <View className="flex-1 w-full lg:w-[70%] bg-white dark:bg-background-dark">
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
    </View>
  );
};
