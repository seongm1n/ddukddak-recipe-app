import type { ApiResponse, AuthTokens, User } from '@/types'

import type { AuthService } from '../services/auth.service'
import { MOCK_USER } from './data'
import { MockStorageService } from './storage.mock'

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateMockToken = (): string =>
  `mock_token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

export class MockAuthService implements AuthService {
  private readonly storageService = new MockStorageService()

  async login(
    _provider: 'apple' | 'google',
  ): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    await delay(500)

    const tokens: AuthTokens = {
      accessToken: generateMockToken(),
      refreshToken: generateMockToken(),
    }

    await this.storageService.setToken(tokens.accessToken)
    await this.storageService.setRefreshToken(tokens.refreshToken)

    return {
      success: true,
      data: {
        user: MOCK_USER,
        tokens,
      },
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    await delay(200)

    await this.storageService.removeToken()
    await this.storageService.removeRefreshToken()

    return { success: true }
  }

  async getMe(): Promise<ApiResponse<User>> {
    await delay(300)

    return {
      success: true,
      data: MOCK_USER,
    }
  }

  async refreshToken(
    _refreshToken: string,
  ): Promise<ApiResponse<AuthTokens>> {
    await delay(300)

    const tokens: AuthTokens = {
      accessToken: generateMockToken(),
      refreshToken: generateMockToken(),
    }

    await this.storageService.setToken(tokens.accessToken)
    await this.storageService.setRefreshToken(tokens.refreshToken)

    return {
      success: true,
      data: tokens,
    }
  }
}
