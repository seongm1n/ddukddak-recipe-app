import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { AnalysisStep } from '@/types'

interface AnalysisProgressProps {
  readonly steps: readonly AnalysisStep[]
}

function PulsingDot() {
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    )
    animation.start()
    return () => animation.stop()
  }, [opacity])

  return (
    <Animated.View
      style={{ opacity }}
      className="h-[22px] w-[22px] items-center justify-center rounded-full bg-white"
    >
      <View className="h-2.5 w-2.5 rounded-full bg-primary" />
    </Animated.View>
  )
}

function StepIcon({ status }: { readonly status: AnalysisStep['status'] }) {
  switch (status) {
    case 'completed':
      return (
        <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-white">
          <Ionicons name="checkmark" size={14} color="#10B981" />
        </View>
      )
    case 'in_progress':
      return <PulsingDot />
    case 'pending':
      return (
        <View className="h-[22px] w-[22px] rounded-full border-2 border-white/30" />
      )
  }
}

function StepRow({
  step,
  index,
}: {
  readonly step: AnalysisStep
  readonly index: number
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 150,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim, index])

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="flex-row items-center gap-3"
    >
      <StepIcon status={step.status} />
      <Text className={`text-base ${statusTextStyle[step.status]}`}>
        {step.label}
      </Text>
    </Animated.View>
  )
}

const statusTextStyle: Record<AnalysisStep['status'], string> = {
  completed: 'text-white/90',
  in_progress: 'text-white font-bold',
  pending: 'text-white/40',
}

export function AnalysisProgress({ steps }: AnalysisProgressProps) {
  return (
    <View className="gap-5">
      {steps.map((step, index) => (
        <StepRow key={step.label} step={step} index={index} />
      ))}
    </View>
  )
}
