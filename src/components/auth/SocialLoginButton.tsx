import React from 'react'
import { Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { haptics } from '@/utils/haptics'

interface SocialLoginButtonProps {
  readonly provider: 'apple' | 'google'
  readonly onPress: () => void
  readonly isLoading?: boolean
}

const providerConfig = {
  apple: {
    icon: 'logo-apple' as const,
    label: 'Apple로 계속하기',
    containerStyle: 'bg-black',
    textStyle: 'text-white',
    iconColor: '#FFFFFF',
    indicatorColor: '#FFFFFF',
  },
  google: {
    icon: 'logo-google' as const,
    label: 'Google로 계속하기',
    containerStyle: 'bg-white border border-gray-200',
    textStyle: 'text-gray-800',
    iconColor: '#4285F4',
    indicatorColor: '#4285F4',
  },
} as const

const buttonShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  android: { elevation: 3 },
})

export function SocialLoginButton({
  provider,
  onPress,
  isLoading = false,
}: SocialLoginButtonProps) {
  const config = providerConfig[provider]

  const handlePress = () => {
    haptics.medium()
    onPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.8}
      style={buttonShadow}
      className={`flex-row items-center justify-center rounded-xl px-6 py-4 ${config.containerStyle} ${isLoading ? 'opacity-50' : ''}`}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={config.indicatorColor}
          className="mr-3"
        />
      ) : (
        <Ionicons
          name={config.icon}
          size={20}
          color={config.iconColor}
          style={{ marginRight: 12 }}
        />
      )}
      <Text className={`text-base font-semibold ${config.textStyle}`}>
        {config.label}
      </Text>
    </TouchableOpacity>
  )
}
