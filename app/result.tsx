import React, { useCallback } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { router, Stack } from 'expo-router'

import { SafeAreaWrapper } from '@/components/ui/SafeAreaWrapper'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { VideoHeader } from '@/components/result/VideoHeader'
import { RecipeSteps } from '@/components/result/RecipeSteps'
import { IngredientList } from '@/components/result/IngredientList'
import { CostSummary } from '@/components/result/CostSummary'
import { useRecipeStore } from '@/store/recipeStore'
import { haptics } from '@/utils/haptics'

export default function ResultScreen() {
  const currentRecipe = useRecipeStore((state) => state.currentRecipe)
  const saveRecipe = useRecipeStore((state) => state.saveRecipe)
  const clearCurrentRecipe = useRecipeStore((state) => state.clearCurrentRecipe)

  const handleSave = useCallback(async () => {
    if (!currentRecipe) return
    try {
      await saveRecipe(currentRecipe)
      haptics.success()
      Alert.alert('저장 완료', '레시피가 컬렉션에 저장되었습니다.', [
        { text: '확인', onPress: () => {
          clearCurrentRecipe()
          router.replace('/(tabs)/collection')
        }}
      ])
    } catch {
      haptics.error()
      Alert.alert('오류', '저장에 실패했습니다.')
    }
  }, [currentRecipe, saveRecipe, clearCurrentRecipe])

  if (!currentRecipe) {
    return (
      <SafeAreaWrapper variant="secondary">
        <View className="flex-1 items-center justify-center">
          <Button title="컬렉션으로 돌아가기" onPress={() => router.replace('/(tabs)/collection')} />
        </View>
      </SafeAreaWrapper>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: '분석 결과', headerBackTitle: '뒤로' }} />
      <SafeAreaWrapper variant="secondary">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-4 py-4">
            <VideoHeader
              title={currentRecipe.title}
              thumbnailUrl={currentRecipe.thumbnailUrl}
              channelName={currentRecipe.channelName}
            />

            <View className="mt-4">
              <Card className="p-0">
                <View className="p-4">
                  <CostSummary
                    totalCost={currentRecipe.totalCost}
                    servings={currentRecipe.servings}
                  />
                </View>
              </Card>
            </View>

            <View className="mt-4">
              <Card className="p-0">
                <View className="p-4">
                  <IngredientList ingredients={currentRecipe.ingredients} />
                </View>
              </Card>
            </View>

            <View className="mt-4">
              <Card className="p-0">
                <View className="p-4">
                  <RecipeSteps steps={currentRecipe.steps} />
                </View>
              </Card>
            </View>

            <View className="mb-8 mt-6">
              <Button title="저장하기" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaWrapper>
    </>
  )
}
