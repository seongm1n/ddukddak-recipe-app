import React, { useCallback } from 'react'
import { View, Alert } from 'react-native'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import { SafeAreaWrapper } from '@/components/ui/SafeAreaWrapper'
import { H2, Body } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { UrlInput } from '@/components/analysis/UrlInput'
import { PasteButton } from '@/components/analysis/PasteButton'
import { useYoutubeUrl } from '@/hooks/useYoutubeUrl'
import { useClipboard } from '@/hooks/useClipboard'
import { useRecipeStore } from '@/store/recipeStore'
import { haptics } from '@/utils/haptics'
import { gradients } from '@/constants/theme'

export default function AnalyzeScreen() {
  const { url, isValid, validateUrl } = useYoutubeUrl()
  const { readClipboard, hasYoutubeUrl } = useClipboard()
  const analyzeUrl = useRecipeStore((state) => state.analyzeUrl)
  const isAnalyzing = useRecipeStore((state) => state.isAnalyzing)

  const handlePaste = useCallback(async () => {
    haptics.light()
    const text = await readClipboard()
    if (text && hasYoutubeUrl(text)) {
      validateUrl(text)
    } else {
      Alert.alert('알림', '클립보드에 YouTube URL이 없습니다.')
    }
  }, [readClipboard, hasYoutubeUrl, validateUrl])

  const handleAnalyze = useCallback(async () => {
    if (!isValid) return
    haptics.medium()
    router.push('/loading')
    await analyzeUrl(url)
  }, [isValid, url, analyzeUrl])

  return (
    <SafeAreaWrapper>
      <View className="flex-1">
        <LinearGradient
          colors={[...gradients.primarySoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: 24, paddingBottom: 32, paddingTop: 24 }}
        >
          <H2 className="mb-1 text-white">레시피 분석</H2>
          <Body className="text-white/80">
            요리 영상 URL을 입력하면 레시피와 원가를 분석해드려요
          </Body>
        </LinearGradient>

        <View className="flex-1 px-6 pt-6">
          <View className="mb-4">
            <UrlInput
              value={url}
              onChangeText={validateUrl}
              isValid={isValid}
              error={url.length > 0 && !isValid ? '올바른 YouTube URL을 입력해주세요' : undefined}
            />
          </View>

          <PasteButton onPaste={handlePaste} />

          <View className="mt-8">
            <Button
              title="원가 계산하기"
              onPress={handleAnalyze}
              disabled={!isValid || isAnalyzing}
              loading={isAnalyzing}
            />
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  )
}
