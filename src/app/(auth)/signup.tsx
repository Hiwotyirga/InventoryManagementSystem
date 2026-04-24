import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '' });

  const handleRegister = () => {
    if (!form.fullName || !form.email) {
      return Alert.alert("Error", "All fields are required");
    }
        setUser(form);
    router.replace('/(tabs)'); 
  };

  return (
    <View className="flex-1 bg-[#F1F3F5] justify-center px-8">
      <View className="bg-white p-10 rounded-[40px] shadow-sm">
        <Text className="text-4xl font-bold text-gray-900 text-center mb-10">
          Create Account
        </Text>

        <View className="mb-6">
          <Text className="text-gray-700 font-bold mb-2 ml-1">Full Name</Text>
          <TextInput
            className="border-2 border-gray-200 p-4 rounded-2xl text-lg focus:border-blue-500"
            placeholder="John Doe"
            value={form.fullName}
            onChangeText={(t) => setForm({ ...form, fullName: t })}
          />
        </View>

        <View className="mb-10">
          <Text className="text-gray-700 font-bold mb-2 ml-1">Email Address</Text>
          <TextInput
            className="border-2 border-gray-200 p-4 rounded-2xl text-lg focus:border-blue-500"
            placeholder="example@mail.com"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
          />
        </View>

        <TouchableOpacity 
          onPress={handleRegister}
          className="bg-[#007AFF] p-5 rounded-2xl items-center shadow-lg active:opacity-90"
        >
          <Text className="text-white font-bold text-xl">Register</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-12">
          <Text className="text-gray-500 text-lg">Already have an account? </Text>
          <Link href="/signIn">
            <Text className="text-[#007AFF] font-bold text-lg">Sign In</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}