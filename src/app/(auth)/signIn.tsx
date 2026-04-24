import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '' });

  const handleSignIn = () => {
    if (!form.email.includes('@') || !form.fullName) {
      return Alert.alert("Error", "Please enter a valid email and full name.");
    }
    setUser(form);
    router.replace('/(tabs)'); 
  };

  return (
    // 1. KeyboardAvoidingView shifts the view up
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {/* 2. TouchableWithoutFeedback closes keyboard on tap outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="bg-[#F1F3F5] px-8"
        >
          <View className="bg-white p-10 rounded-[40px] shadow-sm">
            <Text className="text-4xl font-bold text-gray-900 text-center mb-10">
               Welcome back
            </Text>
            
            <View className="mb-6">
              <Text className="text-gray-700 font-bold mb-2 ml-1">Email Address</Text>
              <TextInput
                className="border-2 border-gray-200 p-4 rounded-2xl text-lg focus:border-blue-500"
                placeholder="example@mail.com"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View className="mb-10">
              <Text className="text-gray-700 font-bold mb-2 ml-1">Full Name</Text>
              <TextInput
                className="border-2 border-gray-200 p-4 rounded-2xl text-lg focus:border-blue-500"
                placeholder="John Doe"
                value={form.fullName}
                onChangeText={(text) => setForm({ ...form, fullName: text })}
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}