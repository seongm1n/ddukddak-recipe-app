import React from 'react'
import { Stack } from 'expo-router'

export default function MyPageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          title: '이용약관',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: '개인정보처리방침',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  )
}
