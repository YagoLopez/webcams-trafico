import React, { Suspense } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface TrafficMapProps {
  cams: any[];
  center?: { lat: number; lon: number };
}

function MapLoadingFallback() {
  return (
    <View className="flex-1 w-full h-screen items-center justify-center bg-slate-100 gap-3">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="text-base text-slate-500 font-medium">Cargando mapa…</Text>
    </View>
  );
}

// React.lazy requires a default export from the dynamic import.
// This ensures that the component (and all its leaflet static imports inside it)
// are NEVER evaluated on the server.
const TrafficMapWebClient = React.lazy(
  () => import('./traffic-map.web.client')
);

export default function TrafficMapWeb(props: TrafficMapProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || typeof window === 'undefined') {
    return <MapLoadingFallback />;
  }

  return (
    <Suspense fallback={<MapLoadingFallback />}>
      <TrafficMapWebClient {...props} />
    </Suspense>
  );
}

