import React, { Suspense } from 'react';
import { View } from 'react-native';

interface TrafficMapProps {
  cameras: any[];
  center?: { lat: number; lon: number };
}

// React.lazy requires a default export from the dynamic import.
// This ensures that the component (and all its leaflet static imports inside it) 
// are NEVER evaluated on the server.
const TrafficMapWebClient = React.lazy(
  () => import('./TrafficMap.web.client')
);

export default function TrafficMapWeb(props: TrafficMapProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || typeof window === 'undefined') {
    return <View className="flex-1 w-full h-screen" />;
  }

  return (
    <Suspense fallback={<View className="flex-1 w-full h-screen" />}>
      <TrafficMapWebClient {...props} />
    </Suspense>
  );
}

