import React from 'react';
import { Text, View } from 'react-native';

interface WebcamsListSubheaderProps {
  cameraCount: number;
}

export const WebcamsListSubheader = ({ cameraCount }: WebcamsListSubheaderProps) => {
  return (
    <View className="flex-row items-center px-4 py-2 bg-white dark:bg-background-dark">
      <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
      <Text className="text-lg font-bold text-[#111418] dark:text-white">
        {cameraCount} Cámaras
      </Text>
      <Text className="ml-auto text-xs text-slate-500 dark:text-slate-400">Updated 1m ago</Text>
    </View>
  );
};
