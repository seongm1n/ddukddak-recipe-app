import React from 'react'
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
} from 'react-native'

interface InputProps extends Omit<TextInputProps, 'className'> {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  error?: string
  secureTextEntry?: boolean
  className?: string
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  className = '',
  ...rest
}: InputProps) {
  const borderStyle = error
    ? 'border-red-500'
    : 'border-gray-300 focus:border-primary'

  return (
    <View className={`w-full ${className}`}>
      {label ? (
        <Text className="mb-1.5 text-sm font-medium text-text">
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        className={`rounded-lg border px-4 py-3 text-base text-text ${borderStyle}`}
        {...rest}
      />
      {error ? (
        <Text className="mt-1 text-sm text-red-500">
          {error}
        </Text>
      ) : null}
    </View>
  )
}
