import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-xl font-bold text-black'>index</Text>
      <Link href="/signIn">Go to signIn</Link>
    </View>
  )
}

export default index
