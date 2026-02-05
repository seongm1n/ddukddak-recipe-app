import React, { useEffect } from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

import { GradientBackground } from '@/components/ui/GradientBackground'
import { H2, Body } from '@/components/ui/Typography'
import { AnalysisProgress } from '@/components/loading/AnalysisProgress'
import { useRecipeStore } from '@/store/recipeStore'
import { gradients } from '@/constants/theme'

export default function LoadingScreen() {
  const isAnalyzing = useRecipeStore((state) => state.isAnalyzing)
  const currentRecipe = useRecipeStore((state) => state.currentRecipe)
  const analysisSteps = useRecipeStore((state) => state.analysisSteps)

  useEffect(() => {
    if (!isAnalyzing && currentRecipe) {
      router.replace('/(tabs)/collection/result')
    }
  }, [isAnalyzing, currentRecipe])

  return (
    <GradientBackground colors={[...gradients.hero]}>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-8">
          <H2 className="mb-2 text-center text-white">레시피 분석 중</H2>
          <Body className="mb-12 text-center text-white/70">
            영상에서 레시피와 재료 원가를 추출하고 있어요
          </Body>
          <AnalysisProgress steps={[...analysisSteps]} />
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}
