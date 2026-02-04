import React, { type ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

interface GradientBackgroundProps {
  readonly colors: readonly string[]
  readonly children: ReactNode
  readonly className?: string
  readonly start?: { x: number; y: number }
  readonly end?: { x: number; y: number }
}

export function GradientBackground({
  colors,
  children,
  className = '',
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={colors as string[]}
      start={start}
      end={end}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  )
}
