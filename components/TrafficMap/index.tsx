import React from 'react';
import { Platform } from 'react-native';

interface TrafficMapProps {
  cameras: any[];
  center?: { lat: number; lon: number };
}

let TrafficMapComponent: React.FC<TrafficMapProps>;

if (Platform.OS === 'web') {
  TrafficMapComponent = require('./TrafficMap.web').default;
} else {
  TrafficMapComponent = require('./TrafficMap.native').default;
}

export default TrafficMapComponent;
