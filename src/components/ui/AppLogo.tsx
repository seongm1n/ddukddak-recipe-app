import React from 'react'
import { View } from 'react-native'
import Svg, { Path, Circle, Rect, G } from 'react-native-svg'

interface AppLogoProps {
  readonly size?: number
  readonly color?: string
}

export function AppLogo({ size = 32, color = '#FFFFFF' }: AppLogoProps) {
  const scale = size / 32

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <G scale={1}>
          {/* Frying pan body */}
          <Circle cx="14" cy="17" r="10" fill={color} opacity={0.25} />
          <Circle cx="14" cy="17" r="8.5" stroke={color} strokeWidth="1.8" fill="none" />
          {/* Pan handle */}
          <Rect x="22" y="15" width="9" height="3.5" rx="1.5" fill={color} opacity={0.9} />
          {/* Steam lines */}
          <Path
            d="M9 9 C9 6.5 11 6.5 11 4"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M14 8 C14 5.5 16 5.5 16 3"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M19 9 C19 6.5 21 6.5 21 4"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Sparkle - small star */}
          <Path
            d="M26 6 L27 8 L29 7 L27.5 9 L29.5 10 L27 9.5 L26 12 L25.5 9.5 L23 10 L25 9 L24 7 L26 8 Z"
            fill={color}
            opacity={0.7}
          />
        </G>
      </Svg>
    </View>
  )
}
