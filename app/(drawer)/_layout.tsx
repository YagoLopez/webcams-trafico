import { CustomDrawerContent } from '@/components/custom-drawer-content';
import { CustomDrawerHeader } from '@/components/custom-drawer-header';
import { FiltersModal } from '@/components/filters-modal';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useProvinces, useRoads } from '@/hooks/use-cams';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { JsonCamsRepository } from '@/lib/JsonCamsRepository';
import { useAppStore } from '@/store/use-app-store';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  // Modals state control via Zustand
  const isFiltersModalVisible = useAppStore((state) => state.isFilterModalVisible);
  const setIsFiltersModalVisible = useAppStore((state) => state.setIsFilterModalVisible);

  // We need to fetch basic data for the filters modal here since it's now living in the layout
  const cams = JsonCamsRepository.getInstance();
  const { data: roads = [] } = useRoads(cams);
  const { data: provinces = [] } = useProvinces(cams);

  return (
    <>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          drawerStyle: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          drawerItemStyle: {
            borderRadius: 10,
          },
          header: ({ route, options }) => {
            const title =
              typeof options.headerTitle === 'string'
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : route.name;
            return <CustomDrawerHeader title={title} />;
          },
        }}>
        <Drawer.Screen
          name="index"
          options={{
            title: 'Mis Cámaras',
            drawerLabel: 'Mis Cámaras',
            drawerIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            title: 'Explorar Mapa',
            drawerLabel: 'Explorar',
            drawerIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Drawer>

      {/* Global Filters Modal */}
      <FiltersModal
        visible={isFiltersModalVisible}
        onClose={() => setIsFiltersModalVisible(false)}
        roads={roads}
        provinces={provinces}
        selectedRoad={useAppStore((state) => state.selectedRoad)}
        selectedProvince={useAppStore((state) => state.selectedProvince)}
        onSelectRoad={(road) => useAppStore.getState().setSelectedRoad(road)}
        onSelectProvince={(province) => useAppStore.getState().setSelectedProvince(province)}
      />
    </>
  );
}
