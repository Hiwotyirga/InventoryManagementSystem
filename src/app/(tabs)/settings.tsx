import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            setUser(null); 
            router.replace('/signIn'); 
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#F8F9FA] px-6 pt-12">
      <Text className="text-3xl font-bold text-gray-900 mb-8">Settings</Text>

      {/* Profile Section */}
      <View className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 mb-6">
        <View className="flex-row items-center mb-4">
          <View className="bg-blue-100 p-4 rounded-full mr-4">
            <Ionicons name="person" size={30} color="#007AFF" />
          </View>
          <View>
            <Text className="text-xl font-bold text-gray-900">{user?.fullName}</Text>
            <Text className="text-gray-500">{user?.email}</Text>
          </View>
        </View>
      </View>

      {/* Options List */}
      <View className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
        
        {/* History Shortcut */}
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/history')}
          className="flex-row items-center justify-between p-5 border-b border-gray-50 active:bg-gray-50"
        >
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={22} color="#4B5563" className="mr-3" />
            <Text className="text-lg text-gray-700 ml-3">View History</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity 
          onPress={handleLogout}
          className="flex-row items-center justify-between p-5 active:bg-red-50"
        >
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={22} color="#EF4444" className="mr-3" />
            <Text className="text-lg text-red-500 font-semibold ml-3">Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FEE2E2" />
        </TouchableOpacity>

      </View>

      <Text className="text-center text-gray-400 mt-10 text-sm">
        Ellatech Inventory v1.0.0
      </Text>
    </View>
  );
}