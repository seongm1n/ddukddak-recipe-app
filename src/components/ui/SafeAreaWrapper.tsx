import React, { type ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type BackgroundVariant = 'white' | 'secondary'

interface SafeAreaWrapperProps {
  readonly children: ReactNode
  readonly variant?: BackgroundVariant
  readonly className?: string
}

const backgroundStyles: Record<BackgroundVariant, string> = {
  white: 'bg-white',
  secondary: 'bg-background-secondary',
}

export function SafeAreaWrapper({
  children,
  variant = 'white',
  className = '',
}: SafeAreaWrapperProps) {
  return (
    <SafeAreaView
      className={`flex-1 ${backgroundStyles[variant]} ${className}`}
    >
      {children}
    </SafeAreaView>
  )
}
