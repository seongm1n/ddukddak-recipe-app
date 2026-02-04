import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { colors } from '../../constants/theme'

interface LoadingSpinnerProps {
  size?: 'small' | 'large'
  color?: string
  message?: string
}

export function LoadingSpinner({
  size = 'large',
  color = colors.primary.DEFAULT,
  message,
}: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={size} color={color} />
      {message ? (
        <Text className="mt-3 text-sm text-text-secondary">
          {message}
        </Text>
      ) : null}
    </View>
  )
}
