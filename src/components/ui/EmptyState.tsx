import React, { useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/theme'
import { Button } from './Button'

interface EmptyStateProps {
  readonly icon: keyof typeof Ionicons.glyphMap
  readonly title: string
  readonly description?: string
  readonly actionLabel?: string
  readonly onAction?: () => void
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="flex-1 items-center justify-center px-8"
    >
      <View className="mb-4 h-28 w-28 items-center justify-center rounded-full bg-gray-100">
        <Ionicons
          name={icon}
          size={48}
          color={colors.gray[400]}
        />
      </View>
      <Text className="text-center text-lg font-semibold text-text">
        {title}
      </Text>
      {description ? (
        <Text className="mt-2 text-center text-sm text-text-secondary">
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <View className="mt-6">
          <Button title={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </Animated.View>
  )
}
