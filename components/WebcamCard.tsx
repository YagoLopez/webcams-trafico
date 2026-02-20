import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { WebcamData } from '../types/webcam';

interface WebcamCardProps {
  item: WebcamData;
}

export const WebcamCard: React.FC<WebcamCardProps> = React.memo(({ item }) => {
  const isOffline = item.status === 'offline';

  return (
    <View className={`flex flex-col overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-4 ${isOffline ? 'opacity-80' : ''}`}>
      {/* Image Container */}
      <View className={`relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800 ${isOffline ? 'items-center justify-center' : ''}`}>
        {isOffline ? (
          <MaterialIcons name="videocam-off" size={48} color="#cbd5e1" />
        ) : (
          <Image
            source={{ uri: item.imageUrl }}
            className="h-full w-full"
            resizeMode="cover"
          />
        )}

        {/* Cam Icon Top Right */}
        <View className={`absolute right-3 top-3 rounded-full p-1.5 ${isOffline ? 'bg-slate-200 dark:bg-slate-700' : 'bg-black/40 backdrop-blur-md'}`}>
          <MaterialIcons
            name={isOffline ? 'videocam-off' : 'videocam'}
            size={20}
            color={isOffline ? '#94a3b8' : 'white'}
          />
        </View>

        {/* Road Badge Bottom Left */}
        <View className={`absolute left-3 bottom-3 rounded-lg px-2.5 py-1 shadow-sm ${isOffline ? 'bg-slate-500' : 'bg-primary'}`}>
          <Text className="text-xs font-bold text-white">
            {item.road}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex flex-col p-4">
        <View className="flex flex-row items-start justify-between gap-4">
          <View className="flex-1">
            <Text className={`text-base font-semibold ${isOffline ? 'text-slate-500 dark:text-slate-400' : 'text-[#111418] dark:text-white'}`}>
              {item.kilometer}
            </Text>
            <View className="mt-1 flex flex-row items-center gap-1.5">
              {isOffline ? (
                <>
                  <MaterialIcons name="error" size={16} color="#94a3b8" />
                  <Text className="text-sm text-slate-400 dark:text-slate-500">
                    Connection Lost
                  </Text>
                </>
              ) : (
                <>
                  <MaterialIcons name="location-on" size={16} color="#94a3b8" />
                  <Text className="text-sm text-slate-500 dark:text-slate-400">
                    {item.location}
                  </Text>
                </>
              )}
            </View>
          </View>

          <TouchableOpacity className="text-slate-300">
            <MaterialIcons name="favorite-border" size={24} color="#cbd5e1" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
