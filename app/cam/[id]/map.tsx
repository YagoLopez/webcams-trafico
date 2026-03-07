import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import TrafficMap from '@/components/traffic-map';
import { MapColors } from '@/constants/theme';
import { useCamById, useFilteredCams } from '@/hooks/use-cams';
import { JsonCamsRepository } from '@/lib/JsonCamsRepository';

const camsRepository = JsonCamsRepository.getInstance();

export default function CameraMapScreen() {
  const params = useLocalSearchParams<{ id: string; lat: string; lon: string; cameraId: string }>();
  // Fetch camera details for the header title
  const { data: cam } = useCamById(camsRepository, params.id);
  // We need to fetch all cameras so the map can render them
  const { data: cams = [], isLoading: camsLoading } = useFilteredCams(camsRepository, {});

  // Derive numeric coordinates from URL params; guard against missing/invalid values
  const lat = parseFloat(params.lat);
  const lon = parseFloat(params.lon);

  // Memoize center so the map's useEffect only fires when the actual values change
  const center = useMemo(
    () => (!isNaN(lat) && !isNaN(lon) ? { lat, lon } : undefined),
    [lat, lon]
  );

  if (camsLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={MapColors.loadingSpinner} />
        <Text className="mt-4 text-gray-500">Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mapa de Webcams',
          headerStyle: { backgroundColor: '#137fec' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'light' }
        }}
      />
      <TrafficMap cams={cams} center={center} selectedCameraId={params.cameraId} />
    </View>
  );
}
