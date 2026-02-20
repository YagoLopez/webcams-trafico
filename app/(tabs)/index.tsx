import { WebcamsListScreen } from '@/components/webcams-list-screen';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebcamsListScreen />
    </View>
  );
}
