import React from 'react'
import { Stack } from 'expo-router'

export default function CollectionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="analyze"
        options={{
          title: '레시피 분석',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: '분석 결과',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  )
}
