import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { Cam } from '@/types/cam';

interface TrafficMapProps {
  cams: Cam[];
  center?: { lat: number; lon: number };
  selectedCameraId?: string;
}

export default function TrafficMapNative({ cams, center, selectedCameraId }: TrafficMapProps) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: center?.lat || 40.4168, // Default to Madrid if no center
          longitude: center?.lon || -3.7038,
          latitudeDelta: 5.0,
          longitudeDelta: 5.0,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      />
    </View>
  );
}
