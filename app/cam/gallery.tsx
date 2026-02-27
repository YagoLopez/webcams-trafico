import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function GalleryScreen() {
  const { url } = useLocalSearchParams<{ url: string | string[] }>();
  const router = useRouter();

  // Asegura que tomamos un string incluso si Expo Router devuelve un array,
  // con lo cual garantizamos el tipado correcto de runtime para ImageViewer.
  const imageUrl = Array.isArray(url) ? url[0] : url;

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);

  const renderIndicator = useCallback(() => <View />, []);

  const renderHeader = useCallback(
    () => (
      <Pressable
        onPress={handleBack}
        className="absolute z-50 top-12 right-6 p-2 bg-black/50 rounded-full"
        accessibilityLabel="Close gallery"
      >
        <MaterialIcons name="close" size={28} color="white" />
      </Pressable>
    ),
    [handleBack]
  );

  const images = useMemo(() => {
    return imageUrl ? [{ url: imageUrl }] : [];
  }, [imageUrl]);

  if (!imageUrl) {
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
        imageUrls={images}
        onSwipeDown={handleBack}
        enableSwipeDown={true}
        renderIndicator={renderIndicator} // Hide image 1/1 counter
        renderHeader={renderHeader}
      />
    </View>
  );
}
