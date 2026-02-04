import React from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import { H1, Body } from '@/components/ui/Typography'
import { SocialLoginButton } from '@/components/auth/SocialLoginButton'
import { useAuth } from '@/hooks/useAuth'
import { gradients } from '@/constants/theme'

export default function LoginScreen() {
  const { login, isLoading } = useAuth()

  const handleLogin = async (provider: 'apple' | 'google') => {
    await login(provider)
    router.replace('/(tabs)')
  }

  return (
    <LinearGradient
      colors={[...gradients.hero]}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 32 }}>
          <View style={{ marginBottom: 64, alignItems: 'center' }}>
            <View style={{ marginBottom: 24, height: 80, width: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <Ionicons name="restaurant" size={40} color="#FFFFFF" />
            </View>
            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 }}>뚝딱레시피</Text>
            <Text style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
              요리 영상에서 레시피와 원가를{'\n'}뚝딱 계산해보세요!
            </Text>
          </View>

          <View style={{ gap: 16 }}>
            <SocialLoginButton
              provider="apple"
              onPress={() => handleLogin('apple')}
              isLoading={isLoading}
            />
            <SocialLoginButton
              provider="google"
              onPress={() => handleLogin('google')}
              isLoading={isLoading}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
