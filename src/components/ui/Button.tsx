import React from 'react'
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  type TouchableOpacityProps,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { gradients } from '@/constants/theme'
import { haptics } from '@/utils/haptics'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends Omit<TouchableOpacityProps, 'className'> {
  readonly variant?: ButtonVariant
  readonly title: string
  readonly onPress: () => void
  readonly disabled?: boolean
  readonly loading?: boolean
  readonly className?: string
}

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary',
}

const variantIndicatorColor: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  secondary: '#FFFFFF',
  outline: '#FF6B35',
}

function ButtonContent({
  loading,
  variant,
  title,
}: {
  readonly loading: boolean
  readonly variant: ButtonVariant
  readonly title: string
}) {
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantIndicatorColor[variant]}
          className="mr-2"
        />
      ) : null}
      <Text
        className={`text-base font-semibold ${variantTextStyles[variant]}`}
      >
        {title}
      </Text>
    </>
  )
}

export function Button({
  variant = 'primary',
  title,
  onPress,
  disabled = false,
  loading = false,
  className = '',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading

  const handlePress = () => {
    if (variant === 'primary') {
      haptics.light()
    }
    onPress()
  }

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.8}
        className={`overflow-hidden rounded-xl ${isDisabled ? 'opacity-50' : ''} ${className}`}
        style={
          isDisabled
            ? undefined
            : Platform.select({
                ios: {
                  shadowColor: '#FF6B35',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                },
                android: { elevation: 4 },
              })
        }
        {...rest}
      >
        <LinearGradient
          colors={[...gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 16 }}
        >
          <ButtonContent loading={loading} variant={variant} title={title} />
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  const variantStyles: Record<string, string> = {
    secondary: 'bg-secondary',
    outline: 'border border-primary bg-transparent',
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      className={`flex-row items-center justify-center rounded-xl px-6 py-4 ${variantStyles[variant]} ${isDisabled ? 'opacity-50' : ''} ${className}`}
      activeOpacity={0.8}
      {...rest}
    >
      <ButtonContent loading={loading} variant={variant} title={title} />
    </TouchableOpacity>
  )
}
