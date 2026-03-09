import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import RNMapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { MapColors } from '@/constants/theme';
import { Cam } from '@/types/cam';

interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

const INITIAL_REGION: Region = {
  latitude: 40.4168,
  longitude: -3.7038,
  latitudeDelta: 5.0,
  longitudeDelta: 5.0,
};

export default function TrafficMapNative({ cams, center, selectedCameraId }: TrafficMapProps) {
  const mapRef = useRef<RNMapView>(null);
  const router = useRouter();
  const isInitialCenter = useRef(true);

  const initialRegion: Region = center
    ? { latitude: center.lat, longitude: center.lon, latitudeDelta: 0.05, longitudeDelta: 0.05 }
    : INITIAL_REGION;

  // The active/selected camera for pseudo-callout
  const [activeCam, setActiveCam] = useState<Cam | null>(null);

  // Sync selectedCameraId prop → activeCam
  useEffect(() => {
    if (!selectedCameraId) {
      setActiveCam(null);
      return;
    }
    const found = cams.find(c => String(c.id) === String(selectedCameraId));
    setActiveCam(found ?? null);
  }, [selectedCameraId, cams]);

  // Animate map when center changes
  useEffect(() => {
    if (!center || !mapRef.current) return;

    if (isInitialCenter.current) {
      mapRef.current.animateToRegion({
        latitude: center.lat,
        longitude: center.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 500);
      isInitialCenter.current = false;
    } else {
      mapRef.current.animateCamera(
        { center: { latitude: center.lat, longitude: center.lon } },
        { duration: 500 }
      );
    }
  }, [center]);

  const handleMarkerPress = (cam: Cam) => {
    setActiveCam(cam);
    router.setParams({
      cameraId: String(cam.id),
      lat: String(cam.latitude),
      lon: String(cam.longitude),
    });
  };

  const validCams = cams.filter(
    c => c.latitude !== undefined && c.longitude !== undefined
  );

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* react-native-map-clustering's MapView — drop-in replacement that handles clustering */}
      <MapView
        ref={mapRef}
        testID="map-clustering"
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        clusterColor={MapColors.clusterBackground}
      >
        {validCams.map(cam => (
          // IMPORTANT: coordinate prop MUST be set directly on Marker (not hidden in a wrapper)
          // so that react-native-map-clustering can detect it as a valid Marker to cluster.
          <Marker
            key={cam.id}
            testID={`map-marker-${cam.id}`}
            coordinate={{ latitude: cam.latitude!, longitude: cam.longitude! }}
            onPress={() => handleMarkerPress(cam)}
          />
        ))}
      </MapView>

      {/* Pseudo-callout overlay — shown above map, avoids Android Callout issues */}
      {activeCam && (
        <View testID="pseudo-callout" style={styles.pseudoCallout}>
          <Text style={styles.calloutTitle}>{activeCam.location}</Text>
          <Text style={styles.calloutSubtitle}>
            {activeCam.road} - Km {activeCam.kilometer}
          </Text>
          <TouchableOpacity
            style={styles.calloutCloseBtn}
            onPress={() => setActiveCam(null)}
          >
            <Text style={styles.calloutCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pseudoCallout: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    flexDirection: 'column',
  },
  calloutTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: MapColors.calloutTitle,
    marginBottom: 2,
    paddingRight: 24,
  },
  calloutSubtitle: {
    fontSize: 13,
    color: MapColors.calloutSubtitle,
  },
  calloutCloseBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    padding: 4,
  },
  calloutCloseText: {
    fontSize: 16,
    color: MapColors.calloutSubtitle,
  },
});
