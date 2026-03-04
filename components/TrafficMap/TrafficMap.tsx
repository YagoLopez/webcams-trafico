import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        title={cam.road}
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

      {activeCam && (
        <View style={styles.calloutContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.setParams({ cameraId: '' })}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Image style={styles.calloutImage} source={{ uri: activeCam.imageUrl }} resizeMode="cover" />
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutTitle} numberOfLines={1}>{activeCam.location}</Text>
            <Text style={styles.calloutSubtitle}>{activeCam.road} - Km {activeCam.kilometer}</Text>
            <TouchableOpacity
              style={styles.calloutButton}
              onPress={() => router.push(`/cam/${activeCam.id}`)}
            >
              <Text style={styles.calloutButtonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
  },
  calloutImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#e1e4e8',
    marginBottom: 12,
  },
  calloutInfo: {
    justifyContent: 'space-between',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  calloutSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  calloutButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  calloutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  closeText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  }
});
