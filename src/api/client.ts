import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { ENDPOINTS } from './endpoints'
import { storageService } from './services'

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://ca-ddukddak.thankfulsea-f53101da.koreacentral.azurecontainerapps.io'

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/v1`,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token)
    } else {
      promise.reject(error)
    }
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await storageService.getToken()

      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`)
      }
    } catch {
      // Token retrieval failed - proceed without auth header
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // 로그인/리프레시 요청 자체가 401이면 토큰 삭제 후 종료
    const url = originalRequest.url || ''
    if (url.includes('/auth/login') || url.includes('/auth/refresh')) {
      await clearTokens()
      return Promise.reject(error)
    }

    // 이미 갱신 중이면 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`
            }
            resolve(apiClient(originalRequest))
          },
          reject,
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshToken = await storageService.getRefreshToken()

      if (!refreshToken) {
        await clearTokens()
        processQueue(error, null)
        return Promise.reject(error)
      }

      const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH, { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = response.data.data ?? response.data

      await storageService.setToken(accessToken)
      if (newRefreshToken) {
        await storageService.setRefreshToken(newRefreshToken)
      }

      processQueue(null, accessToken)

      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return apiClient(originalRequest)
    } catch (refreshError) {
      await clearTokens()
      processQueue(refreshError, null)
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

async function clearTokens() {
  try {
    await storageService.removeToken()
    await storageService.removeRefreshToken()
  } catch {
    // Cleanup failed silently
  }
}
