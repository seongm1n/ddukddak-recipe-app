import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Pressable, Animated } from 'react-native'
import { router, usePathname } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { Body, Caption } from '@/components/ui/Typography'
import { useRecipeStore } from '@/store/recipeStore'

export function AnalysisBanner() {
  const isAnalyzing = useRecipeStore((state) => state.isAnalyzing)
  const currentRecipe = useRecipeStore((state) => state.currentRecipe)
  const pathname = usePathname()
  const [dismissed, setDismissed] = useState(false)

  const pulseAnim = useRef(new Animated.Value(1)).current

  // 새 분석이 시작되면 dismissed 초기화
  useEffect(() => {
    if (isAnalyzing) {
      setDismissed(false)
    }
  }, [isAnalyzing])

  const isOnLoadingScreen = pathname === '/loading'
  const isOnResultScreen = pathname.includes('/result')
  const showAnalyzing = isAnalyzing && !isOnLoadingScreen
  const showCompleted =
    !isAnalyzing && currentRecipe !== null && !isOnLoadingScreen && !isOnResultScreen && !dismissed

  useEffect(() => {
    if (!showAnalyzing) {
      pulseAnim.setValue(1)
      return
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    )
    animation.start()

    return () => animation.stop()
  }, [showAnalyzing, pulseAnim])

  const handlePress = useCallback(() => {
    if (showCompleted) {
      setDismissed(true)
      router.push('/(tabs)/collection/result')
    } else {
      router.push('/loading')
    }
  }, [showCompleted])

  const handleDismiss = useCallback(() => {
    setDismissed(true)
  }, [])

  if (!showAnalyzing && !showCompleted) return null

  const backgroundColor = showCompleted ? '#10B981' : '#FF6B35'

  return (
    <Pressable
      onPress={handlePress}
      style={{
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        zIndex: 999,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 14,
          backgroundColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        {showCompleted ? (
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
        ) : (
          <Animated.View style={{ opacity: pulseAnim }}>
            <Ionicons name="hourglass" size={20} color="#fff" />
          </Animated.View>
        )}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Body className="font-semibold text-white">
            {showCompleted ? '분석 완료!' : '레시피 분석 중...'}
          </Body>
          <Caption className="text-white/80">
            {showCompleted ? '탭하여 결과 보기' : '탭하여 진행 상황 보기'}
          </Caption>
        </View>
        {showCompleted ? (
          <Pressable
            onPress={handleDismiss}
            hitSlop={8}
            style={{ padding: 4 }}
          >
            <Ionicons name="close" size={18} color="rgba(255,255,255,0.7)" />
          </Pressable>
        ) : (
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.7)" />
        )}
      </View>
    </Pressable>
  )
}
