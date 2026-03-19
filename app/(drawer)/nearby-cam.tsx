import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import TrafficMap from '@/components/traffic-map';
import { ICamsRepository } from '@/lib/ICamsRepository';
import { JsonCamsRepository } from '@/lib/JsonCamsRepository';
import { haversineDistance } from '@/lib/utils/haversine';
import { useAppStore } from '@/store/use-app-store';
import { Cam } from '@/architecture/domain/entities/cam';

const camsRepository = JsonCamsRepository.getInstance();

export default function NearbyCamScreen() {
  const selectedRoad = useAppStore((state) => state.selectedRoadName);
  const setSelectedRoadName = useAppStore((state) => state.setSelectedRoadName);

  const { cameraId: routeCameraId } = useLocalSearchParams<{ cameraId?: string }>();

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Results state
  const [filteredCams, setFilteredCams] = useState<Cam[]>([]);
  const [nearestCamId, setNearestCamId] = useState<string | null>(null);
  const [nearestCamCenter, setNearestCamCenter] = useState<{ lat: number; lon: number } | undefined>();
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | undefined>();


  // Selected camera: driven by local state to avoid nearestCamId re-opening
  // the callout after the user dismisses it.
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(undefined);
  // Track the previous routeCameraId so we can detect a dismiss ('' after a value)
  const prevRouteCameraId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const current = routeCameraId || undefined;
    const prev = prevRouteCameraId.current;

    if (current) {
      // User tapped a marker → show that camera
      setSelectedCameraId(current);

      // Center map on the tapped camera
      const tappedCam = filteredCams.find((c) => String(c.id) === String(current));
      if (tappedCam?.latitude != null && tappedCam?.longitude != null) {
        setNearestCamCenter({ lat: tappedCam.latitude, lon: tappedCam.longitude });
      }
    } else if (prev) {
      // routeCameraId just became empty: user dismissed the callout → clear
      setSelectedCameraId(undefined);
    }

    prevRouteCameraId.current = current;
  }, [routeCameraId, filteredCams]);

  // Fetch initial user location on mount
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      } catch (e) {
        console.log('Error fetching initial position', e);
      }
    })();
  }, []);

  const handleSearch = useCallback(async () => {
    if (!selectedRoad) return;

    setSearching(true);
    setError(null);

    try {
      // 1. Request GPS permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Se necesita permiso de ubicación para encontrar la cámara más cercana.');
        setSearching(false);
        return;
      }

      // 2. Get current position
      const location = await Location.getCurrentPositionAsync({});
      const userLat = location.coords.latitude;
      const userLon = location.coords.longitude;

      // 3. Filter cameras by selected road
      const result = await (camsRepository as ICamsRepository).getFilteredCams({ roadName: selectedRoad });
      const roadCams = result.data;

      if (roadCams.length === 0) {
        setError(`No se encontraron cámaras en la carretera ${selectedRoad}.`);
        setSearching(false);
        return;
      }

      // 4. Find nearest camera using Haversine
      let minDistance = Infinity;
      let nearestId: string | null = null;

      for (const cam of roadCams) {
        if (cam.latitude == null || cam.longitude == null) continue;
        const dist = haversineDistance(userLat, userLon, cam.latitude, cam.longitude);
        if (dist < minDistance) {
          minDistance = dist;
          nearestId = cam.id;
        }
      }

      // 5. Set results
      setFilteredCams(roadCams);
      setNearestCamId(nearestId);

      // Open callout for the nearest camera right after a search
      if (nearestId) setSelectedCameraId(nearestId);

      // Center map on nearest camera (not just user GPS point)
      const nearestCam = nearestId ? roadCams.find((c) => String(c.id) === String(nearestId)) : null;
      if (nearestCam?.latitude != null && nearestCam?.longitude != null) {
        setNearestCamCenter({ lat: nearestCam.latitude, lon: nearestCam.longitude });
      } else {
        setNearestCamCenter({ lat: userLat, lon: userLon });
      }
    } catch (e) {
      console.log('Error finding nearest camera', e);
      setError('Error al obtener la ubicación. Inténtalo de nuevo.');
    } finally {
      setSearching(false);
    }
  }, [selectedRoad]);

  const handleReset = useCallback(() => {
    setSelectedRoadName(null);
    setFilteredCams([]);
    setNearestCamId(null);
    setNearestCamCenter(undefined);
    setError(null);
    setSelectedCameraId(undefined);
  }, [setSelectedRoadName]);

  const showMap = (filteredCams.length > 0 && nearestCamId && nearestCamCenter) || !!userLocation;

  return (
    <View className="flex-1 bg-white dark:bg-background-dark">
      {/* Top action panel */}
      <View className="px-4 pt-4 pb-3 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-700">
        {/* Active road filter indicator */}
        {selectedRoad && (
          <View className="flex-row items-center mb-3 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <MaterialIcons name="filter-list" size={18} color="#137fec" />
            <Text className="ml-2 flex-1 text-sm font-medium text-[#137fec] dark:text-blue-400">
              Carretera: {selectedRoad}
            </Text>
          </View>
        )}

        <View className="flex-row space-x-2">
          <Pressable
            testID="search-nearest-btn"
            onPress={handleSearch}
            disabled={!selectedRoad || searching}
            className={`flex-1 py-4 rounded-xl items-center ${selectedRoad && !searching
                ? 'bg-[#137fec] active:opacity-80'
                : 'bg-slate-300 dark:bg-slate-700'
              }`}
          >
            {searching ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-bold text-base">Buscar cámara cercana</Text>
            )}
          </Pressable>

          {selectedRoad && (
            <Pressable
              testID="reset-filter-btn"
              onPress={handleReset}
              className="px-4 py-4 bg-slate-100 dark:bg-slate-800 rounded-xl items-center justify-center active:opacity-70 border border-slate-200 dark:border-slate-700"
            >
              <MaterialIcons name="refresh" size={24} color="#64748b" />
            </Pressable>
          )}
        </View>

        {error && (
          <View className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <Text className="text-sm text-red-600 dark:text-red-400">{error}</Text>
          </View>
        )}
      </View>

      {/* Map area */}
      <View className="flex-1">
        {showMap ? (
          <TrafficMap
            cams={filteredCams}
            center={nearestCamCenter || userLocation}
            selectedCameraId={selectedCameraId}
            centerDelta={nearestCamCenter ? 0.008 : 0.05}
          />
        ) : (
          <View className="flex-1 justify-center items-center px-6">
            <ActivityIndicator size="large" color="#137fec" />
            <Text className="mt-4 text-slate-400 dark:text-slate-500 text-center">
              Obteniendo tu ubicación...
            </Text>
          </View>
        )}

      </View>
    </View>
  );
}
