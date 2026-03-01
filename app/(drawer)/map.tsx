import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import TrafficMap from '../../components/TrafficMap';

import { useFilteredCams } from '@/hooks/use-cams';
import { JsonCamsRepository } from '@/lib/JsonCamsRepository';

const camsRepository = JsonCamsRepository.getInstance();

export default function MapScreen() {
  const params = useLocalSearchParams();

  const { data: cameras = [], isLoading: camsLoading } = useFilteredCams(camsRepository, {});

  // We need to fetch basic data for the filters modal here since it's now living in the layout
  const [center, setCenter] = useState<{ lat: number; lon: number } | undefined>();
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    async function initMap() {
      // 1. If routed with params, use those
      if (params.lat && params.lon) {
        setCenter({
          lat: parseFloat(Array.isArray(params.lat) ? params.lat[0] : params.lat),
          lon: parseFloat(Array.isArray(params.lon) ? params.lon[0] : params.lon)
        });
        setLoadingLocation(false);
        return;
      }

      // 2. Otherwise request location and center on user
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setCenter({
            lat: location.coords.latitude,
            lon: location.coords.longitude
          });
        }
      } catch (e) {
        console.log('Error getting location', e);
      } finally {
        setLoadingLocation(false);
      }
    }

    initMap();
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
    <View className="flex-1">
      <TrafficMap cameras={cameras} center={center} selectedCameraId={params.cameraId as string} />
    </View>
  );
}

