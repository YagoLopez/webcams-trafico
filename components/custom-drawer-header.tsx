import { useAppStore } from '@/store/use-app-store';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/icon-symbol';

interface CustomDrawerHeaderProps {
  title: string;
}

export function CustomDrawerHeader({ title }: CustomDrawerHeaderProps) {
  const navigation = useNavigation();
  const camCount = useAppStore((state) => state.camCount);
  const setIsFilterModalVisible = useAppStore((state) => state.setIsFilterModalVisible);
  const selectedRoad = useAppStore((state) => state.selectedRoad);
  const selectedProvince = useAppStore((state) => state.selectedProvince);

  const isFilterActive = !!(selectedRoad || selectedProvince);

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
          <View className="bg-white/20 dark:bg-blue-900/40 px-3 py-1 rounded-lg">
            <Text className="text-white dark:text-blue-300 font-medium">
              {camCount} cámaras
            </Text>
          </View>
          <Pressable
            testID="open-filters-button"
            onPress={() => setIsFilterModalVisible(true)}
            className={`p-1.5 rounded-full active:opacity-60 ${isFilterActive ? 'bg-red-600' : ''}`}
          >
            <IconSymbol size={24} name="slider.horizontal.3" color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
