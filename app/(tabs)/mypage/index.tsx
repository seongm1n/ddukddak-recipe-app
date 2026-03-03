import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Platform, Linking, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

import Constants from 'expo-constants'

import { ProfileHeader } from '@/components/mypage/ProfileHeader'
import { useAuth } from '@/hooks/useAuth'
import { useRecipeStore } from '@/store/recipeStore'
import { gradients } from '@/constants/theme'
import { haptics } from '@/utils/haptics'

const APP_VERSION = Constants.expoConfig?.version ?? '1.0.0'

interface MenuItemProps {
  readonly icon: keyof typeof Ionicons.glyphMap
  readonly label: string
  readonly onPress: () => void
  readonly showChevron?: boolean
  readonly danger?: boolean
}

function MenuItem({ icon, label, onPress, showChevron = true, danger = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center py-4"
    >
      <View
        className={`mr-3 h-9 w-9 items-center justify-center rounded-xl ${danger ? 'bg-red-50' : 'bg-gray-100'}`}
      >
        <Ionicons name={icon} size={18} color={danger ? '#EF4444' : '#6B7280'} />
      </View>
      <Text className={`flex-1 text-base ${danger ? 'text-red-500' : 'text-gray-800'}`}>
        {label}
      </Text>
      {showChevron && (
        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
      )}
    </TouchableOpacity>
  )
}

export default function MyPageScreen() {
  const insets = useSafeAreaInsets()
  const { user, logout, deleteAccount, isLoading } = useAuth()
  const savedRecipes = useRecipeStore((state) => state.savedRecipes)

  const handleFeedback = async () => {
    haptics.light()
    const url = 'mailto:support@ddukddak.app?subject=뚝딱레시피 피드백'
    const canOpen = await Linking.canOpenURL(url)
    if (canOpen) {
      await Linking.openURL(url)
    } else {
      Alert.alert('메일 앱 없음', 'support@ddukddak.app으로 피드백을 보내주세요.')
    }
  }

  const handleRating = async () => {
    haptics.light()
    // TODO: 스토어 등록 후 실제 ID로 교체
    const url = Platform.select({
      ios: 'itms-apps://apps.apple.com/app/id6743129337?action=write-review',
      android: 'market://details?id=com.ddukddak.recipe',
    })
    if (!url) return
    const canOpen = await Linking.canOpenURL(url)
    if (canOpen) {
      await Linking.openURL(url)
    } else {
      Alert.alert('준비 중', '앱 평가 기능은 스토어 출시 후 이용 가능합니다.')
    }
  }

  const handleTerms = () => {
    haptics.light()
    router.push('/(tabs)/mypage/terms')
  }

  const handlePrivacy = () => {
    haptics.light()
    router.push('/(tabs)/mypage/privacy')
  }

  const handleLogout = () => {
    haptics.light()
    logout()
  }

  const handleDeleteAccount = () => {
    haptics.light()
    Alert.alert(
      '회원 탈퇴',
      '정말 탈퇴하시겠습니까?\n저장된 레시피와 계정 정보가 모두 삭제됩니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '탈퇴하기',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              '마지막 확인',
              '이 작업은 되돌릴 수 없습니다. 정말 탈퇴하시겠습니까?',
              [
                { text: '취소', style: 'cancel' },
                {
                  text: '탈퇴 확인',
                  style: 'destructive',
                  onPress: async () => {
                    const success = await deleteAccount()
                    if (!success) {
                      Alert.alert('오류', '회원 탈퇴에 실패했습니다. 다시 시도해주세요.')
                    }
                  },
                },
              ],
            )
          },
        },
      ],
    )
  }

  return (
    <View className="flex-1 bg-background-secondary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[...gradients.primarySoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top }}
        >
          <View className="items-center pb-8 pt-6">
            <ProfileHeader userName={user?.name ?? '요리사'} />
          </View>
        </LinearGradient>

        {/* 통계 카드 */}
        <View className="-mt-4 mx-4">
          <View
            className="flex-row rounded-2xl bg-white p-4"
            style={Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
              },
              android: { elevation: 4 },
            })}
          >
            <View className="flex-1 items-center border-r border-gray-100">
              <Text className="text-2xl font-bold text-primary">{savedRecipes.length}</Text>
              <Text className="mt-1 text-xs text-gray-500">모아둔 레시피</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-primary">
                {savedRecipes.filter((r) => r.analyzedBy === user?.id).length}
              </Text>
              <Text className="mt-1 text-xs text-gray-500">뚝딱한 레시피</Text>
            </View>
          </View>
        </View>

        {/* 메뉴 섹션 */}
        <View className="mt-6 px-4">
          <View
            className="rounded-2xl bg-white px-4"
            style={Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
              },
              android: { elevation: 2 },
            })}
          >
            <MenuItem
              icon="chatbubble-outline"
              label="피드백 보내기"
              onPress={handleFeedback}
            />
            <View className="h-px bg-gray-100" />
            <MenuItem
              icon="star-outline"
              label="앱 평가하기"
              onPress={handleRating}
            />
          </View>
        </View>

        {/* 약관 섹션 */}
        <View className="mt-4 px-4">
          <View
            className="rounded-2xl bg-white px-4"
            style={Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
              },
              android: { elevation: 2 },
            })}
          >
            <MenuItem
              icon="document-text-outline"
              label="이용약관"
              onPress={handleTerms}
            />
            <View className="h-px bg-gray-100" />
            <MenuItem
              icon="shield-checkmark-outline"
              label="개인정보처리방침"
              onPress={handlePrivacy}
            />
          </View>
        </View>

        {/* 로그아웃 / 회원 탈퇴 */}
        <View className="mt-4 px-4">
          <View
            className="rounded-2xl bg-white px-4"
            style={Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
              },
              android: { elevation: 2 },
            })}
          >
            <MenuItem
              icon="log-out-outline"
              label="로그아웃"
              onPress={handleLogout}
              showChevron={false}
              danger
            />
            <View className="h-px bg-gray-100" />
            <MenuItem
              icon="trash-outline"
              label="회원 탈퇴"
              onPress={handleDeleteAccount}
              showChevron={false}
              danger
            />
          </View>
        </View>

        {/* 버전 정보 */}
        <View className="mt-8 items-center pb-8">
          <Text className="text-xs text-gray-400">뚝딱레시피 v{APP_VERSION}</Text>
        </View>
      </ScrollView>
    </View>
  )
}
