import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function GalleryScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const router = useRouter();

  if (!url) {
    return null; // Should not happen in normal flow
  }

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          animation: 'fade'
        }}
      />

      <ImageViewer
        imageUrls={[{ url }]}
        onSwipeDown={() => router.back()}
        enableSwipeDown={true}
        renderIndicator={() => <View />} // Hide image 1/1 counter
        renderHeader={() => (
          <Pressable
            onPress={() => router.back()}
            className="absolute z-50 top-12 right-6 p-2 bg-black/50 rounded-full"
            accessibilityLabel="Close gallery"
          >
            <MaterialIcons name="close" size={28} color="white" />
          </Pressable>
        )}
      />
    </View>
  );
}
