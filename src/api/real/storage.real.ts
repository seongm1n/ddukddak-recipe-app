import * as SecureStore from 'expo-secure-store'

import type { StorageService } from '../services/storage.service'

const TOKEN_KEY = 'ddukddak_access_token'
const REFRESH_TOKEN_KEY = 'ddukddak_refresh_token'

export class RealStorageService implements StorageService {
  async getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY)
  }

  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token)
  }

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
  }

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
  }

  async setRefreshToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token)
  }

  async removeRefreshToken(): Promise<void> {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
  }
}
