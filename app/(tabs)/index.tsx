import { CamListScreen } from '@/components/cam-list-screen';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CamListScreen />
    </View>
  );
}
