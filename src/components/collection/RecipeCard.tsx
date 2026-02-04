import React, { useRef } from 'react'
import { View, Text, Platform, TouchableOpacity, Animated } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import type { Recipe } from '@/types'
import { formatPrice } from '@/utils/format'

interface RecipeCardProps {
  readonly recipe: Recipe
  readonly onPress: () => void
  readonly onLongPress?: () => void
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  android: { elevation: 3 },
})

export function RecipeCard({
  recipe,
  onPress,
  onLongPress,
}: RecipeCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View style={[cardShadow, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
      >
        <View className="relative aspect-video w-full">
          <Image
            source={{ uri: recipe.thumbnailUrl }}
            contentFit="cover"
            transition={200}
            className="h-full w-full"
            placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%' }}
          />
          <View className="absolute bottom-2.5 right-3">
            <View className="rounded-lg bg-primary px-2.5 py-1">
              <Text className="text-xs font-bold text-white">
                {formatPrice(recipe.totalCost)}
              </Text>
            </View>
          </View>
        </View>
        <View className="p-3.5">
          <Text
            className="text-base font-semibold text-gray-900"
            numberOfLines={2}
          >
            {recipe.title}
          </Text>
          <Text className="mt-1 text-sm text-gray-500">
            {recipe.channelName}
          </Text>
          {recipe.savedAt ? (
            <Text className="mt-1 text-xs text-gray-400">
              {recipe.savedAt}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}
