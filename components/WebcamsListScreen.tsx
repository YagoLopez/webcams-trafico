import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_DATA } from '../data/mockWebcams';
import { SelectBox } from './ui/SelectBox';
import { WebcamCard } from './WebcamCard';

export const WebcamsListScreen = () => {
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // Extract unique roads
  const roads = useMemo(() => {
    const allRoads = MOCK_DATA.map((w) => w.road).filter(Boolean);
    return Array.from(new Set(allRoads)).sort((a, b) => {
      // Numeric sort for roads is better if possible (A-1 vs A-10), but alphanumeric is fine for now
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
  }, []);

  // Extract unique provinces
  const provinces = useMemo(() => {
    const allProvinces = MOCK_DATA.map((w) => w.location).filter(Boolean);
    return Array.from(new Set(allProvinces)).sort();
  }, []);

  const filteredWebcams = useMemo(() => {
    return MOCK_DATA.filter((w) => {
      const roadMatch = selectedRoad ? w.road === selectedRoad : true;
      const provinceMatch = selectedProvince ? w.location === selectedProvince : true;
      return roadMatch && provinceMatch;
    });
  }, [selectedRoad, selectedProvince]);

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

      {/* Filters Section */}
      <View className="bg-white dark:bg-background-dark px-4 py-4">
        <View className="mb-4">
          <SelectBox
            label="Filtrar carreteras"
            data={roads}
            value={selectedRoad}
            onValueChange={setSelectedRoad}
            placeholder="Todas las carreteras"
            searchPlaceholder="Buscar carretera..."
          />
        </View>

        <View>
          <SelectBox
            label="Filtrar provincias"
            data={provinces}
            value={selectedProvince}
            onValueChange={setSelectedProvince}
            placeholder="Todas las provincias"
            searchPlaceholder="Buscar provincia..."
          />
        </View>

        {(selectedRoad !== null || selectedProvince !== null) && (
          <TouchableOpacity
            onPress={() => {
              setSelectedRoad(null);
              setSelectedProvince(null);
            }}
            className="mt-4 flex-row items-center justify-center py-2 bg-red-50 dark:bg-red-900/20 rounded-lg"
          >
            <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
            <Text className="ml-2 text-sm font-medium text-red-500 dark:text-red-400">
              Borrar filtros
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Scrollable Content Header */}
      <View className="flex-row items-center px-4 py-2 bg-white dark:bg-background-dark">
        <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
        <Text className="text-lg font-bold text-[#111418] dark:text-white">
          {filteredWebcams.length} Cámaras
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
