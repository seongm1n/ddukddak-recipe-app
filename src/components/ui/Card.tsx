import React, { useRef, type ReactNode } from 'react'
import { View, TouchableOpacity, Platform, Animated } from 'react-native'

interface CardProps {
  readonly children: ReactNode
  readonly className?: string
  readonly onPress?: () => void
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

export function Card({
  children,
  className = '',
  onPress,
  onLongPress,
}: CardProps) {
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

  const cardStyles = `overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 ${className}`

  if (onPress || onLongPress) {
    return (
      <Animated.View style={[cardShadow, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          className={cardStyles}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <View style={cardShadow} className={cardStyles}>
      {children}
    </View>
  )
}
