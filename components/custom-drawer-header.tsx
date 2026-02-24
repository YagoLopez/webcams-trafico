import { useAppStore } from '@/store/use-app-store';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/icon-symbol';

interface CustomDrawerHeaderProps {
  title: string;
}

export function CustomDrawerHeader({ title }: CustomDrawerHeaderProps) {
  const navigation = useNavigation();
  const camCount = useAppStore((state) => state.camCount);

  return (
    <SafeAreaView edges={['top']} className="bg-white dark:bg-background-dark">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            testID="drawer-menu-button"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <IconSymbol size={28} name="line.3.horizontal" color="#333" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold dark:text-white">{title}</Text>
        </View>
        <View className="bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full">
          <Text className="text-blue-700 dark:text-blue-300 font-medium">
            {camCount} cámaras
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
