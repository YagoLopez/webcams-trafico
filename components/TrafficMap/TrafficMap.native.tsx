import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-map-clustering';
import { UrlTile } from 'react-native-maps';

interface TrafficMapProps {
  cameras: any[];
  center?: { lat: number; lon: number };
}

export default function TrafficMapNative({ cameras, center }: TrafficMapProps) {
  const mapRef = useRef<any>(null);

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
            >
              <View className="bg-blue-500 p-2 rounded-full border-2 border-white shadow-md">
                <Text className="text-white font-bold text-xs">📷</Text>
              </View>
              <Callout>
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
