import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Pressable, View } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

// Fix para el error de TypeScript en React 18+ donde 'children' no está definido en los props.
const ImageZoomTyped = ImageZoom as unknown as React.ComponentType<
  React.ComponentProps<typeof ImageZoom> & { children?: React.ReactNode }
>;


const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export default function GalleryScreen() {
  const { image } = useLocalSearchParams<{ image: string | string[] }>();
  const router = useRouter();

  // Asegura que tomamos un string incluso si Expo Router devuelve un array,
  // con lo cual garantizamos el tipado correcto de runtime.
  const rawImageUrl = Array.isArray(image) ? image[0] : image;
  const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 5));
  const imageUrl = rawImageUrl ? `${rawImageUrl}?t=${cacheBuster}` : undefined;

  // Estado para las dimensiones reales de la imagen
  const [imageSize, setImageSize] = useState<{ width: number, height: number } | null>(null);

  React.useEffect(() => {
    if (imageUrl) {
      Image.getSize(imageUrl, (width, height) => {
        setImageSize({ width, height });
      }, () => {
        // En caso de error, asume un tamaño cuadrado u otra lógica de fallo segura
        setImageSize({ width: screenWidth, height: screenWidth });
      });
    }
  }, [imageUrl]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('../');
    }
  }, [router]);

  const renderHeader = (
    <View className="absolute z-50 top-12 right-6">
      <Pressable
        onPress={handleBack}
        className="p-2 bg-black/50 rounded-full"
        accessibilityLabel="Close gallery"
      >
        <MaterialIcons name="close" size={28} color="white" />
      </Pressable>
    </View>
  );

  if (!imageUrl) {
    return null; // Should not happen in normal flow
  }

  const calculatedImageWidth = imageSize ? imageSize.width * (screenHeight / imageSize.height) : 0;

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          animation: 'fade'
        }}
      />

      {renderHeader}

      {imageSize ? (() => {
        const imageDisplayHeight = screenHeight * 0.6;
        const imageDisplayWidth = imageSize.width * (imageDisplayHeight / imageSize.height);
        return (
          <ImageZoomTyped
            cropWidth={screenWidth}
            cropHeight={screenHeight}
            imageWidth={imageDisplayWidth}
            imageHeight={imageDisplayHeight}
            onSwipeDown={handleBack}
            enableSwipeDown={true}
            enableCenterFocus={false}
          >
            <Image
              source={{ uri: imageUrl }}
              style={{ width: imageDisplayWidth, height: imageDisplayHeight }}
              resizeMode="stretch"
            />
          </ImageZoomTyped>
        );
      })() : (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
}
