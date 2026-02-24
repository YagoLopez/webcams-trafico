import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SelectBoxProps {
  label: string;
  data: string[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

interface SelectItemProps {
  item: string;
  isSelected: boolean;
  onSelect: (item: string) => void;
}

const SelectItem = React.memo(({ item, isSelected, onSelect }: SelectItemProps) => {
  const handlePress = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  return (
    <TouchableOpacity
      className="py-4 border-b border-slate-100 dark:border-slate-800 flex-row items-center justify-between"
      onPress={handlePress}
    >
      <Text className={`text-base ${isSelected ? 'font-bold text-blue-600' : 'text-[#111418] dark:text-white'}`}>
        {item}
      </Text>
      {isSelected && <MaterialIcons name="check" size={20} color="#2563eb" />}
    </TouchableOpacity>
  );
});

SelectItem.displayName = 'SelectItem';

export const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  data,
  value,
  onValueChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return [placeholder, ...data];
    const query = searchQuery.toLowerCase();
    return data.filter((item) => item.toLowerCase().includes(query));
  }, [data, searchQuery, placeholder]);

  const handleSelect = useCallback((item: string) => {
    onValueChange(item === placeholder ? null : item);
    setModalVisible(false);
    setSearchQuery('');
  }, [onValueChange, placeholder]);

  const renderItem = useCallback(({ item }: { item: string }) => {
    const isSelected = value === item || (item === placeholder && value === null);
    return (
      <SelectItem
        item={item}
        isSelected={isSelected}
        onSelect={handleSelect}
      />
    );
  }, [value, placeholder, handleSelect]);

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </Text>

      <TouchableOpacity
        onPress={() => {
          setSearchQuery('');
          setModalVisible(true);
        }}
        className="flex-row items-center justify-between h-12 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
      >
        <Text className="text-base font-medium text-[#111418] dark:text-white">
          {value || placeholder}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#64748b" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-start pt-20 items-center">
          <View className="bg-white dark:bg-slate-900 rounded-3xl max-h-[80%] max-w-md w-[90%] overflow-hidden">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800">
              <Text className="text-xl font-bold text-[#111418] dark:text-white">{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="p-2">
                <MaterialIcons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
              <View className="flex-row items-center h-10 rounded-lg bg-slate-100 dark:bg-slate-800 px-3">
                <MaterialIcons name="search" size={20} color="#94a3b8" />
                <TextInput
                  className="flex-1 ml-2 text-base text-[#111418] dark:text-white"
                  placeholder={searchPlaceholder}
                  placeholderTextColor="#94a3b8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCorrect={false}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <MaterialIcons name="close" size={18} color="#94a3b8" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* List */}
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item}
              contentContainerStyle={{ padding: 16 }}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-10">
                  <Text className="text-slate-500">No results found</Text>
                </View>
              }
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

SelectBox.displayName = 'SelectBox';
