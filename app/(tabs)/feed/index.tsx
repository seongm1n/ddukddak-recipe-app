import React, { useEffect, useCallback } from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppLogo } from '@/components/ui/AppLogo'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { FeedCard } from '@/components/feed/FeedCard'
import { SortToggle } from '@/components/feed/SortToggle'
import { useFeedStore } from '@/store/feedStore'
import { gradients } from '@/constants/theme'
import type { FeedItem } from '@/types'

export default function FeedScreen() {
  const insets = useSafeAreaInsets()
  const feedItems = useFeedStore((state) => state.feedItems)
  const sortBy = useFeedStore((state) => state.sortBy)
  const isLoading = useFeedStore((state) => state.isLoading)
  const loadFeed = useFeedStore((state) => state.loadFeed)
  const loadMore = useFeedStore((state) => state.loadMore)
  const changeSortOrder = useFeedStore((state) => state.changeSortOrder)
  const refresh = useFeedStore((state) => state.refresh)

  useEffect(() => {
    loadFeed()
  }, [loadFeed])

  const handlePress = useCallback((item: FeedItem) => {
    router.push(`/(tabs)/feed/${item.id}`)
  }, [])

  const renderItem = useCallback(({ item }: { item: FeedItem }) => (
    <FeedCard
      item={item}
      onPress={() => handlePress(item)}
    />
  ), [handlePress])

  return (
    <View className="flex-1 bg-background-secondary">
      <LinearGradient
        colors={[...gradients.primarySoft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 16, paddingTop: insets.top + 8, paddingBottom: 16 }}
      >
        <View className="flex-row items-center">
          <AppLogo size={36} />
          <View className="ml-2.5">
            <Text className="text-lg font-bold text-white">뚝딱 레시피</Text>
            <Text className="text-xs text-white/70">오늘 뭐 해먹지?</Text>
          </View>
        </View>
      </LinearGradient>
      <View className="px-4 pb-2 pt-3">
        <SortToggle sortBy={sortBy} onChange={changeSortOrder} />
      </View>
      {isLoading && feedItems.length === 0 ? (
        <LoadingSpinner message="피드 로딩 중..." />
      ) : feedItems.length === 0 ? (
        <EmptyState
          icon="newspaper-outline"
          title="피드가 비어있어요"
          description="아직 공유된 레시피가 없습니다"
        />
      ) : (
        <FlatList
          data={[...feedItems]}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
        />
      )}
    </View>
  )
}
