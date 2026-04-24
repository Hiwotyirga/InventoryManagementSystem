import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useInventory } from '../../context/InventoryContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
  const { user } = useAuth();
  const { products } = useInventory();
    const router = useRouter();
  
interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

const totalStock = products.reduce((sum: number, p: Product) => sum + p.quantity, 0);
const totalValue = products.reduce((sum: number, p: Product) => sum + (p.price * p.quantity), 0);
  return (
    <View className="flex-1 bg-[#F8F9FA] px-6 pt-12">
      <View className="mb-8">
      </View>

      <View className="flex-row justify-between mb-8">
        <View className="bg-blue-600 p-5 rounded-3xl w-[48%] shadow-md">
          <Text className="text-blue-100 mb-1">Total Items</Text>
          <Text className="text-white text-2xl font-bold">{totalStock}</Text>
        </View>
        <View className="bg-white p-5 rounded-3xl w-[48%] shadow-sm border border-gray-100">
          <Text className="text-gray-500 mb-1">Total Value</Text>
          <Text className="text-gray-900 text-2xl font-bold">${totalValue.toFixed(2)}</Text>
        </View>
      </View>

      <Text className="text-xl font-bold text-gray-900 mb-4">Current Inventory</Text>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => router.push({
            pathname: "/product-detail",
            params: { id: item.id } 
        })}
          className="bg-white p-5 rounded-2xl mb-4 flex-row justify-between items-center shadow-sm border border-gray-50">
            <View>
              <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
              <Text className="text-gray-500">SKU: {item.sku}</Text>
            </View>
            <View className="items-end">
              <Text className="text-blue-600 font-bold text-lg">{item.quantity} in stock</Text>
              <Text className="text-gray-400">${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Text className="text-gray-400">No products registered yet.</Text>
          </View>
        }
      />
    </View>
  );
}