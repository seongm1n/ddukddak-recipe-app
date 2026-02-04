import type { AnalysisStep, ApiResponse, Recipe, RecipeAnalysisResult } from '@/types'

import type { RecipeService } from '../services/recipe.service'
import { MOCK_RECIPES } from './data'

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export class MockRecipeService implements RecipeService {
  private savedRecipes: readonly Recipe[] = []

  async analyze(
    _videoUrl: string,
  ): Promise<ApiResponse<RecipeAnalysisResult>> {
    const analysisSteps: readonly AnalysisStep[] = [
      { label: '영상 정보 가져오는 중...', status: 'pending' },
      { label: '자막 분석 중...', status: 'pending' },
      { label: '재료 추출 중...', status: 'pending' },
      { label: '가격 계산 중...', status: 'pending' },
    ]

    // Simulate step-by-step analysis with 3-second total delay
    await delay(750)
    const step1Complete: readonly AnalysisStep[] = analysisSteps.map(
      (step, index) =>
        index === 0 ? { ...step, status: 'completed' as const } : step,
    )

    await delay(750)
    const step2Complete: readonly AnalysisStep[] = step1Complete.map(
      (step, index) =>
        index === 1 ? { ...step, status: 'completed' as const } : step,
    )

    await delay(750)
    const step3Complete: readonly AnalysisStep[] = step2Complete.map(
      (step, index) =>
        index === 2 ? { ...step, status: 'completed' as const } : step,
    )

    await delay(750)
    const allComplete: readonly AnalysisStep[] = step3Complete.map(
      (step, index) =>
        index === 3 ? { ...step, status: 'completed' as const } : step,
    )

    const randomIndex = Math.floor(Math.random() * MOCK_RECIPES.length)
    const selectedRecipe = MOCK_RECIPES[randomIndex]

    return {
      success: true,
      data: {
        recipe: selectedRecipe,
        analysisSteps: allComplete,
      },
    }
  }

  async save(recipe: Recipe): Promise<ApiResponse<Recipe>> {
    await delay(300)

    const savedRecipe: Recipe = {
      ...recipe,
      savedAt: new Date().toISOString(),
    }

    this.savedRecipes = [...this.savedRecipes, savedRecipe]

    return {
      success: true,
      data: savedRecipe,
    }
  }

  async getSaved(): Promise<ApiResponse<Recipe[]>> {
    await delay(300)

    return {
      success: true,
      data: [...this.savedRecipes],
    }
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    await delay(300)

    this.savedRecipes = this.savedRecipes.filter((recipe) => recipe.id !== id)

    return { success: true }
  }
}
