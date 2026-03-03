import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Cam } from '@/types/cam';

interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

const camIcon = require('@/assets/images/cam-icon.png');

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
        title={cam.location}
        anchor={{ x: 0.5, y: 0.5 }}
        icon={camIcon}
        tracksViewChanges={false}
        onPress={(e) => {
          e.stopPropagation();
          // Set selection explicitly in route instead of using native Callout
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
          if (activeCam) {
            router.setParams({ cameraId: '' });
          }
        }}
      >
        {markers}
      </MapView>

    </View>
  );
}
