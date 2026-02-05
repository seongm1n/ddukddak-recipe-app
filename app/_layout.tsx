import '../global.css'

import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack, useRouter, useSegments, useNavigationContainerRef } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useAuthStore } from '@/store/authStore'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const segments = useSegments()
  const router = useRouter()
  const navigationRef = useNavigationContainerRef()
  const [isNavigationReady, setIsNavigationReady] = useState(false)

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      setIsNavigationReady(true)
    })
    return unsubscribe
  }, [navigationRef])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isNavigationReady || isLoading) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login')
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)')
    }
  }, [isAuthenticated, isLoading, segments, isNavigationReady])

  return <>{children}</>
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="loading"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack>
      </AuthGuard>
    </SafeAreaProvider>
  )
}
