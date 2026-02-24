import { useAppStore } from '@/store/use-app-store';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

export function CustomDrawerContent(props: any) {
  const setIsFilterModalVisible = useAppStore((state) => state.setIsFilterModalVisible);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      {/* Custom Action: Filtrar Cámaras */}
      <TouchableOpacity
        className="flex-row items-center px-4 py-3 mt-2"
        onPress={() => {
          setIsFilterModalVisible(true);
          props.navigation.closeDrawer();
        }}
      >
        <IconSymbol size={24} name="line.3.horizontal.decrease.circle" color="#666" />
        <Text className="ml-8 text-[#666] font-medium text-[15px]">Filtrar Cámaras</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
