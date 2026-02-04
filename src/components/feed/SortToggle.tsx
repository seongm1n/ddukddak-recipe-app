import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { gradients } from '@/constants/theme'
import { haptics } from '@/utils/haptics'

type SortOption = 'latest' | 'popular'

interface SortToggleProps {
  readonly sortBy: SortOption
  readonly onChange: (sortBy: SortOption) => void
}

const options: readonly { value: SortOption; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
] as const

export function SortToggle({ sortBy, onChange }: SortToggleProps) {
  const handleChange = (value: SortOption) => {
    haptics.light()
    onChange(value)
  }

  return (
    <View className="flex-row rounded-xl bg-gray-100 p-1">
      {options.map((option) => {
        const isActive = sortBy === option.value

        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleChange(option.value)}
            activeOpacity={0.8}
            className="flex-1 overflow-hidden rounded-lg"
            style={
              isActive
                ? Platform.select({
                    ios: {
                      shadowColor: '#FF6B35',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    },
                    android: { elevation: 2 },
                  })
                : undefined
            }
          >
            {isActive ? (
              <LinearGradient
                colors={[...gradients.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 }}
              >
                <Text className="text-sm font-semibold text-white">
                  {option.label}
                </Text>
              </LinearGradient>
            ) : (
              <View className="items-center px-4 py-2.5">
                <Text className="text-sm font-medium text-gray-500">
                  {option.label}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
