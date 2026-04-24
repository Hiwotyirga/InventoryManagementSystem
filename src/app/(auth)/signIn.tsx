import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');

  const handleSignIn = () => {
    if (!email.includes('@')) {
      return Alert.alert("Error", "Please enter a valid email.");
    }
    
    // Simulating login: We just need a name to show on the Home page
    setUser({ fullName: 'Welcome Back!', email: email });
    router.replace('/(tabs)'); 
  };

  return (
    <View className="flex-1 bg-[#F1F3F5] justify-center px-8">
      <View className="bg-white p-10 rounded-[40px] shadow-sm">
        <Text className="text-4xl font-bold text-gray-900 text-center mb-10">
           back
        </Text>
        
        <View className="mb-10">
          <Text className="text-gray-700 font-bold mb-2 ml-1">Email Address</Text>
          <TextInput
            className="border-2 border-gray-200 p-4 rounded-2xl text-lg focus:border-blue-500"
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity 
          onPress={handleSignIn}
          className="bg-[#007AFF] p-5 rounded-2xl items-center shadow-lg active:opacity-90"
        >
          <Text className="text-white font-bold text-xl">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-12">
          <Text className="text-gray-500 text-lg">New here? </Text>
          <Link href="/signup">
            <Text className="text-[#007AFF] font-bold text-lg">Create Account</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}