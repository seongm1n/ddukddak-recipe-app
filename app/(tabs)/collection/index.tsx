import React, { useEffect, useCallback } from 'react'
import { View, FlatList, Alert, TouchableOpacity, Platform, Text } from 'react-native'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppLogo } from '@/components/ui/AppLogo'
import { EmptyState } from '@/components/ui/EmptyState'
import { RecipeCard } from '@/components/collection/RecipeCard'
import { useRecipeStore } from '@/store/recipeStore'
import { gradients } from '@/constants/theme'
import { haptics } from '@/utils/haptics'
import type { Recipe } from '@/types'

const fabShadow = Platform.select({
  ios: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  android: { elevation: 6 },
})

export default function CollectionScreen() {
  const insets = useSafeAreaInsets()
  const savedRecipes = useRecipeStore((state) => state.savedRecipes)
  const loadSavedRecipes = useRecipeStore((state) => state.loadSavedRecipes)
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)

  useEffect(() => {
    loadSavedRecipes()
  }, [loadSavedRecipes])

  const handleAnalyze = useCallback(() => {
    haptics.light()
    router.push('/(tabs)/collection/analyze')
  }, [])

  const handleDelete = useCallback((recipe: Recipe) => {
    Alert.alert(
      '삭제 확인',
      `"${recipe.title}"을(를) 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => deleteRecipe(recipe.id),
        },
      ]
    )
  }, [deleteRecipe])

  const handlePress = useCallback((recipe: Recipe) => {
    useRecipeStore.getState().clearCurrentRecipe()
    useRecipeStore.setState({ currentRecipe: recipe })
    router.push('/(tabs)/collection/result')
  }, [])

  const renderItem = useCallback(({ item }: { item: Recipe }) => (
    <RecipeCard
      recipe={item}
      onPress={() => handlePress(item)}
      onLongPress={() => handleDelete(item)}
    />
  ), [handlePress, handleDelete])

  if (savedRecipes.length === 0) {
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
              <Text className="text-lg font-bold text-white">내 컬렉션</Text>
              <Text className="text-xs text-white/70">저장한 레시피를 관리해보세요</Text>
            </View>
          </View>
        </LinearGradient>
        <EmptyState
          icon="bookmark-outline"
          title="저장된 레시피가 없어요"
          description="요리 영상을 분석하고 레시피를 저장해보세요"
          actionLabel="레시피 분석하기"
          onAction={handleAnalyze}
        />
      </View>
    )
  }

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
            <Text className="text-lg font-bold text-white">내 컬렉션</Text>
            <Text className="text-xs text-white/70">저장한 레시피를 관리해보세요</Text>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        data={[...savedRecipes]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        onPress={handleAnalyze}
        activeOpacity={0.85}
        style={[
          {
            position: 'absolute',
            bottom: 96,
            right: 24,
            borderRadius: 28,
            overflow: 'hidden',
          },
          fabShadow,
        ]}
      >
        <LinearGradient
          colors={[...gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}
