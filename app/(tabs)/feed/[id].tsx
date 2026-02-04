import React, { useEffect, useState, useCallback } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { Image } from 'expo-image'

import { SafeAreaWrapper } from '@/components/ui/SafeAreaWrapper'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Body, Caption } from '@/components/ui/Typography'
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
      <SafeAreaWrapper variant="secondary">
        <LoadingSpinner message="레시피 로딩 중..." />
      </SafeAreaWrapper>
    )
  }

  if (!feedItem) {
    return (
      <SafeAreaWrapper variant="secondary">
        <View className="flex-1 items-center justify-center">
          <Body>레시피를 찾을 수 없습니다.</Body>
        </View>
      </SafeAreaWrapper>
    )
  }

  const { recipe, author } = feedItem

  return (
    <>
      <Stack.Screen options={{ title: recipe.title }} />
      <SafeAreaWrapper variant="secondary">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-4 py-4">
            <Card className="mb-4 p-0">
              <View className="flex-row items-center p-4">
                {author.avatarUrl ? (
                  <Image
                    source={{ uri: author.avatarUrl }}
                    contentFit="cover"
                    className="mr-3 h-10 w-10 rounded-full"
                  />
                ) : (
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <Body className="font-bold text-primary">
                      {author.name.charAt(0)}
                    </Body>
                  </View>
                )}
                <View>
                  <Body className="font-semibold">{author.name}</Body>
                  <Caption>{author.email}</Caption>
                </View>
              </View>
            </Card>

            <VideoHeader
              title={recipe.title}
              thumbnailUrl={recipe.thumbnailUrl}
              channelName={recipe.channelName}
            />

            <View className="mt-4">
              <Card className="p-0">
                <View className="p-4">
                  <CostSummary
                    totalCost={recipe.totalCost}
                    servings={recipe.servings}
                  />
                </View>
              </Card>
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
      </SafeAreaWrapper>
    </>
  )
}
