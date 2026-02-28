import { useCamById } from '@/hooks/use-cams';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { JsonCamsRepository } from '@/lib/JsonCamsRepository';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CamDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const camsRepository = JsonCamsRepository.getInstance();
  const { data: cam, isLoading } = useCamById(camsRepository, id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  if (!cam) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <Stack.Screen options={{ headerShown: true, title: 'Error' }} />
        <Text className="text-lg text-[#111418] dark:text-white">Camera not found</Text>
        <Pressable onPress={() => router.back()} className="mt-4 px-4 py-2 bg-primary rounded-lg">
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const isOffline = cam.status === 'offline';

  return (
    <View className="flex-1 bg-white dark:bg-background-dark">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Header */}
      <View
        style={{ paddingTop: insets.top }}
        className="flex-row items-center gap-2 px-4 h-[70px] bg-primary z-10 shadow-md"
      >
        <Pressable
          onPress={() => router.back()}
          className="h-16 w-10 -ml-2 items-center justify-center rounded-full active:bg-white/20"
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold text-white">
          Webcam Detail
        </Text>
      </View>

      <ScrollView className="flex-1 w-full md:w-[60%] mx-auto" contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Image Container */}
        <View className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 mb-4">
          {isOffline ? (
            <View className="flex-1 items-center justify-center">
              <MaterialIcons name="videocam-off" size={64} color="#cbd5e1" />
            </View>
          ) : (
            <Pressable onPress={() => {
              // @ts-ignore - temporary ignore until expo-router regenerates route types for /cam/[id]/gallery
              router.push({ pathname: '/cam/[id]/gallery', params: { id: cam.id, image: cam.imageUrl } });
            }} className="flex-1" accessibilityLabel="Open gallery">
              <Image
                source={{ uri: cam.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </Pressable>
          )}

          {/* Live Badge */}
          <View className="absolute bottom-3 left-3 flex-row items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
            <View className={`h-2.5 w-2.5 rounded-full ${isOffline ? 'bg-slate-400' : 'bg-red-500'}`} />
            <Text className="text-white text-xs font-medium uppercase tracking-wide">
              {isOffline ? 'Offline' : 'Live'}
            </Text>
          </View>

          {/* Refresh Button */}
          <Pressable className="absolute top-3 right-3 p-2 bg-black/40 rounded-full active:bg-black/60">
            <MaterialIcons name="refresh" size={20} color="white" />
          </Pressable>
        </View>

        {/* Title Info */}
        <View className="mb-4">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded border border-primary/20">
              <Text className="text-primary dark:text-blue-400 text-xs font-bold">{cam.road}</Text>
            </View>
            <View className={`flex-row items-center gap-1 px-2 py-0.5 rounded border ${isOffline ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' : 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800'}`}>
              <MaterialIcons name={isOffline ? "error-outline" : "check-circle"} size={14} className={isOffline ? 'text-slate-500 dark:text-slate-400' : 'text-emerald-600 dark:text-emerald-400'} />
              <Text className={`text-xs font-medium ${isOffline ? 'text-slate-500 dark:text-slate-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {isOffline ? 'Offline' : 'Fluid'}
              </Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-[#111418] dark:text-white tracking-tight">{cam.location}</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">{cam.kilometer}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 mb-6 w-full lg:w-[300px] self-center">
          <Pressable className="flex-1 flex-row items-center justify-center gap-2 h-11 bg-primary active:bg-blue-600 rounded-lg shadow-sm">
            <MaterialIcons name="star-border" size={20} color="white" />
            <Text className="text-white font-semibold text-sm">Add to Favorites</Text>
          </Pressable>
          <Pressable className="w-11 h-11 items-center justify-center bg-slate-100 dark:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-700">
            <MaterialIcons name="share" size={20} color={colorScheme === 'dark' ? 'white' : '#111418'} />
          </Pressable>
        </View>

        {/* Details Grid */}
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 mb-3">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="add-road" size={20} color={colorScheme === 'dark' ? '#94a3b8' : '#64748b'} />
              <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Kilometer</Text>
            </View>
            <Text className="text-[#111418] dark:text-white text-lg font-semibold">{cam.kilometer}</Text>
          </View>

          <View className="w-[48%] p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 mb-3">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="navigation" size={20} color={colorScheme === 'dark' ? '#94a3b8' : '#64748b'} />
              <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Status</Text>
            </View>
            <Text className="text-[#111418] dark:text-white text-lg font-semibold capitalize">{cam.status}</Text>
          </View>

          <View className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 mb-3">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="location-pin" size={20} color={colorScheme === 'dark' ? '#94a3b8' : '#64748b'} />
              <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Location</Text>
            </View>
            <Text className="text-[#111418] dark:text-white text-lg font-semibold">{cam.location}</Text>
          </View>

          <View className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 mb-3">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="my-location" size={20} color={colorScheme === 'dark' ? '#94a3b8' : '#64748b'} />
              <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Coordinates</Text>
            </View>
            <View className="flex-row justify-between mt-1">
              <View>
                <Text className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Latitude</Text>
                <Text className="text-[#111418] dark:text-white font-mono text-sm font-medium">{cam.latitude?.toFixed(4) || 'N/A'}</Text>
              </View>
              <View>
                <Text className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Longitude</Text>
                <Text className="text-[#111418] dark:text-white font-mono text-sm font-medium">{cam.longitude?.toFixed(4) || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {
            if (cam.latitude && cam.longitude) {
              router.push({ pathname: '/map', params: { lat: cam.latitude, lon: cam.longitude, cameraId: cam.id } });
            }
          }}
          className="w-full self-center lg:w-[90%] h-32 mt-2 mb-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 items-center justify-center bg-slate-100 dark:bg-slate-800 active:opacity-90">
          <Image
            source={require('../../assets/images/gmap.jpg')}
            className="absolute top-0 left-0 w-full h-full opacity-70 dark:opacity-50"
            resizeMode="cover"
          />
          <View className="flex-row items-center gap-2 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <MaterialIcons name="map" size={20} color="#137fec" />
            <Text className="text-[#111418] dark:text-white font-bold">Open Full Map</Text>
          </View>
        </Pressable>

      </ScrollView>
    </View>
  );
}
