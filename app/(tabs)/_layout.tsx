import React from 'react'
import { View } from 'react-native'
import { Tabs } from 'expo-router'

import { GlassTabBar } from '@/components/ui/GlassTabBar'
import { AnalysisBanner } from '@/components/ui/AnalysisBanner'

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AnalysisBanner />
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
    </View>
  )
}
