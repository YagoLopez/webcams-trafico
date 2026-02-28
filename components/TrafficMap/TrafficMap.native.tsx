import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Callout, Marker, UrlTile } from 'react-native-maps';

interface TrafficMapProps {
  cameras: any[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

export default function TrafficMapNative({ cameras, center, selectedCameraId }: TrafficMapProps) {
  const mapRef = useRef<any>(null);
  const router = useRouter();
  const [activeCameraId, setActiveCameraId] = React.useState<string | undefined>(selectedCameraId);

  useEffect(() => {
    setActiveCameraId(selectedCameraId);
  }, [selectedCameraId]);

  useEffect(() => {
    if (center && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: center.lat,
        longitude: center.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  }, [center]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
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
              coordinate={{ latitude: cam.latitude, longitude: cam.longitude }}
              title={cam.location}
              onPress={() => setActiveCameraId(cam.id)}
            >
              <View className={`p-2 rounded-lg border-2 border-white shadow-md ${cam.id === activeCameraId ? 'bg-red-500 z-10 scale-125' : 'bg-blue-500'}`}>
                <Ionicons name="videocam" size={14} color="white" />
              </View>
              <Callout onPress={() => router.push(`/cam/${cam.id}`)}>
                <View className="p-2 w-48">
                  <Text className="font-bold mb-1">{cam.location}</Text>
                  <Image
                    source={{ uri: cam.imageUrl }}
                    style={{ width: '100%', height: 100, borderRadius: 8 }}
                    contentFit="cover"
                  />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
