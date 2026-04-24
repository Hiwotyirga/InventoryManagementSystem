import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { InventoryProvider } from '../context/InventoryContext';
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </InventoryProvider>
    </AuthProvider>
  );
}