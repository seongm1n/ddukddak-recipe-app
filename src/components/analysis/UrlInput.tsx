import React from 'react'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface UrlInputProps {
  value: string
  onChangeText: (text: string) => void
  isValid: boolean
  error?: string
}

function getStatusIcon(value: string, isValid: boolean) {
  if (value.length === 0) {
    return null
  }

  if (isValid) {
    return (
      <Ionicons name="checkmark-circle" size={22} color="#10B981" />
    )
  }

  return <Ionicons name="close-circle" size={22} color="#EF4444" />
}

export function UrlInput({
  value,
  onChangeText,
  isValid,
}: UrlInputProps) {
  return (
    <View className="flex-row items-center rounded-lg border border-gray-200 bg-white px-3 py-2">
      <Ionicons
        name="logo-youtube"
        size={22}
        color="#FF0000"
        style={{ marginRight: 8 }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="YouTube 요리 영상 URL을 입력하세요"
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
