import type { ApiResponse, AuthTokens, User } from '@/types'

export interface AuthService {
  login(
    provider: 'apple' | 'google',
  ): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>>
  logout(): Promise<ApiResponse<void>>
  getMe(): Promise<ApiResponse<User>>
  refreshToken(refreshToken: string): Promise<ApiResponse<AuthTokens>>
}
