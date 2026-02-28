import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Leaflet and React-Leaflet imports
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Fix for default Leaflet icon paths in React Native Web/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface TrafficMapProps {
  cameras: any[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

// Custom red icon for the selected camera
const redIcon = new L.Icon({
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultIcon = new L.Icon.Default();

// Component to handle imperative repositioning
function MapController({ center }: { center?: { lat: number; lon: number } }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lon], 15, { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function TrafficMapWebClient({ cameras, center, selectedCameraId }: TrafficMapProps) {
  const defaultCenter = center ? [center.lat, center.lon] : [40.4168, -3.7038];
  const router = useRouter();

  // Use a key derived from center to force re-mounting MapContainer initially 
  // when navigating with coords, because MapContainer's center prop is immutable.
  const mapKey = center ? `${center.lat}-${center.lon}` : 'default-map';

  return (
    <View style={styles.container}>
      <MapContainer
        key={mapKey}
        center={defaultCenter as [number, number]}
        zoom={center ? 15 : 6}
        style={styles.map}
      >
        <MapController center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
        >
          {cameras.map((cam) => {
            if (!cam.latitude || !cam.longitude) return null;
            return (
              <Marker
                key={cam.id}
                position={[cam.latitude, cam.longitude]}
                icon={cam.id === selectedCameraId ? redIcon : defaultIcon}
                zIndexOffset={cam.id === selectedCameraId ? 1000 : 0}
              >
                <Popup>
                  <Pressable onPress={() => router.push(`/cam/${cam.id}`)} style={{ width: 200 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{cam.location}</Text>
                    <Image
                      source={{ uri: cam.imageUrl }}
                      style={{ width: '100%', height: 120, borderRadius: 8 }}
                      contentFit="cover"
                    />
                  </Pressable>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100vh',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
