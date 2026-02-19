import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MOCK_DATA } from '../data/mockWebcams';
import { WebcamCard } from './WebcamCard';

export const WebcamsListScreen = () => {
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const [roadSearchQuery, setRoadSearchQuery] = useState('');

  // Extract unique roads
  const roads = useMemo(() => {
    const allRoads = MOCK_DATA.map((w) => w.road).filter(Boolean);
    return Array.from(new Set(allRoads)).sort((a, b) => {
      // Numeric sort for roads is better if possible (A-1 vs A-10), but alphanumeric is fine for now
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
  }, []);

  const filteredRoads = useMemo(() => {
    if (!roadSearchQuery) return ['All Roads', ...roads];
    const query = roadSearchQuery.toLowerCase();
    return roads.filter((road) => road.toLowerCase().includes(query));
  }, [roadSearchQuery, roads]);

  const filteredWebcams = useMemo(() => {
    if (!selectedRoad) return MOCK_DATA;
    return MOCK_DATA.filter((w) => w.road === selectedRoad);
  }, [selectedRoad]);

  const handleOpenSelector = () => {
    setRoadSearchQuery('');
    setSelectorVisible(true);
  };

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

      {/* Search Bar - Kept as is, but could be integrated with logic later */}
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

      {/* Road Selector Dropdown Trigger */}
      <View className="bg-white dark:bg-background-dark px-4 py-2">
        <TouchableOpacity
          onPress={handleOpenSelector}
          className="flex-row items-center justify-between h-12 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
        >
          <View className="flex-row items-center">
            <MaterialIcons name="add-road" size={20} color="#64748b" />
            <Text className="ml-2 text-base font-medium text-[#111418] dark:text-white">
              {selectedRoad || "All Roads"}
            </Text>
          </View>
          <MaterialIcons name="arrow-drop-down" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Road Selector Modal */}
      <Modal
        visible={isSelectorVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectorVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white dark:bg-slate-900 rounded-t-3xl h-[80%] w-full overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800">
              <Text className="text-xl font-bold text-[#111418] dark:text-white">Select Road</Text>
              <TouchableOpacity onPress={() => setSelectorVisible(false)} className="p-2">
                <MaterialIcons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Filter Input in Modal */}
            <View className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
              <View className="flex-row items-center h-10 rounded-lg bg-slate-100 dark:bg-slate-800 px-3">
                <MaterialIcons name="search" size={20} color="#94a3b8" />
                <TextInput
                  className="flex-1 ml-2 text-base text-[#111418] dark:text-white"
                  placeholder="Filter roads..."
                  placeholderTextColor="#94a3b8"
                  value={roadSearchQuery}
                  onChangeText={setRoadSearchQuery}
                  autoCorrect={false}
                />
                {roadSearchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setRoadSearchQuery('')}>
                    <MaterialIcons name="close" size={18} color="#94a3b8" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <FlatList
              data={filteredRoads}
              keyExtractor={(item) => item}
              contentContainerStyle={{ padding: 16 }}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-10">
                  <Text className="text-slate-500">No roads found</Text>
                </View>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`py-4 border-b border-slate-100 dark:border-slate-800 flex-row items-center justify-between`}
                  onPress={() => {
                    setSelectedRoad(item === 'All Roads' ? null : item);
                    setSelectorVisible(false);
                  }}
                >
                  <Text className={`text-base ${selectedRoad === item || (item === 'All Roads' && selectedRoad === null) ? 'font-bold text-blue-600' : 'text-[#111418] dark:text-white'}`}>
                    {item}
                  </Text>
                  {(selectedRoad === item || (item === 'All Roads' && selectedRoad === null)) && (
                    <MaterialIcons name="check" size={20} color="#2563eb" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Scrollable Content Header */}
      <View className="flex-row items-center px-4 py-2 bg-white dark:bg-background-dark">
        <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
        <Text className="text-lg font-bold text-[#111418] dark:text-white">
          {selectedRoad ? `${selectedRoad} Cameras` : 'All Cameras'}
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
