import React from 'react'
import { Tabs } from 'expo-router'

import { GlassTabBar } from '@/components/ui/GlassTabBar'

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="collection" />
      <Tabs.Screen name="mypage" />
    </Tabs>
  )
}
