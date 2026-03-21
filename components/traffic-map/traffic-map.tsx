import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import MapViewClustered from 'react-native-map-clustering';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Cam } from '@/architecture/domain/entities/Cam';
import { JsonCamsRepository } from '@/architecture/infrastructure/repositories/JsonCamsRepository';
import { useNextCam, usePrevCam } from '@/architecture/infrastructure/use-cams';
import { formatKilometer } from '@/architecture/infrastructure/utils/formatters';


interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
  /** Delta used when animating to `center`. Smaller = more zoomed-in. Default: 0.05 */
  centerDelta?: number;
}
const camIcon = require('@/assets/images/cam-icon4.png');
const selectedCamIcon = require('@/assets/images/cam-icon7.png');
const camsRepository = JsonCamsRepository.getInstance();

export default function TrafficMapNative({ cams, center, selectedCameraId, centerDelta = 0.05 }: TrafficMapProps) {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const activeCam = React.useMemo(() => {
    if (!selectedCameraId) return null;
    return cams.find((c) => String(c.id) === String(selectedCameraId)) || null;
  }, [selectedCameraId, cams]);


  const { data: nextCam } = useNextCam(camsRepository, activeCam);
  const { data: prevCam } = usePrevCam(camsRepository, activeCam);

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
    if (selectedCameraId && activeCam) {
      pan.setValue({ x: 0, y: 500 }); // Start off-screen from below

      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        bounciness: 4,
        speed: 12,
      }).start();
    }
  }, [selectedCameraId, activeCam, pan]);

  const isInitialCenter = useRef(true);

  useEffect(() => {
    if (center && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: center.lat,
        longitude: center.lon,
        latitudeDelta: centerDelta,
        longitudeDelta: centerDelta,
      }, 600);

      if (isInitialCenter.current) {
        isInitialCenter.current = false;
      }
    }
  }, [center, centerDelta]);

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
        moveOnMarkerPress={false}
        maxZoom={14}
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
            <Pressable
              className="active:opacity-70"
              onPress={() => router.push({ pathname: '/cam/[id]/gallery', params: { id: activeCam.id, image: activeCam.imageUrl } })}
            >
              <Image className="w-full h-[200px] rounded-lg bg-[#e1e4e8] mb-3" source={{ uri: `${activeCam.imageUrl}?t=${cacheBuster}` }} resizeMode="cover" />
            </Pressable>
            <View className="justify-between">
              <Text className="text-base font-bold text-[#333] mb-1" numberOfLines={1}>{activeCam.location}</Text>
              <Text className="text-sm text-[#666] mb-2">{activeCam.roadName} - {formatKilometer(activeCam.kilometer)}</Text>
              <View className="flex-row mt-2 gap-1.5">
                <Pressable
                  className={`flex-1 bg-[#137fec] py-3 rounded-lg active:opacity-70 ${!prevCam ? 'opacity-35' : ''}`}
                  disabled={!prevCam}
                  onPress={() => {
                    if (!prevCam) return;
                    mapRef.current?.animateToRegion({
                      latitude: prevCam.latitude!,
                      longitude: prevCam.longitude!,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }, 500);
                    router.setParams({ cameraId: String(prevCam.id) });
                  }}
                >
                  <Text className="color-white text-sm font-bold text-center">
                    ← Anterior
                  </Text>
                </Pressable>

                <Pressable
                  className="flex-1 bg-[#137fec] py-3 rounded-lg active:opacity-70"
                  onPress={() => router.push(`/cam/${activeCam.id}`)}
                >
                  <Text className="color-white text-[13px] font-bold text-center">
                    Ver detalles
                  </Text>
                </Pressable>

                <Pressable
                  className={`flex-1 bg-[#137fec] py-3 rounded-lg active:opacity-70 ${!nextCam ? 'opacity-35' : ''}`}
                  disabled={!nextCam}
                  onPress={() => {
                    if (!nextCam) return;
                    mapRef.current?.animateToRegion({
                      latitude: nextCam.latitude!,
                      longitude: nextCam.longitude!,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }, 500);
                    router.setParams({ cameraId: String(nextCam.id) });
                  }}
                >
                  <Text className="color-white text-sm font-bold text-center">
                    Siguiente →
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}
