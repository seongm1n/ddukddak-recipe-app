import React from 'react'
import { View, Text } from 'react-native'
import { formatPrice } from '@/utils/format'

interface CostSummaryProps {
  totalCost: number
  servings: number
}

export function CostSummary({ totalCost, servings }: CostSummaryProps) {
  const perServingCost = Math.round(totalCost / servings)

  return (
    <View className="rounded-xl border border-primary/30 bg-primary/10 p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-medium text-gray-700">
          총 원가
        </Text>
        <Text className="text-2xl font-bold text-primary">
          {formatPrice(totalCost)}
        </Text>
      </View>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-sm text-gray-500">
          1인분 기준
        </Text>
        <Text className="text-base font-semibold text-primary/80">
          {formatPrice(perServingCost)}
        </Text>
      </View>
    </View>
  )
}
