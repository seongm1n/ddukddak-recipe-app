import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import YoutubePlayer from 'react-native-youtube-iframe'

interface VideoHeaderProps {
  readonly title: string
  readonly thumbnailUrl: string
  readonly channelName: string
  readonly videoUrl: string
}

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\s?]+)/)
  return match ? match[1] : null
}

export function VideoHeader({
  title,
  thumbnailUrl,
  channelName,
  videoUrl,
}: VideoHeaderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = extractVideoId(videoUrl)

  const handleOpenYoutube = useCallback(() => {
    Linking.openURL(videoUrl)
  }, [videoUrl])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  return (
    <View>
      <View className="aspect-video w-full overflow-hidden rounded-2xl">
        {isPlaying && videoId ? (
          <YoutubePlayer
            height={220}
            videoId={videoId}
            play={true}
          />
        ) : (
          <>
            <Image
              source={{ uri: thumbnailUrl }}
              contentFit="cover"
              transition={300}
              style={{ width: '100%', height: '100%' }}
              placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.4)']}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '33%' }}
            />
            <TouchableOpacity
              onPress={handlePlay}
              className="absolute inset-0 items-center justify-center"
              activeOpacity={0.8}
            >
              <View className="h-16 w-16 items-center justify-center rounded-full bg-black/40">
                <Ionicons name="play" size={32} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View className="mt-4 flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-xl font-bold text-gray-900">
            {title}
          </Text>
          <Text className="mt-1 text-sm text-gray-500">
            {channelName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleOpenYoutube}
          className="flex-row items-center gap-1.5 rounded-full bg-red-500 px-3 py-2"
          activeOpacity={0.8}
        >
          <Ionicons name="play-circle" size={16} color="#FFFFFF" />
          <Text className="text-xs font-semibold text-white">원본 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
