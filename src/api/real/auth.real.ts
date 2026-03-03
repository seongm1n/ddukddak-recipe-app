import type { AxiosError } from 'axios'

import type { ApiResponse, AuthTokens, User } from '@/types'

import { apiClient } from '../client'
import { ENDPOINTS } from '../endpoints'
import type { AuthService } from '../services/auth.service'

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiResponse<unknown>>
  return axiosError.response?.data?.error || fallback
}

export class RealAuthService implements AuthService {
  async login(
    provider: 'apple' | 'google' | 'kakao',
    token: string,
  ): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, { provider, token })
      return response.data
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error, '로그인에 실패했습니다'),
      }
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '로그아웃에 실패했습니다',
      }
    }
  }

  async getMe(): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.get(ENDPOINTS.AUTH.ME)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '사용자 정보를 가져올 수 없습니다',
      }
    }
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<ApiResponse<AuthTokens>> {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH, {
        refreshToken,
      })
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '토큰 갱신에 실패했습니다',
      }
    }
  }

  async deleteAccount(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete(ENDPOINTS.AUTH.DELETE_ACCOUNT)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error, '회원 탈퇴에 실패했습니다'),
      }
    }
  }
}
