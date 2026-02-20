import { Text, View } from 'react-native';

export function TailwindExample() {
  return (
    <View className="p-4 bg-teal-500 rounded-lg my-4">
      <Text className="text-white text-lg font-bold">
        NativeWind is working!
      </Text>
      <Text className="text-white">
        This component is styled correctly with Tailwind CSS.
      </Text>
    </View>
  );
}
