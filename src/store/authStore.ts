import { create } from 'zustand'

import { authService, storageService } from '@/api/services'
import { getSocialToken } from '@/auth/socialAuthProvider'
import type { User, AuthTokens } from '@/types'

interface AuthState {
  readonly user: User | null
  readonly tokens: AuthTokens | null
  readonly isAuthenticated: boolean
  readonly isLoading: boolean
  readonly error: string | null
}

interface AuthActions {
  login: (provider: 'apple' | 'google' | 'kakao') => Promise<void>
  logout: () => Promise<void>
  deleteAccount: () => Promise<boolean>
  checkAuth: () => Promise<void>
  setTokens: (tokens: AuthTokens) => void
  clearError: () => void
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  login: async (provider) => {
    set({ isLoading: true, error: null })
    try {
      const { token } = await getSocialToken(provider)

      const response = await authService.login(provider, token)

      if (response.success && response.data) {
        const { user, tokens } = response.data

        await storageService.setToken(tokens.accessToken)
        await storageService.setRefreshToken(tokens.refreshToken)

        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        set({
          error: response.error || '로그인에 실패했습니다',
          isLoading: false,
        })
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다'
      set({
        error: message,
        isLoading: false,
      })
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await authService.logout()
      await storageService.removeToken()
      await storageService.removeRefreshToken()
    } catch {
      // Proceed with local logout even if server logout fails
    } finally {
      set({ ...initialState })
    }
  },

  deleteAccount: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.deleteAccount()

      if (!response.success) {
        set({
          error: response.error || '회원 탈퇴에 실패했습니다',
          isLoading: false,
        })
        return false
      }

      await storageService.removeToken()
      await storageService.removeRefreshToken()
      set({ ...initialState })
      return true
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '회원 탈퇴 중 오류가 발생했습니다'
      set({ error: message, isLoading: false })
      return false
    }
  },

  checkAuth: async () => {
    set({ isLoading: true })
    try {
      const token = await storageService.getToken()

      if (!token) {
        set({ isAuthenticated: false, isLoading: false })
        return
      }

      const response = await authService.getMe()

      if (response.success && response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        set({ isAuthenticated: false, isLoading: false })
      }
    } catch {
      set({ isAuthenticated: false, isLoading: false })
    }
  },

  setTokens: (tokens) => set({ tokens }),

  clearError: () => set({ error: null }),
}))
