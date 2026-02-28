import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

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
    return <View style={styles.container} />;
  }

  return (
    <Suspense fallback={<View style={styles.container} />}>
      <TrafficMapWebClient {...props} />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100vh',
  },
});
