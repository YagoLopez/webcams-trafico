import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CamsListHeaderProps {
  onOpenFilters: () => void;
}

export const CamListHeader: React.FC<CamsListHeaderProps> = ({ onOpenFilters }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark">
      <Text className="text-2xl font-bold text-[#111418] dark:text-white">
        Cámaras DGT
      </Text>
      <View className="flex-row items-center gap-2">
        <Pressable className="h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <MaterialIcons name="notifications-none" size={24} className="text-[#111418] dark:text-white" />
        </Pressable>
        <Pressable
          onPress={onOpenFilters}
          testID="open-filters-button"
          className="h-10 w-10 items-center justify-center rounded-full bg-primary/10"
        >
          <MaterialCommunityIcons name="tune-vertical" size={24} color="#137fec" />
        </Pressable>
      </View>
    </View>
  );
};
