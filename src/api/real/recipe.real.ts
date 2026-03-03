import type { AxiosError } from 'axios'

import type { ApiResponse, Recipe, RecipeAnalysisResult } from '@/types'

import { apiClient } from '../client'
import { ENDPOINTS } from '../endpoints'
import type { RecipeService } from '../services/recipe.service'

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiResponse<unknown>>
  return axiosError.response?.data?.error || fallback
}

export class RealRecipeService implements RecipeService {
  async analyze(videoUrl: string): Promise<ApiResponse<RecipeAnalysisResult>> {
    try {
      const response = await apiClient.post(
        ENDPOINTS.RECIPE.ANALYZE,
        { videoUrl },
        { timeout: 180000 },
      )
      return response.data
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error, '레시피 분석에 실패했습니다'),
      }
    }
  }

  async save(recipeId: string): Promise<ApiResponse<Recipe>> {
    try {
      const response = await apiClient.post(ENDPOINTS.RECIPE.SAVE, { recipeId })
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '레시피 저장에 실패했습니다',
      }
    }
  }

  async getSaved(): Promise<ApiResponse<Recipe[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.RECIPE.LIST)
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '저장된 레시피를 불러오는데 실패했습니다',
      }
    }
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete(ENDPOINTS.RECIPE.DELETE(id))
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '레시피 삭제에 실패했습니다',
      }
    }
  }
}
