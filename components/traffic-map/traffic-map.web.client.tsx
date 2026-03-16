import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

// Leaflet and React-Leaflet imports
import { formatKilometer } from '@/lib/utils/formatters';
import { Cam } from '@/domain/entities/cam';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

const DURATION = 1;

const SELECTED_CAMERA_COLOR = '#ae00ffff';
const CLUSTER_BG_COLOR = '#1e3a8a';

// Fix for default Leaflet icon paths in React Native Web/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

interface MarkerCluster {
  getChildCount: () => number;
}

// Custom camera icons (using SVG to match Ionicons 'videocam')
const createCameraIcon = (isSelected: boolean) => {
  const bgColor = isSelected ? SELECTED_CAMERA_COLOR : '#3b82f6';
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

const selectedIcon = createCameraIcon(true);
const defaultIcon = createCameraIcon(false);

// Component to handle imperative repositioning
function MapController({ center, internalCenterUpdateRef }: { center?: { lat: number; lon: number }, internalCenterUpdateRef: React.MutableRefObject<{ lat: number, lon: number } | null> }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      if (internalCenterUpdateRef.current) {
        const dx = Math.abs(internalCenterUpdateRef.current.lat - center.lat);
        const dy = Math.abs(internalCenterUpdateRef.current.lon - center.lon);
        internalCenterUpdateRef.current = null;
        if (dx < 0.0001 && dy < 0.0001) {
          return; // Skip animation
        }
      }
      map.setView([center.lat, center.lon], 15, { animate: true });
    }
  }, [center, map, internalCenterUpdateRef]);
  return null;
}

// Component to handle map clicks for deselecting cameras
function MapEvents({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({
    click: () => onMapClick(),
  });
  return null;
}

export default function TrafficMapWebClient({ cams, center, selectedCameraId }: TrafficMapProps) {
  const defaultCenter = center ? [center.lat, center.lon] : [40.4168, -3.7038];
  const router = useRouter();
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});
  const [activeCameraId, setActiveCameraId] = React.useState<string | undefined>(selectedCameraId);
  const internalCenterUpdateRef = useRef<{ lat: number, lon: number } | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 5));

  useEffect(() => {
    setActiveCameraId(selectedCameraId);
    if (selectedCameraId) {
      // The MarkerClusterGroup might take a moment to render the marker if it was clustered
      let attempts = 0;
      const interval = setInterval(() => {
        const marker = markerRefs.current[selectedCameraId];
        if (marker) {
          if (marker.openPopup) {
            marker.openPopup();
            clearInterval(interval);
          } else if ((marker as any)._map) { // Internal Leaflet check if marker is on map
            marker.openPopup();
            clearInterval(interval);
          }
        }
        if (++attempts > 20) clearInterval(interval); // Give up after 4 seconds
      }, 200);

      return () => clearInterval(interval);
    }
  }, [selectedCameraId]);

  const iconCreateFunction = React.useCallback((cluster: MarkerCluster) => {
    const count = cluster.getChildCount();
    return L.divIcon({
      html: `<div style="background-color: ${CLUSTER_BG_COLOR}; border-radius: 50%; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; border: 2px solid white; box-shadow: 0 0 0 3px ${CLUSTER_BG_COLOR}, 0 0 0 5px white, 0 4px 6px 4px rgba(0,0,0,0.3); box-sizing: border-box;">${count}</div>`,
      className: '',
      iconSize: [46, 46],
    });
  }, []);

  return (
    <View className="flex-1 w-full h-screen">
      <MapContainer
        center={defaultCenter as [number, number]}
        zoom={center ? 15 : 6}
        className="w-full h-full"
        ref={mapRef}
      >
        <MapController center={center} internalCenterUpdateRef={internalCenterUpdateRef} />

        <MapEvents onMapClick={() => {
          if (activeCameraId && markerRefs.current[activeCameraId]) {
            markerRefs.current[activeCameraId].closePopup();
          }
          setActiveCameraId(undefined);
          router.setParams({ cameraId: '' });
        }} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={false}
          iconCreateFunction={iconCreateFunction}
        >
          {cams.map((cam) => {
            const lat = cam.latitude;
            const lon = cam.longitude;
            if (lat === undefined || lon === undefined) return null;

            return (
              <Marker
                key={cam.id}
                ref={(ref) => {
                  markerRefs.current[cam.id] = ref;
                }}
                position={[lat, lon]}
                icon={cam.id === activeCameraId ? selectedIcon : defaultIcon}
                zIndexOffset={cam.id === activeCameraId ? 1000 : 0}
                eventHandlers={{
                  click: () => {
                    const map = mapRef.current;
                    const currentZoom = map?.getZoom() ?? 15;
                    internalCenterUpdateRef.current = (!center || Math.abs(center.lat - lat) > 0.0001 || Math.abs(center.lon - lon) > 0.0001) ? { lat, lon } : null;
                    map?.flyTo([lat, lon], currentZoom, { animate: true, duration: DURATION });
                    setActiveCameraId(cam.id);
                    router.setParams({
                      cameraId: String(cam.id),
                      lat: String(lat),
                      lon: String(lon)
                    });
                  }
                }}
              >
                <Popup closeButton={true} autoPan={false}>
                  <View className="flex-row justify-center mt-2 px-1">
                    <Text className="font-bold text-xs">{cam.roadName}</Text>
                    <Text className="text-gray-600 text-xs"> - {formatKilometer(cam.kilometer)}</Text>
                  </View>

                  <View className="w-[240px] p-1">
                    <Pressable
                      onPress={() => {
                        router.push({ pathname: '/cam/[id]/gallery', params: { id: cam.id, image: cam.imageUrl } });
                      }}
                      className="w-full active:opacity-80 cursor-pointer"
                    >
                      <Image
                        source={{ uri: `${cam.imageUrl}?t=${cacheBuster}` }}
                        className="w-full h-[140px] rounded-lg bg-gray-200"
                        contentFit="cover"
                      />
                    </Pressable>

                    <Pressable
                      onPress={() => router.push(`/cam/${cam.id}`)}
                      className="mt-2 bg-blue-500 px-4 py-2.5 rounded-lg w-full items-center active:bg-blue-600 shadow-md cursor-pointer"
                    >
                      <Text className="text-white font-semibold text-sm">Datos de Cámara</Text>
                    </Pressable>

                  </View>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </View>
  );
}

