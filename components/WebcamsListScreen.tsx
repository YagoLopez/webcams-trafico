import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MOCK_DATA } from '../data/mockWebcams';
import { WebcamCard } from './WebcamCard';

export const WebcamsListScreen = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const provinces = useMemo(() => {
    const allProvinces = MOCK_DATA.map((w) => w.location).filter(Boolean);
    return Array.from(new Set(allProvinces)).sort();
  }, []);

  const filteredWebcams = useMemo(() => {
    if (!selectedProvince) return MOCK_DATA;
    return MOCK_DATA.filter((w) => w.location === selectedProvince);
  }, [selectedProvince]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
      {/* Header Section */}
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark">
        <Text className="text-2xl font-bold text-[#111418] dark:text-white">
          Cámaras DGT
        </Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <MaterialIcons name="notifications-none" size={24} color="#111418" />
          </TouchableOpacity>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <MaterialCommunityIcons name="tune-vertical" size={24} color="#137fec" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-2 bg-white dark:bg-background-dark">
        <View className="flex-row items-center h-12 rounded-xl bg-slate-100 dark:bg-slate-800 px-4">
          <MaterialIcons name="search" size={24} color="#94a3b8" />
          <TextInput
            className="flex-1 ml-2 text-base text-[#111418] dark:text-white"
            placeholder="Search road (e.g., A-6)..."
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      {/* Filter Chips */}
      <View className="bg-white dark:bg-background-dark">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
        >
          <TouchableOpacity
            onPress={() => setSelectedProvince(null)}
            className={`h-9 flex-row items-center justify-center rounded-full px-4 ${selectedProvince === null
                ? 'bg-[#111418] dark:bg-white'
                : 'bg-slate-100 dark:bg-slate-800'
              }`}
          >
            <MaterialIcons
              name="grid-view"
              size={18}
              color={selectedProvince === null ? 'white' : '#111418'}
              style={selectedProvince === null ? {} : { opacity: 0.5 }}
            />
            <Text
              className={`ml-2 text-sm font-medium ${selectedProvince === null
                  ? 'text-white dark:text-[#111418]'
                  : 'text-[#111418] dark:text-white'
                }`}
            >
              All
            </Text>
          </TouchableOpacity>
          {provinces.map((province) => (
            <TouchableOpacity
              key={province}
              onPress={() => setSelectedProvince(province)}
              className={`h-9 flex-row items-center justify-center rounded-full px-4 ${selectedProvince === province
                  ? 'bg-[#111418] dark:bg-white'
                  : 'bg-slate-100 dark:bg-slate-800'
                }`}
            >
              <MaterialIcons
                name="location-on"
                size={18}
                color={selectedProvince === province ? 'white' : '#111418'}
                style={selectedProvince === province ? {} : { opacity: 0.5 }}
              />
              <Text
                className={`ml-2 text-sm font-medium ${selectedProvince === province
                    ? 'text-white dark:text-[#111418]'
                    : 'text-[#111418] dark:text-white'
                  }`}
              >
                {province}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Scrollable Content Header */}
      <View className="flex-row items-center px-4 py-2 bg-white dark:bg-background-dark">
        <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
        <Text className="text-lg font-bold text-[#111418] dark:text-white">
          {selectedProvince ? `${selectedProvince} Cameras` : 'All Cameras'}
        </Text>
        <Text className="ml-auto text-xs text-slate-500 dark:text-slate-400">Updated 1m ago</Text>
      </View>

      {/* List */}
      <FlatList
        className="flex-1 bg-white dark:bg-background-dark px-4"
        data={filteredWebcams}
        renderItem={({ item }) => <WebcamCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
