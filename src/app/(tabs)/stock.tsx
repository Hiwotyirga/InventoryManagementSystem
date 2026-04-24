import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useInventory } from '../../context/InventoryContext';
import { useRouter } from 'expo-router';

export default function AddProduct() {
  const { addProduct } = useInventory();
  const router = useRouter();
  const [form, setForm] = useState({ sku: '', name: '', price: '', quantity: '' });

  const handleSave = () => {
    const { sku, name, price, quantity } = form;
    
    // Feature 2: Basic Validation
    if (!sku || !name || !price || !quantity) {
      return Alert.alert("Error", "All fields are required");
    }

    addProduct({
      sku,
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    });

    Alert.alert("Success", "Product added to inventory");
    setForm({ sku: '', name: '', price: '', quantity: '' });
    router.push('/(tabs)'); // Go back to Home to see the list
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold text-gray-900 mt-10 mb-2">New Product</Text>
      <Text className="text-gray-500 mb-8">Enter the details to register stock.</Text>

      <View className="space-y-6">
        <View>
          <Text className="text-gray-700 font-semibold mb-2">SKU Code</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
            placeholder="e.g. ELE-100"
            value={form.sku}
            onChangeText={(t) => setForm({...form, sku: t})}
          />
        </View>

        <View className="mt-4">
          <Text className="text-gray-700 font-semibold mb-2">Product Name</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
            placeholder="e.g. Wireless Mouse"
            value={form.name}
            onChangeText={(t) => setForm({...form, name: t})}
          />
        </View>

        <View className="flex-row justify-between mt-4">
          <View className="w-[48%]">
            <Text className="text-gray-700 font-semibold mb-2">Price ($)</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
              placeholder="0.00"
              keyboardType="numeric"
              value={form.price}
              onChangeText={(t) => setForm({...form, price: t})}
            />
          </View>
          <View className="w-[48%]">
            <Text className="text-gray-700 font-semibold mb-2">Initial Stock</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
              placeholder="0"
              keyboardType="numeric"
              value={form.quantity}
              onChangeText={(t) => setForm({...form, quantity: t})}
            />
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleSave}
          className="bg-blue-600 p-5 rounded-2xl items-center mt-10 shadow-lg"
        >
          <Text className="text-white font-bold text-lg">Save Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}