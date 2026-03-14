import React, { useEffect } from 'react'
import { View, Pressable } from 'react-native'
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
  const error = useRecipeStore((state) => state.error)
  const clearError = useRecipeStore((state) => state.clearError)

  useEffect(() => {
    if (!isAnalyzing && currentRecipe) {
      router.replace('/(tabs)/collection/result')
    }
  }, [isAnalyzing, currentRecipe])

  const handleGoBack = () => {
    clearError()
    router.back()
  }

  return (
    <GradientBackground colors={[...gradients.hero]}>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-8">
          <H2 className="mb-2 text-center text-white">
            {error ? '분석 실패' : '레시피 분석 중'}
          </H2>
          <Body className="mb-12 text-center text-white/70">
            {error || '영상에서 레시피와 재료 원가를 추출하고 있어요'}
          </Body>
          {error ? (
            <Pressable
              onPress={handleGoBack}
              style={{
                paddingHorizontal: 32,
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}
            >
              <Body className="text-center font-semibold text-white">돌아가기</Body>
            </Pressable>
          ) : (
            <>
              <AnalysisProgress steps={[...analysisSteps]} />
              <Pressable
                onPress={() => router.back()}
                style={{
                  marginTop: 32,
                  paddingHorizontal: 32,
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <Body className="text-center font-semibold text-white">
                  다른 화면 둘러보기
                </Body>
              </Pressable>
            </>
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}
