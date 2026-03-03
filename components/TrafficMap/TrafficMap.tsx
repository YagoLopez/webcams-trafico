import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Cam } from '@/types/cam';

interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

// A custom Marker wrapper is necessary to toggle tracksViewChanges locally.
// Android custom markers will be invisible if tracksViewChanges is true at the exact moment of mount
// and snapshotting. Toggling it after a short delay or onLayout fixes the missing icons at deep zooms.
const TrackedMarker = React.forwardRef<import('react-native-maps').MapMarker, any>((props, ref) => {
  const [tracksViewChanges, setTracksViewChanges] = React.useState(true);

  // Stop tracking view changes shortly after mount to ensure Android renders the custom icon
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTracksViewChanges(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Marker
      {...props}
      ref={ref}
      tracksViewChanges={tracksViewChanges}
    >
      <View
        className="p-2 rounded-lg border-2 border-white shadow-md bg-blue-500"
        onLayout={() => setTracksViewChanges(false)}
      >
        <Ionicons name="videocam" size={14} color="white" />
      </View>
      {props.children}
    </Marker>
  );
});
TrackedMarker.displayName = 'TrackedMarker';

export default function TrafficMapNative({ cams, center, selectedCameraId }: TrafficMapProps) {
  const mapRef = useRef<any>(null); // react-native-map-clustering doesn't export a perfect type for this, so using 'any' is standard here
  const markerRefs = useRef<Record<string, import('react-native-maps').MapMarker | null>>({});
  const router = useRouter();
  const [activeCameraId, setActiveCameraId] = React.useState<string | undefined>(selectedCameraId);
  const internalCenterUpdateRef = useRef<{ lat: number, lon: number } | null>(null);
  const clickedMarkerIdRef = useRef<string | null>(null);

  useEffect(() => {
    setActiveCameraId(selectedCameraId);
    if (!selectedCameraId) return;

    // If the selection originated from an internal map click, the native 
    // behaviour will show the callout automatically. We don't programmatically 
    // force it because doing so interrupts the native animation on Android and hides it.
    if (clickedMarkerIdRef.current === selectedCameraId) {
      clickedMarkerIdRef.current = null;
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      let attempts = 0;
      intervalId = setInterval(() => {
        const marker = markerRefs.current[selectedCameraId];
        if (marker && marker.showCallout) {
          marker.showCallout();
          clearInterval(intervalId);
        }
        if (++attempts > 10) clearInterval(intervalId);
      }, 200);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [selectedCameraId]);

  useEffect(() => {
    if (center && mapRef.current) {
      if (internalCenterUpdateRef.current) {
        const dx = Math.abs(internalCenterUpdateRef.current.lat - center.lat);
        const dy = Math.abs(internalCenterUpdateRef.current.lon - center.lon);
        internalCenterUpdateRef.current = null;
        if (dx < 0.0001 && dy < 0.0001) {
          return; // Skip animation if triggered by local click
        }
      }

      mapRef.current.animateToRegion({
        latitude: center.lat,
        longitude: center.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 500);
    }
  }, [center]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        ref={mapRef as any}
        style={StyleSheet.absoluteFill}
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
          setActiveCameraId(undefined);
          router.setParams({ cameraId: '' });
        }}
      >
        {cams.map((cam) => {
          const lat = cam.latitude;
          const lon = cam.longitude;
          if (lat === undefined || lon === undefined) return null;

          return (
            <TrackedMarker
              key={cam.id}
              ref={(ref: any) => {
                if (ref) markerRefs.current[cam.id] = ref;
              }}
              coordinate={{ latitude: lat, longitude: lon }}
              title={cam.location}
              anchor={{ x: 0.5, y: 0.5 }}
              calloutAnchor={{ x: 0.5, y: 0.0 }}
              onPress={() => {
                clickedMarkerIdRef.current = cam.id;
                internalCenterUpdateRef.current = (!center || Math.abs(center.lat - lat) > 0.0001 || Math.abs(center.lon - lon) > 0.0001) ? { lat, lon } : null;
                setActiveCameraId(cam.id);
                router.setParams({
                  cameraId: String(cam.id),
                  lat: String(lat),
                  lon: String(lon)
                });
              }}
            >
              <Callout tooltip={true}>
                <View className="bg-white dark:bg-slate-800 p-3 rounded-xl w-64 shadow-xl border border-slate-200 dark:border-slate-700 items-center">
                  <Text className="font-bold text-sm mb-2 text-center text-slate-800 dark:text-white">{cam.location}</Text>

                  <Pressable
                    onPress={() => {
                      router.push({ pathname: '/cam/[id]/gallery', params: { id: cam.id, image: cam.imageUrl } });
                    }}
                    className="w-full active:opacity-80"
                  >
                    <Image
                      source={{ uri: cam.imageUrl }}
                      className="w-full h-[140px] rounded-lg bg-gray-200"
                      contentFit="cover"
                    />
                  </Pressable>

                  <Pressable
                    onPress={() => router.push(`/cam/${cam.id}`)}
                    className="mt-3 bg-blue-500 px-4 py-2.5 rounded-lg w-[90%] items-center active:bg-blue-600 shadow-sm"
                  >
                    <Text className="text-white font-semibold text-sm">Detalle de Cámara</Text>
                  </Pressable>
                </View>
              </Callout>
            </TrackedMarker>
          );
        })}
      </MapView>
    </View>
  );
}
