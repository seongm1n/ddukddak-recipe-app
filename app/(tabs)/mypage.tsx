import React from 'react'
import { View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/Button'
import { Caption } from '@/components/ui/Typography'
import { ProfileHeader } from '@/components/mypage/ProfileHeader'
import { useAuth } from '@/hooks/useAuth'
import { useRecipeStore } from '@/store/recipeStore'
import { gradients } from '@/constants/theme'

export default function MyPageScreen() {
  const { user, logout, isLoading } = useAuth()
  const savedRecipes = useRecipeStore((state) => state.savedRecipes)

  return (
    <View className="flex-1 bg-background-secondary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[...gradients.primarySoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <SafeAreaView edges={['top']}>
            <View className="items-center pb-8 pt-6">
              {user && (
                <ProfileHeader
                  user={user}
                  recipeCount={savedRecipes.length}
                />
              )}
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View className="px-6 pt-8">
          <Button
            title="로그아웃"
            variant="outline"
            onPress={logout}
            loading={isLoading}
          />

          <View className="mt-8 items-center pb-8">
            <Caption>뚝딱레시피 v1.0.0</Caption>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
