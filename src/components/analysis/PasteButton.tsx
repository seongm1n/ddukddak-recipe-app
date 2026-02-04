import React from 'react'
import { Text, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface PasteButtonProps {
  readonly onPaste: () => void
}

export function PasteButton({ onPaste }: PasteButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPaste}
      activeOpacity={0.7}
      style={Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
        },
        android: { elevation: 1 },
      })}
      className="flex-row items-center self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5"
    >
      <Ionicons
        name="clipboard-outline"
        size={16}
        color="#6B7280"
        style={{ marginRight: 8 }}
      />
      <Text className="text-sm font-medium text-gray-500">
        클립보드에서 붙여넣기
      </Text>
    </TouchableOpacity>
  )
}
