import React, { useCallback, useLayoutEffect } from 'react'
import { View, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { router, Stack, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { VideoHeader } from '@/components/result/VideoHeader'
import { RecipeSteps } from '@/components/result/RecipeSteps'
import { IngredientList } from '@/components/result/IngredientList'
import { CostSummary } from '@/components/result/CostSummary'
import { Body } from '@/components/ui/Typography'
import { useRecipeStore } from '@/store/recipeStore'
import { haptics } from '@/utils/haptics'

export default function ResultScreen() {
  const navigation = useNavigation()
  const currentRecipe = useRecipeStore((state) => state.currentRecipe)
  const savedRecipes = useRecipeStore((state) => state.savedRecipes)
  const saveRecipe = useRecipeStore((state) => state.saveRecipe)
  const clearCurrentRecipe = useRecipeStore((state) => state.clearCurrentRecipe)

  // 탭바 숨기기
  useLayoutEffect(() => {
    const parent = navigation.getParent()
    parent?.setOptions({ tabBarStyle: { display: 'none' } })

    return () => {
      parent?.setOptions({ tabBarStyle: undefined })
    }
  }, [navigation])

  const isAlreadySaved = currentRecipe
    ? savedRecipes.some((r) => r.id === currentRecipe.id)
    : false

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
      <View className="flex-1 items-center justify-center bg-background-secondary">
        <Body>레시피를 찾을 수 없습니다.</Body>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '분석 결과',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)/collection')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView className="flex-1 bg-background-secondary" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-4">
          <VideoHeader
            title={currentRecipe.title}
            thumbnailUrl={currentRecipe.thumbnailUrl}
            channelName={currentRecipe.channelName}
            videoUrl={currentRecipe.videoUrl}
          />

          <View className="mt-4">
            <CostSummary
              totalCost={currentRecipe.totalCost}
              servings={currentRecipe.servings}
            />
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
            {isAlreadySaved ? (
              <View className="flex-row items-center justify-center rounded-xl bg-green-50 py-3">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Body className="ml-2 text-green-600">컬렉션에 저장됨</Body>
              </View>
            ) : (
              <Button title="저장하기" onPress={handleSave} />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  )
}
