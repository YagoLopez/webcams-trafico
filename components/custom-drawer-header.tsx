import { useAppStore } from '@/store/use-app-store';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useSegments } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/icon-symbol';

interface CustomDrawerHeaderProps {
  title: string;
  showFiltersButton?: boolean;
}

export function CustomDrawerHeader({ title, showFiltersButton }: CustomDrawerHeaderProps) {
  const navigation = useNavigation();
  const segments = useSegments();
  const isNearbyCam = segments.some((s) => s === 'nearby-cam');
  const shouldShowFilters = showFiltersButton !== undefined ? showFiltersButton : !isNearbyCam;
  const camCount = useAppStore((state) => state.camCount);
  const setIsFilterModalVisible = useAppStore((state) => state.setIsFilterModalVisible);
  const selectedRoadName = useAppStore((state) => state.selectedRoadName);
  const selectedProvince = useAppStore((state) => state.selectedProvince);

  const isFilterActive = !!(selectedRoadName || selectedProvince);

  return (
    <SafeAreaView
      edges={['top']}
      className="bg-primary dark:bg-background-dark z-10 shadow-md"
      style={{ elevation: 4 }}
    >
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center gap-4">
          <Pressable
            testID="drawer-menu-button"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="active:opacity-60"
          >
            <IconSymbol size={28} name="line.3.horizontal" color="#fff" />
          </Pressable>
          <Text className="text-xl font-semibold text-white">{title}</Text>
        </View>
        <View className="flex-row items-center gap-3">
          {shouldShowFilters && (
            <>
              <View className="bg-white/20 dark:bg-blue-900/40 px-3 py-1 rounded-lg">
                <Text className="text-white dark:text-blue-300 font-medium">
                  {camCount} cams
                </Text>
              </View>
              <Pressable
                testID="open-filters-button"
                onPress={() => setIsFilterModalVisible(true)}
                className={`p-1.5 rounded-full active:opacity-60 ${isFilterActive ? 'bg-red-600' : ''}`}
              >
                <IconSymbol size={24} name="slider.horizontal.3" color="#fff" />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
