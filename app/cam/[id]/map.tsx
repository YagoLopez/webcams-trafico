import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import TrafficMap from '../../../components/traffic-map';
import { useFilteredCams } from '@/hooks/use-cams';
import { JsonCamsRepository } from '@/lib/JsonCamsRepository';

const camsRepository = JsonCamsRepository.getInstance();

export default function CameraMapScreen() {
  const params = useLocalSearchParams();
  
  // We need to fetch all cameras so the map can render them
  const { data: cams = [], isLoading: camsLoading } = useFilteredCams(camsRepository, {});

  const [center, setCenter] = useState<{ lat: number; lon: number } | undefined>();
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    // If we have lat and lon from params, set the center
    if (params.lat && params.lon) {
      setCenter({
        lat: parseFloat(Array.isArray(params.lat) ? params.lat[0] : params.lat),
        lon: parseFloat(Array.isArray(params.lon) ? params.lon[0] : params.lon)
      });
    }
    setLoadingLocation(false);
  }, [params.lat, params.lon]);

  if (loadingLocation || camsLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-500">Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TrafficMap cams={cams} center={center} selectedCameraId={params.cameraId as string} />
    </View>
  );
}
