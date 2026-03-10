import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler';
import MapViewClustered from 'react-native-map-clustering';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Cam } from '@/types/cam';

interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}
const camIcon = require('@/assets/images/cam-icon4.png');
const selectedCamIcon = require('@/assets/images/cam-icon.png');

export default function TrafficMapNative({ cams, center, selectedCameraId }: TrafficMapProps) {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const [activeCam, setActiveCam] = React.useState<Cam | null>(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 5));

  const panGesture = Gesture.Pan()
    .activeOffsetY([-20, 20])
    .onUpdate((e) => {
      pan.setValue({ x: 0, y: e.translationY });
    })
    .onEnd((e) => {
      if (e.translationY > 100) {
        // Swipe out downwards
        Animated.timing(pan, {
          toValue: { x: 0, y: 500 },
          duration: 200,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            router.setParams({ cameraId: '' });
          }
        });
      } else {
        // Bounce back to center
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    })
    .runOnJS(true);

  useEffect(() => {
    if (selectedCameraId) {
      const cam = cams.find((c) => String(c.id) === String(selectedCameraId));
      if (cam) {
        pan.setValue({ x: 0, y: 0 }); // Reset position when a new camera is selected
        setActiveCam(cam);
      }
    } else {
      setActiveCam(null);
    }
  }, [selectedCameraId, cams, pan]);

  const isInitialCenter = useRef(true);

  useEffect(() => {
    if (center && mapRef.current) {
      if (isInitialCenter.current) {
        mapRef.current.animateToRegion({
          latitude: center.lat,
          longitude: center.lon,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 500);
        isInitialCenter.current = false;
      } else {
        mapRef.current.animateCamera({
          center: {
            latitude: center.lat,
            longitude: center.lon,
          }
        }, { duration: 500 });
      }
    }
  }, [center]);

  // Memoize markers to prevent re-render tearing when clicking
  const markers = React.useMemo(() => cams.map((cam) => {
    const lat = cam.latitude;
    const lon = cam.longitude;
    if (lat === undefined || lon === undefined) return null;

    const isSelected = String(cam.id) === String(selectedCameraId);

    return (
      <Marker
        key={cam.id}
        coordinate={{ latitude: lat, longitude: lon }}
        anchor={{ x: 0.5, y: 0.5 }}
        icon={isSelected ? selectedCamIcon : camIcon}
        tracksViewChanges={false}
        testID={`map-marker-${cam.id}`}
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
  }), [cams, router, selectedCameraId]);

  return (
    <View className="absolute inset-0">
      <MapViewClustered
        ref={mapRef}
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
      >
        {markers}
      </MapViewClustered>

      {activeCam && (
        <GestureDetector gesture={panGesture}>
          <Animated.View
            testID="pseudo-callout"
            className="absolute bottom-10 left-5 right-5 bg-white rounded-xl p-3 shadow-lg elevation-5 flex-col"
            style={{ transform: [{ translateY: pan.y }] }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: '/cam/[id]/gallery', params: { id: activeCam.id, image: activeCam.imageUrl } })}
            >
              <Image className="w-full h-[200px] rounded-lg bg-[#e1e4e8] mb-3" source={{ uri: `${activeCam.imageUrl}?t=${cacheBuster}` }} resizeMode="cover" />
            </TouchableOpacity>
            <View className="justify-between">
              <Text className="text-base font-bold text-[#333] mb-1" numberOfLines={1}>{activeCam.location}</Text>
              <Text className="text-sm text-[#666] mb-2">{activeCam.road} - Km {activeCam.kilometer}</Text>
              <TouchableOpacity
                className="bg-[#3b82f6] py-3 px-3 rounded-md self-start"
                activeOpacity={0.7}
                onPress={() => router.push(`/cam/${activeCam.id}`)}
              >
                <Text className="text-white text-sm font-medium">Ver detalles</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}
