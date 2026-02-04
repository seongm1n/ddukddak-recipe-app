import type { ApiResponse, Recipe, RecipeAnalysisResult } from '@/types'

export interface RecipeService {
  analyze(videoUrl: string): Promise<ApiResponse<RecipeAnalysisResult>>
  save(recipe: Recipe): Promise<ApiResponse<Recipe>>
  getSaved(): Promise<ApiResponse<Recipe[]>>
  delete(id: string): Promise<ApiResponse<void>>
}
