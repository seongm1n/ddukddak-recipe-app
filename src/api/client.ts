import axios from 'axios'

import { storageService } from './services'

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://api.ddukddak.com'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await storageService.getToken()

      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`)
      }
    } catch (error) {
      // Token retrieval failed - proceed without auth header
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await storageService.removeToken()
        await storageService.removeRefreshToken()
      } catch (cleanupError) {
        // Cleanup failed silently
      }
    }

    return Promise.reject(error)
  },
)
