import React from 'react'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface UrlInputProps {
  value: string
  onChangeText: (text: string) => void
  isValid: boolean
}

function getStatusIcon(value: string, isValid: boolean) {
  if (value.length === 0) {
    return <Ionicons name="link" size={20} color="#D1D5DB" />
  }

  if (isValid) {
    return <Ionicons name="checkmark-circle" size={20} color="#10B981" />
  }

  return <Ionicons name="alert-circle" size={20} color="#EF4444" />
}

function getBorderColor(value: string, isValid: boolean) {
  if (value.length === 0) return 'border-gray-200'
  if (isValid) return 'border-green-400'
  return 'border-red-400'
}

export function UrlInput({
  value,
  onChangeText,
  isValid,
}: UrlInputProps) {
  return (
    <View className={`flex-row items-center rounded-xl border-2 bg-gray-50 px-4 py-3.5 ${getBorderColor(value, isValid)}`}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="https://youtube.com/watch?v=..."
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        className="flex-1 text-base text-gray-800"
      />
      {getStatusIcon(value, isValid)}
    </View>
  )
}
