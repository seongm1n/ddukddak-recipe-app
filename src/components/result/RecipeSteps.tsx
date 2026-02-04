import React from 'react'
import { View, Text } from 'react-native'

interface RecipeStepsProps {
  steps: readonly string[]
}

export function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <View>
      <Text className="mb-4 text-lg font-bold text-gray-900">
        조리 순서
      </Text>
      <View className="gap-3">
        {steps.map((step, index) => (
          <View key={index} className="flex-row gap-3">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
              <Text className="text-sm font-bold text-white">
                {index + 1}
              </Text>
            </View>
            <Text className="flex-1 pt-1 text-base leading-6 text-gray-700">
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
