import React, { useEffect, useState, useCallback } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'

import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Body } from '@/components/ui/Typography'
import { VideoHeader } from '@/components/result/VideoHeader'
import { RecipeSteps } from '@/components/result/RecipeSteps'
import { IngredientList } from '@/components/result/IngredientList'
import { CostSummary } from '@/components/result/CostSummary'
import { feedService } from '@/api/services'
import { useRecipeStore } from '@/store/recipeStore'
import { haptics } from '@/utils/haptics'
import type { FeedItem } from '@/types'

export default function FeedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [feedItem, setFeedItem] = useState<FeedItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const saveRecipe = useRecipeStore((state) => state.saveRecipe)

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return
      try {
        const response = await feedService.getFeedDetail(id)
        if (response.success && response.data) {
          setFeedItem(response.data)
        }
      } catch {
        // silently fail
      } finally {
        setIsLoading(false)
      }
    }
    loadDetail()
  }, [id])

  const handleSave = useCallback(async () => {
    if (!feedItem) return
    try {
      await saveRecipe(feedItem.recipe)
      haptics.success()
      Alert.alert('저장 완료', '레시피가 컬렉션에 저장되었습니다.')
    } catch {
      haptics.error()
      Alert.alert('오류', '저장에 실패했습니다.')
    }
  }, [feedItem, saveRecipe])

  if (isLoading) {
    return (
      <View className="flex-1 bg-background-secondary">
        <LoadingSpinner message="레시피 로딩 중..." />
      </View>
    )
  }

  if (!feedItem) {
    return (
      <View className="flex-1 items-center justify-center bg-background-secondary">
        <Body>레시피를 찾을 수 없습니다.</Body>
      </View>
    )
  }

  const { recipe } = feedItem

  return (
    <>
      <Stack.Screen options={{ title: recipe.title, headerBackTitle: ' ', headerBackTitleVisible: false }} />
      <ScrollView className="flex-1 bg-background-secondary" showsVerticalScrollIndicator={false}>
          <View className="px-4 py-4">
            <VideoHeader
              title={recipe.title}
              thumbnailUrl={recipe.thumbnailUrl}
              channelName={recipe.channelName}
              videoUrl={recipe.videoUrl}
            />

            <View className="mt-4">
              <CostSummary
                totalCost={recipe.totalCost}
                servings={recipe.servings}
              />
            </View>

            <View className="mt-4">
              <Card className="p-0">
                <View className="p-4">
                  <IngredientList ingredients={recipe.ingredients} />
                </View>
              </Card>
            </View>

            <View className="mt-4">
              <Card className="p-0">
                <View className="p-4">
                  <RecipeSteps steps={recipe.steps} />
                </View>
              </Card>
            </View>

            <View className="mb-8 mt-6">
              <Button title="내 컬렉션에 저장하기" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
    </>
  )
}
