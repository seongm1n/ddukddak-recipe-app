import React from 'react'
import { View, Text } from 'react-native'

type BadgeVariant = 'price' | 'status' | 'default'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

const variantContainerStyles: Record<BadgeVariant, string> = {
  price: 'bg-primary/10',
  status: 'bg-green-100',
  default: 'bg-gray-100',
}

const variantTextStyles: Record<BadgeVariant, string> = {
  price: 'text-primary',
  status: 'text-green-800',
  default: 'text-gray-800',
}

export function Badge({
  label,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <View
      className={`self-start rounded-full px-3 py-1 ${variantContainerStyles[variant]} ${className}`}
    >
      <Text
        className={`text-xs font-medium ${variantTextStyles[variant]}`}
      >
        {label}
      </Text>
    </View>
  )
}
