import React, { useCallback } from 'react'
import { View, Alert, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { Button } from '@/components/ui/Button'
import { UrlInput } from '@/components/analysis/UrlInput'
import { PasteButton } from '@/components/analysis/PasteButton'
import { useYoutubeUrl } from '@/hooks/useYoutubeUrl'
import { useClipboard } from '@/hooks/useClipboard'
import { useRecipeStore } from '@/store/recipeStore'
import { haptics } from '@/utils/haptics'

const FEATURES = [
  { icon: 'basket-outline' as const, label: '재료', color: '#10B981' },
  { icon: 'list-outline' as const, label: '순서', color: '#6366F1' },
  { icon: 'calculator-outline' as const, label: '원가', color: '#F59E0B' },
]

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
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-8">
          {/* 헤더 섹션 */}
          <View className="mb-6">
            <View className="flex-row items-center">
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Ionicons name="sparkles" size={24} color="#FF6B35" />
              </View>
              <View>
                <Text className="text-2xl font-bold text-gray-900">AI 레시피 분석</Text>
                <Text className="text-sm text-gray-500">영상 URL만 입력하세요</Text>
              </View>
            </View>
          </View>

          {/* 입력 섹션 */}
          <View
            className="rounded-2xl bg-white p-5"
            style={Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
              },
              android: { elevation: 4 },
            })}
          >
            <Text className="mb-3 text-sm font-medium text-gray-700">YouTube URL</Text>
            <UrlInput
              value={url}
              onChangeText={validateUrl}
              isValid={isValid}
            />
            <View className="mt-3">
              <PasteButton onPaste={handlePaste} />
            </View>

            {/* 버튼을 입력 카드 안으로 이동 */}
            <View className="mt-5">
              <Button
                title="분석 시작하기"
                onPress={handleAnalyze}
                disabled={!isValid || isAnalyzing}
                loading={isAnalyzing}
              />
            </View>
          </View>

          {/* 분석 기능 미리보기 */}
          <View className="mt-8 flex-row justify-center gap-8">
            {FEATURES.map((feature) => (
              <View key={feature.label} className="items-center">
                <View
                  className="mb-2 h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Ionicons name={feature.icon} size={22} color={feature.color} />
                </View>
                <Text className="text-xs font-medium text-gray-500">{feature.label}</Text>
              </View>
            ))}
          </View>

          {/* 안내 문구 */}
          <View className="mt-6 items-center pb-8">
            <Text className="text-center text-xs leading-5 text-gray-400">
              AI가 영상을 분석하여{'\n'}재료, 조리 순서, 예상 원가를 알려드려요
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
