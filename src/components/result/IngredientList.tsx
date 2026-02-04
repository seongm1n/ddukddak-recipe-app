import React from 'react'
import { View, Text } from 'react-native'
import type { Ingredient } from '@/types'
import { formatPrice } from '@/utils/format'

interface IngredientListProps {
  ingredients: readonly Ingredient[]
}

function IngredientRow({ ingredient }: { ingredient: Ingredient }) {
  return (
    <View className="flex-row items-center border-b border-gray-100 py-3">
      <Text className="flex-1 text-base text-gray-800">
        {ingredient.name}
      </Text>
      <Text className="w-24 text-center text-sm text-gray-500">
        {ingredient.quantity}{ingredient.unit}
      </Text>
      <Text className="w-20 text-right text-sm font-medium text-gray-700">
        {formatPrice(ingredient.price)}
      </Text>
    </View>
  )
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <View>
      <Text className="mb-2 text-lg font-bold text-gray-900">
        재료
      </Text>
      <View>
        {ingredients.map((ingredient) => (
          <IngredientRow key={ingredient.id} ingredient={ingredient} />
        ))}
      </View>
    </View>
  )
}
