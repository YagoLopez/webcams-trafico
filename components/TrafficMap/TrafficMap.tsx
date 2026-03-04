import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Cam } from '@/types/cam';

interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

const camIcon = require('@/assets/images/cam-icon4.png');

export default function TrafficMapNative({ cams, center, selectedCameraId }: TrafficMapProps) {
  const mapRef = useRef<any>(null);
  const router = useRouter();

  const [activeCam, setActiveCam] = React.useState<Cam | null>(null);

  useEffect(() => {
    if (selectedCameraId) {
      const cam = cams.find((c) => String(c.id) === String(selectedCameraId));
      if (cam) {
        setActiveCam(cam);
      }
    } else {
      setActiveCam(null);
    }
  }, [selectedCameraId, cams]);

  useEffect(() => {
    if (center && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: center.lat,
        longitude: center.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 500);
    }
  }, [center]);

  // Memoize markers to prevent re-render tearing when clicking
  const markers = React.useMemo(() => cams.map((cam) => {
    const lat = cam.latitude;
    const lon = cam.longitude;
    if (lat === undefined || lon === undefined) return null;

    return (
      <Marker
        key={cam.id}
        coordinate={{ latitude: lat, longitude: lon }}
        anchor={{ x: 0.5, y: 0.5 }}
        icon={camIcon}
        tracksViewChanges={false}
        onPress={(e) => {
          e.stopPropagation();
          router.setParams({
            cameraId: String(cam.id),
            lat: String(lat),
            lon: String(lon)
          });
        }}
      />
    );
  }), [cams, router]);

  return (
    <View className="absolute inset-0">
      <MapView
        ref={mapRef as any}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: center?.lat || 40.4168,
          longitude: center?.lon || -3.7038,
          latitudeDelta: center ? 0.05 : 5.0,
          longitudeDelta: center ? 0.05 : 5.0,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        clusterColor="#3b82f6"
        spiralEnabled={false}
        onPress={() => {
          if (activeCam) {
            router.setParams({ cameraId: '' });
          }
        }}
        onPanDrag={() => {
          if (activeCam) {
            router.setParams({ cameraId: '' });
          }
        }}
        onRegionChange={(region, details) => {
          if (activeCam && details?.isGesture) {
            router.setParams({ cameraId: '' });
          }
        }}
      >
        {markers}
      </MapView>

      {activeCam && (
        <View className="absolute top-10 left-5 right-5 bg-white rounded-xl p-3 shadow-lg elevation-5 flex-col">
          <Pressable
            className="absolute -top-2 -right-2 z-10 bg-white rounded-full w-6 h-6 items-center justify-center shadow-sm elevation-2 active:opacity-70"
            onPress={() => router.setParams({ cameraId: '' })}
          >
            <Text className="text-[12px] text-[#333] font-bold">✕</Text>
          </Pressable>

          <Pressable
            className="active:opacity-70"
            onPress={() => router.push({ pathname: '/cam/[id]/gallery', params: { id: activeCam.id, image: activeCam.imageUrl } })}
          >
            <Image className="w-full h-[200px] rounded-lg bg-[#e1e4e8] mb-3" source={{ uri: activeCam.imageUrl }} resizeMode="cover" />
          </Pressable>
          <View className="justify-between">
            <Text className="text-base font-bold text-[#333] mb-1" numberOfLines={1}>{activeCam.location}</Text>
            <Text className="text-sm text-[#666] mb-2">{activeCam.road} - Km {activeCam.kilometer}</Text>
            <Pressable
              className="bg-[#3b82f6] py-1.5 px-3 rounded-md self-start active:opacity-70"
              onPress={() => router.push(`/cam/${activeCam.id}`)}
            >
              <Text className="text-white text-sm font-medium">Ver detalles</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
