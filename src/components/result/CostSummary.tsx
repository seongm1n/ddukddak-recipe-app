import React from 'react'
import { View, Text, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { formatPrice } from '@/utils/format'
import { gradients } from '@/constants/theme'

interface CostSummaryProps {
  totalCost: number
  servings: number
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  android: { elevation: 4 },
})

export function CostSummary({ totalCost, servings }: CostSummaryProps) {
  const perServingCost = Math.round(totalCost / servings)

  return (
    <View style={[{ borderRadius: 16, overflow: 'hidden' }, cardShadow]}>
      <LinearGradient
        colors={[...gradients.primarySoft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 20, borderRadius: 16 }}
      >
        <View className="flex-row items-center gap-2">
          <Ionicons name="calculator-outline" size={18} color="rgba(255,255,255,0.8)" />
          <Text className="text-sm font-medium text-white/80">예상 원가</Text>
        </View>

        <Text className="mt-2 text-4xl font-bold text-white">
          {formatPrice(totalCost)}
        </Text>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-white/15 px-4 py-3">
          <View className="flex-row items-center gap-2">
            <Ionicons name="person-outline" size={16} color="#FFFFFF" />
            <Text className="text-sm text-white">{servings}인분 기준</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-white">
              {formatPrice(perServingCost)}
            </Text>
            <Text className="ml-1 text-sm text-white/70">/인</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}
