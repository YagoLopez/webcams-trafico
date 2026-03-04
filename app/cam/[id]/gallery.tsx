import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Pressable, View } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export default function GalleryScreen() {
  const { image } = useLocalSearchParams<{ image: string | string[] }>();
  const router = useRouter();

  // Asegura que tomamos un string incluso si Expo Router devuelve un array,
  // con lo cual garantizamos el tipado correcto de runtime.
  const imageUrl = Array.isArray(image) ? image[0] : image;

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

      {imageSize ? (
        //@ts-ignore
        <ImageZoom
          cropWidth={screenWidth}
          cropHeight={screenHeight}
          imageWidth={imageSize.width * (screenHeight / imageSize.height)}
          imageHeight={screenHeight}
          onSwipeDown={handleBack}
          enableSwipeDown={true}
          enableCenterFocus={false}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: imageSize.width * (screenHeight / imageSize.height),
              height: screenHeight
            }}
            resizeMode="stretch"
          />
        </ImageZoom>
      ) : (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
}
