import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SelectBox } from './ui/SelectBox';

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  roads: string[];
  provinces: string[];
  selectedRoad: string | null;
  selectedProvince: string | null;
  onSelectRoad: (road: string | null) => void;
  onSelectProvince: (province: string | null) => void;
}

export const FiltersModal = ({
  visible,
  onClose,
  roads,
  provinces,
  selectedRoad,
  selectedProvince,
  onSelectRoad,
  onSelectProvince,
}: FiltersModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <View className="bg-white dark:bg-background-dark rounded-t-[32px] px-6 pt-4 pb-12 shadow-xl">
              {/* Modal Header */}
              <View className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full self-center mb-6" />

              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-bold text-[#111418] dark:text-white">Filtros</Text>
                <TouchableOpacity onPress={onClose}>
                  <MaterialIcons name="close" size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              {/* Filters Content */}
              <View className="space-y-6">
                <View>
                  <SelectBox
                    label="Filtrar carreteras"
                    data={roads}
                    value={selectedRoad}
                    onValueChange={onSelectRoad}
                    placeholder="Todas las carreteras"
                    searchPlaceholder="Buscar carretera..."
                  />
                </View>

                <View className="mt-4">
                  <SelectBox
                    label="Filtrar provincias"
                    data={provinces}
                    value={selectedProvince}
                    onValueChange={onSelectProvince}
                    placeholder="Todas las provincias"
                    searchPlaceholder="Buscar provincia..."
                  />
                </View>

                {(selectedRoad !== null || selectedProvince !== null) && (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectRoad(null);
                      onSelectProvince(null);
                    }}
                    className="mt-6 flex-row items-center justify-center py-3 bg-red-50 dark:bg-red-900/20 rounded-xl"
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
                    <Text className="ml-2 text-sm font-semibold text-red-500 dark:text-red-400">
                      Borrar filtros
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={onClose}
                  className="mt-4 bg-[#137fec] py-4 rounded-xl items-center"
                >
                  <Text className="text-white font-bold text-base">Aplicar Filtros</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
