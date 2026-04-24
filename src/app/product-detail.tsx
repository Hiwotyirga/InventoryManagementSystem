import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useInventory } from '../context/InventoryContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { products, updateStock } = useInventory();
  const router = useRouter();

  // Find the specific product
  const product = products.find((p: any) => p.id === id);

  if (!product) return <Text>Product not found</Text>;

  return (
    <View className="flex-1 bg-white p-8">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="mt-10 mb-6">
        <Ionicons name="arrow-back" size={28} color="#007AFF" />
      </TouchableOpacity>

      <View className="items-center mb-8">
        <View className="bg-gray-100 p-10 rounded-[40px] mb-4">
          <Ionicons name="cube-outline" size={80} color="#007AFF" />
        </View>
        <Text className="text-3xl font-bold text-gray-900">{product.name}</Text>
        <Text className="text-gray-500 text-lg">SKU: {product.sku}</Text>
      </View>

      {/* Status Section */}
      <View className="flex-row justify-around bg-gray-50 p-6 rounded-3xl mb-10">
        <View className="items-center">
          <Text className="text-gray-400 mb-1">Price</Text>
          <Text className="text-xl font-bold">${product.price}</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-400 mb-1">Current Stock</Text>
          <Text className="text-xl font-bold text-blue-600">{product.quantity}</Text>
        </View>
      </View>

      {/* Adjustment Section */}
      <Text className="text-center text-gray-500 mb-4 font-bold uppercase tracking-widest">
        Adjust Inventory
      </Text>
      
      <View className="flex-row justify-center items-center space-x-8">
        {/* Remove Stock */}
        <TouchableOpacity 
          onPress={() => updateStock(product.id, -1)}
          className="bg-red-500 w-20 h-20 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="remove" size={40} color="white" />
        </TouchableOpacity>

        <Text className="text-4xl font-bold px-6">{product.quantity}</Text>

        {/* Add Stock */}
        <TouchableOpacity 
          onPress={() => updateStock(product.id, 1)}
          className="bg-green-500 w-20 h-20 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-center text-gray-400 mt-12 italic">
        Last Updated: {new Date().toLocaleTimeString()}
      </Text>
    </View>
  );
}