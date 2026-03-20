import TrafficMap from '@/components/traffic-map';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFilteredCams } from '@/architecture/infraestructure/use-cams';
import { JsonCamsRepository } from '@/architecture/infraestructure/repositories/JsonCamsRepository';

const camsRepository = JsonCamsRepository.getInstance();

export default function CameraMapScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: cams = [], isLoading: camsLoading } = useFilteredCams(camsRepository, {});

  const [center, setCenter] = useState<{ lat: number; lon: number } | undefined>();
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    async function initMap() {
      if (params.lat && params.lon) {
        setCenter({
          lat: parseFloat(Array.isArray(params.lat) ? params.lat[0] : params.lat),
          lon: parseFloat(Array.isArray(params.lon) ? params.lon[0] : params.lon),
        });
        setLoadingLocation(false);
        return;
      }
      setLoadingLocation(false);
    }
    initMap();
  }, [params.lat, params.lon]);

  if (loadingLocation || camsLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-slate-900">
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-500 dark:text-gray-400">Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Absolute Header with Back Button */}
      <View
        style={{ paddingTop: insets.top, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, pointerEvents: 'box-none' }}
        className="flex-row items-center px-4 py-2"
      >
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-black/60 shadow-md pointer-events-auto active:opacity-80 border border-slate-200 dark:border-slate-800 mt-2"
        >
          <MaterialIcons name="arrow-back" size={24} color="#111418" />
        </Pressable>
      </View>

      <TrafficMap cams={cams} center={center} selectedCameraId={params.cameraId as string} />
    </View>
  );
}
