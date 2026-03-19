import { Cam } from '@/architecture/domain/entities/cam';
import { JsonCamsRepository } from '@/lib/JsonCamsRepository';
import { useAppStore } from '@/store/use-app-store';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, View, useWindowDimensions } from 'react-native';
import { useInfiniteFilteredCams } from '../architecture/infraestructure/use-cams';
import { CamCard } from './cam-card';

const cams = JsonCamsRepository.getInstance();

export const CamListScreen = () => {
  const selectedRoadName = useAppStore((state) => state.selectedRoadName);
  const selectedProvince = useAppStore((state) => state.selectedProvince);
  const setCamCount = useAppStore((state) => state.setCamCount);
  const { width } = useWindowDimensions();
  const numColumns = width >= 1280 ? 3 : width >= 640 ? 2 : 1;

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteFilteredCams(cams, {
    roadName: selectedRoadName,
    province: selectedProvince,
  });

  // Aplanar todas las páginas cargadas en un solo array para el FlatList
  const flattenedCams = useMemo(
    () => data?.pages.flatMap(page => page.data) || [],
    [data?.pages]
  );
  // Para el contador total en la cabecera, podemos usar el totalItems de la primera página
  const totalCamsCount = data?.pages[0]?.totalItems || 0;

  useEffect(() => {
    setCamCount(totalCamsCount);
  }, [totalCamsCount, setCamCount]);

  const renderItem = useCallback(({ item }: { item: Cam }) => (
    <View className="px-1" style={{ width: numColumns === 3 ? '33.33%' : numColumns === 2 ? '50%' : '100%' }}>
      <CamCard item={item} />
    </View>
  ), [numColumns]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View className="flex-1 w-full lg:w-[70%] bg-white dark:bg-background-dark mt-4">
      {/* List / Loading indicator */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" className="text-primary" />
        </View>
      ) : (
        <FlatList
          key={`camera-list-${numColumns}-cols`}
          className="flex-1 bg-white dark:bg-background-dark px-2"
          data={flattenedCams}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-gray-500 dark:text-gray-400">
                No se encontraron cámaras con los filtros aplicados.
              </Text>
            </View>
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-4 items-center justify-center">
                <ActivityIndicator size="small" className="text-primary" />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};
