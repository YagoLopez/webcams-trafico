import { useProvinces, useRoads } from '@/architecture/infraestructure/use-cams';
import { CustomDrawerContent } from '@/components/custom-drawer-content';
import { CustomDrawerHeader } from '@/components/custom-drawer-header';
import { FiltersModal } from '@/components/filters-modal';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { JsonCamsRepository } from '@/architecture/infraestructure/repositories/JsonCamsRepository';
import { useAppStore } from '@/store/use-app-store';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Dimensions } from 'react-native';

const cams = JsonCamsRepository.getInstance();

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  // Modals state control via Zustand
  const isFiltersModalVisible = useAppStore((state) => state.isFilterModalVisible);
  const setIsFiltersModalVisible = useAppStore((state) => state.setIsFilterModalVisible);

  // We need to fetch basic data for the filters modal here since it's now living in the layout
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
          swipeEnabled: false,
          swipeEdgeWidth: Dimensions.get('window').width, // Allows swiping from ANYWHERE on the screen
          header: ({ route, options }) => {
            const title =
              typeof options.headerTitle === 'string'
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : route.name;
            const showFiltersButton = true;
            return <CustomDrawerHeader title={title} showFiltersButton={showFiltersButton} />;
          },
        }}>
        <Drawer.Screen
          name="index"
          options={{
            title: 'Listado Cámaras',
            drawerLabel: 'Listado Cámaras',
            drawerIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
          }}
        />
        <Drawer.Screen
          name="map"
          options={{
            title: 'Mapa de Cámaras',
            drawerLabel: 'Mapa de Cámaras',
            drawerIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
          }}
        />
        <Drawer.Screen
          name="nearby-cam"
          options={{
            title: 'Cámara cercana',
            drawerLabel: 'Cámara cercana',
            drawerIcon: ({ color }) => <IconSymbol size={28} name="location.fill" color={color} />,
          }}
        />
      </Drawer>

      {/* Global Filters Modal */}
      <FiltersModal
        visible={isFiltersModalVisible}
        onClose={() => setIsFiltersModalVisible(false)}
        roads={roads}
        provinces={provinces}
        selectedRoadName={useAppStore((state) => state.selectedRoadName)}
        selectedProvince={useAppStore((state) => state.selectedProvince)}
        onSelectRoadName={useAppStore.getState().setSelectedRoadName}
        onSelectProvince={useAppStore.getState().setSelectedProvince}
      />
    </>
  );
}
