import React from 'react'
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { haptics } from '@/utils/haptics'

const TAB_ICONS: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  feed: { active: 'compass', inactive: 'compass-outline' },
  collection: { active: 'library', inactive: 'library-outline' },
  mypage: { active: 'person-circle', inactive: 'person-circle-outline' },
}

const TAB_LABELS: Record<string, string> = {
  feed: '피드',
  collection: '컬렉션',
  mypage: '마이',
}

const ACTIVE_COLOR = '#FF6B35'
const INACTIVE_COLOR = '#8E8E93'

const containerShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  android: { elevation: 12 },
})

export function GlassTabBar({ state, navigation }: BottomTabBarProps) {
  const visibleRoutes = state.routes.filter(
    (route) => TAB_ICONS[route.name] !== undefined
  )

  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: 24,
          left: 20,
          right: 20,
          borderRadius: 24,
          overflow: 'hidden',
        },
        containerShadow,
      ]}
    >
      <BlurView
        intensity={60}
        tint="light"
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 8,
          borderRadius: 24,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.4)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          overflow: 'hidden',
        }}
      >
        {visibleRoutes.map((route) => {
          const routeIndex = state.routes.indexOf(route)
          const isFocused = state.index === routeIndex
          const iconConfig = TAB_ICONS[route.name]
          const label = TAB_LABELS[route.name] ?? route.name

          if (!iconConfig) return null

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              haptics.light()
              navigation.navigate(route.name)
            }
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={handlePress}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 6,
                borderRadius: 16,
                backgroundColor: isFocused ? 'rgba(255, 107, 53, 0.12)' : 'transparent',
              }}
            >
              <Ionicons
                name={isFocused ? iconConfig.active : iconConfig.inactive}
                size={24}
                color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: isFocused ? '700' : '500',
                  color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR,
                  marginTop: 2,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </BlurView>
    </View>
  )
}
