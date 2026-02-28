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

// Custom camera icons (using SVG to match Ionicons 'videocam')
const createCameraIcon = (isSelected: boolean) => {
  const bgColor = isSelected ? '#ef4444' : '#3b82f6';
  const scale = isSelected ? 'transform: scale(1.25); z-index: 10;' : '';
  const html = `<div style="background-color: ${bgColor}; border-radius: 8px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; ${scale}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="white">
      <path d="M482.43 149.33L363.58 203.2c-5.49 2.49-8.91 8.78-8.91 14.86v75.88c0 6.08 3.42 12.37 8.91 14.86l118.85 53.87c12.33 5.59 26.24-2.8 26.24-15.6V164.93c0-12.8-13.91-21.19-26.24-15.6zM292.05 136H59.95C26.9 136 0 162.9 0 195.95v120.1C0 349.1 26.9 376 59.95 376h232.1C325.1 376 352 349.1 352 316.05v-120.1C352 162.9 325.1 136 292.05 136z"/>
    </svg>
  </div>`;

  return L.divIcon({
    html,
    className: '', // pass empty string to avoid default Leaflet icon styles
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });
};

const redIcon = createCameraIcon(true);
const defaultIcon = createCameraIcon(false);

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
