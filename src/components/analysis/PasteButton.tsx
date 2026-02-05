import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface PasteButtonProps {
  readonly onPaste: () => void
}

export function PasteButton({ onPaste }: PasteButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPaste}
      activeOpacity={0.7}
      className="flex-row items-center justify-center rounded-xl bg-gray-50 py-3"
    >
      <Ionicons
        name="clipboard-outline"
        size={16}
        color="#FF6B35"
        style={{ marginRight: 6 }}
      />
      <Text className="text-sm font-medium text-primary">
        클립보드에서 붙여넣기
      </Text>
    </TouchableOpacity>
  )
}
