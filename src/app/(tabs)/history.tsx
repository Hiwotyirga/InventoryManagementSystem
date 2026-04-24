import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useInventory } from '../../context/InventoryContext';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
    const { transactions = [] } = useInventory(); 
  const [visibleItems, setVisibleItems] = React.useState(10); 
  const handleLoadMore = () => {
  setVisibleItems(prev => prev + 10); 
};

  return (
    <View className="flex-1 bg-[#F8F9FA] px-6 pt-12">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Activity Log</Text>
      <Text className="text-gray-500 mb-6">Track all stock movements here.</Text>

      <FlatList
       data={transactions.slice(0, visibleItems)} 
      keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-2xl mb-3 flex-row items-center border border-gray-100 shadow-sm">
            {/* Dynamic Icon based on transaction type */}
            <View className={`p-3 rounded-full mr-4 ${
              item.type === 'IN' ? 'bg-green-100' : item.type === 'OUT' ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              <Ionicons 
                name={item.type === 'IN' ? 'arrow-up' : item.type === 'OUT' ? 'arrow-down' : 'add'} 
                size={20} 
                color={item.type === 'IN' ? '#22c55e' : item.type === 'OUT' ? '#ef4444' : '#007AFF'} 
              />
            </View>

            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">
                {item.type === 'NEW' ? 'New Registration' : `Stock ${item.type === 'IN' ? 'Added' : 'Removed'}`}
              </Text>
              <Text className="text-gray-500">SKU: {item.sku} • {item.amount} units</Text>
            </View>

            <Text className="text-gray-400 text-sm">{item.date}</Text>
          </View>
        )}
        onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        transactions.length > visibleItems ? (
          <Text className="text-center text-gray-400 my-4 italic">Loading more history...</Text>
        ) : null
      }
      ListEmptyComponent={
        <Text className="text-center text-gray-400 mt-10">No transactions recorded.</Text>
      }
      />
    </View>
  );
}