import React from 'react'
import { View, Text } from 'react-native'

interface ProfileHeaderProps {
  readonly userName: string
}

export function ProfileHeader({ userName }: ProfileHeaderProps) {
  return (
    <View className="items-center">
      <Text className="text-xl font-bold text-white">
        {userName}님, 안녕하세요!
      </Text>
      <Text className="mt-1 text-sm text-white/70">
        오늘도 맛있는 요리 해볼까요?
      </Text>
    </View>
  )
}
