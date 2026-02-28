import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Callout, Marker, UrlTile } from 'react-native-maps';

interface TrafficMapProps {
  cameras: any[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

export default function TrafficMapNative({ cameras, center, selectedCameraId }: TrafficMapProps) {
  const mapRef = useRef<any>(null);
  const markerRefs = useRef<{ [key: string]: any }>({});
  const router = useRouter();
  const [activeCameraId, setActiveCameraId] = React.useState<string | undefined>(selectedCameraId);

  useEffect(() => {
    setActiveCameraId(selectedCameraId);
    if (selectedCameraId) {
      // Wait for any map animation to finish (e.g., center changes take 500ms)
      setTimeout(() => {
        let attempts = 0;
        const interval = setInterval(() => {
          const marker = markerRefs.current[selectedCameraId];
          if (marker && marker.showCallout) {
            marker.showCallout();
            clearInterval(interval);
          }
          if (++attempts > 10) clearInterval(interval); // Give up after 2 seconds
        }, 200);
      }, 500);
    }
  }, [selectedCameraId]);

  useEffect(() => {
    if (center && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: center.lat,
        longitude: center.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 500); // 500ms animation
    }
  }, [center]);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        className="w-full h-full"
        initialRegion={{
          latitude: center?.lat || 40.4168, // Default to Madrid if no center
          longitude: center?.lon || -3.7038,
          latitudeDelta: 5.0,
          longitudeDelta: 5.0,
        }}
        clusterColor="#3b82f6" // Tailwind blue-500
        showsUserLocation={true}
        mapType="none" // Important: Hide default Google/Apple map
        onPress={() => setActiveCameraId(undefined)} // Deselect on map click
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {cameras.map((cam) => {
          if (!cam.latitude || !cam.longitude) return null;
          return (
            <Marker
              key={cam.id}
              ref={(ref) => {
                if (ref) markerRefs.current[cam.id] = ref;
              }}
              coordinate={{ latitude: cam.latitude, longitude: cam.longitude }}
              title={cam.location}
              onPress={() => setActiveCameraId(cam.id)}
            >
              <View className={`p-2 rounded-lg border-2 border-white shadow-md ${cam.id === activeCameraId ? 'bg-red-500 z-10 scale-125' : 'bg-blue-500'}`}>
                <Ionicons name="videocam" size={14} color="white" />
              </View>
              <Callout tooltip>
                <View className="bg-white dark:bg-slate-800 p-3 rounded-xl w-64 shadow-xl border border-slate-200 dark:border-slate-700 items-center">
                  <Text className="font-bold text-sm mb-2 text-center text-slate-800 dark:text-white">{cam.location}</Text>

                  {/* <CalloutSubview> only works on iOS, so for Android the Callout handles presses poorly for multiple buttons.
                      However, wrapping in Pressable or Callout onPress handles the primary action. */}
                  <Pressable
                    onPress={() => {
                      // @ts-ignore - temporary ignore until expo-router regenerates route types
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
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

