import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import type { User } from '@/types'

interface ProfileHeaderProps {
  readonly user: User
  readonly recipeCount: number
}

function Avatar({ user }: { readonly user: User }) {
  const initial = user.name.charAt(0).toUpperCase()

  if (user.avatarUrl) {
    return (
      <View className="h-24 w-24 overflow-hidden rounded-full border-[3px] border-white/40">
        <Image
          source={{ uri: user.avatarUrl }}
          contentFit="cover"
          transition={300}
          className="h-full w-full"
        />
      </View>
    )
  }

  return (
    <View className="h-24 w-24 items-center justify-center rounded-full border-[3px] border-white/40 bg-white/20">
      <Text className="text-3xl font-bold text-white">
        {initial}
      </Text>
    </View>
  )
}

export function ProfileHeader({ user, recipeCount }: ProfileHeaderProps) {
  return (
    <View className="items-center gap-3">
      <Avatar user={user} />
      <View className="items-center">
        <Text className="text-xl font-bold text-white">
          {user.name}
        </Text>
        <Text className="mt-1 text-sm text-white/70">
          {user.email}
        </Text>
      </View>
      <View className="mt-1 flex-row items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5">
        <Ionicons name="bookmark" size={14} color="#FFFFFF" />
        <Text className="text-sm font-medium text-white">
          저장한 레시피 {recipeCount}개
        </Text>
      </View>
    </View>
  )
}
