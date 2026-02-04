import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

interface VideoHeaderProps {
  readonly title: string
  readonly thumbnailUrl: string
  readonly channelName: string
}

export function VideoHeader({
  title,
  thumbnailUrl,
  channelName,
}: VideoHeaderProps) {
  return (
    <View>
      <View className="aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          source={{ uri: thumbnailUrl }}
          contentFit="cover"
          transition={300}
          className="h-full w-full"
          placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '33%' }}
        />
        <View className="absolute inset-0 items-center justify-center">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-black/30">
            <Ionicons name="play" size={28} color="#FFFFFF" />
          </View>
        </View>
      </View>
      <Text className="mt-4 text-xl font-bold text-gray-900">
        {title}
      </Text>
      <Text className="mt-1 text-sm text-gray-500">
        {channelName}
      </Text>
    </View>
  )
}
