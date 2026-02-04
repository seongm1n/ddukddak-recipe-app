import type { StorageService } from '../services/storage.service'

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'auth_refresh_token',
} as const

export class MockStorageService implements StorageService {
  private readonly store: Map<string, string> = new Map()

  async getToken(): Promise<string | null> {
    return this.store.get(STORAGE_KEYS.TOKEN) ?? null
  }

  async setToken(token: string): Promise<void> {
    this.store.set(STORAGE_KEYS.TOKEN, token)
  }

  async removeToken(): Promise<void> {
    this.store.delete(STORAGE_KEYS.TOKEN)
  }

  async getRefreshToken(): Promise<string | null> {
    return this.store.get(STORAGE_KEYS.REFRESH_TOKEN) ?? null
  }

  async setRefreshToken(token: string): Promise<void> {
    this.store.set(STORAGE_KEYS.REFRESH_TOKEN, token)
  }

  async removeRefreshToken(): Promise<void> {
    this.store.delete(STORAGE_KEYS.REFRESH_TOKEN)
  }
}
