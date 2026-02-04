import { create } from 'zustand'

import { recipeService } from '@/api/services'
import type { Recipe, AnalysisStep } from '@/types'

interface RecipeState {
  readonly currentRecipe: Recipe | null
  readonly savedRecipes: readonly Recipe[]
  readonly isAnalyzing: boolean
  readonly analysisSteps: readonly AnalysisStep[]
  readonly error: string | null
}

interface RecipeActions {
  analyzeUrl: (url: string) => Promise<void>
  saveRecipe: (recipe: Recipe) => Promise<void>
  deleteRecipe: (id: string) => Promise<void>
  loadSavedRecipes: () => Promise<void>
  clearCurrentRecipe: () => void
  clearError: () => void
}

const DEFAULT_ANALYSIS_STEPS: readonly AnalysisStep[] = [
  { label: '영상 정보 가져오는 중', status: 'pending' },
  { label: '레시피 분석 중', status: 'pending' },
  { label: '재료 가격 계산 중', status: 'pending' },
]

const initialState: RecipeState = {
  currentRecipe: null,
  savedRecipes: [],
  isAnalyzing: false,
  analysisSteps: [],
  error: null,
}

function updateStepStatus(
  steps: readonly AnalysisStep[],
  index: number,
  status: AnalysisStep['status'],
): readonly AnalysisStep[] {
  return steps.map((step, i) =>
    i === index ? { ...step, status } : step,
  )
}

export const useRecipeStore = create<RecipeState & RecipeActions>(
  (set, get) => ({
    ...initialState,

    analyzeUrl: async (url) => {
      const steps = DEFAULT_ANALYSIS_STEPS.map((step) => ({ ...step }))

      set({
        isAnalyzing: true,
        error: null,
        analysisSteps: steps,
        currentRecipe: null,
      })

      try {
        // Step 1: Fetching video info
        set({ analysisSteps: updateStepStatus(steps, 0, 'in_progress') })

        const response = await recipeService.analyze(url)

        if (!response.success || !response.data) {
          set({
            error: response.error || '레시피 분석에 실패했습니다',
            isAnalyzing: false,
            analysisSteps: updateStepStatus(steps, 0, 'completed'),
          })
          return
        }

        const { recipe, analysisSteps: serverSteps } = response.data

        // Step 1 complete, Step 2 in progress
        const afterStep1 = updateStepStatus(steps, 0, 'completed')
        set({ analysisSteps: updateStepStatus(afterStep1, 1, 'in_progress') })

        // Step 2 complete, Step 3 in progress
        const afterStep2 = updateStepStatus(afterStep1, 1, 'completed')
        set({ analysisSteps: updateStepStatus(afterStep2, 2, 'in_progress') })

        // All steps complete
        const allComplete = updateStepStatus(afterStep2, 2, 'completed')

        set({
          currentRecipe: recipe,
          analysisSteps: serverSteps.length > 0 ? serverSteps : allComplete,
          isAnalyzing: false,
        })
      } catch {
        set({
          error: '레시피 분석 중 오류가 발생했습니다',
          isAnalyzing: false,
        })
      }
    },

    saveRecipe: async (recipe) => {
      try {
        const response = await recipeService.save(recipe)

        if (response.success && response.data) {
          const { savedRecipes } = get()
          set({ savedRecipes: [...savedRecipes, response.data] })
        } else {
          set({ error: response.error || '레시피 저장에 실패했습니다' })
        }
      } catch {
        set({ error: '레시피 저장 중 오류가 발생했습니다' })
      }
    },

    deleteRecipe: async (id) => {
      try {
        const response = await recipeService.delete(id)

        if (response.success) {
          const { savedRecipes } = get()
          set({
            savedRecipes: savedRecipes.filter((recipe) => recipe.id !== id),
          })
        } else {
          set({ error: response.error || '레시피 삭제에 실패했습니다' })
        }
      } catch {
        set({ error: '레시피 삭제 중 오류가 발생했습니다' })
      }
    },

    loadSavedRecipes: async () => {
      try {
        const response = await recipeService.getSaved()

        if (response.success && response.data) {
          set({ savedRecipes: response.data })
        } else {
          set({ error: response.error || '저장된 레시피를 불러오는데 실패했습니다' })
        }
      } catch {
        set({ error: '저장된 레시피를 불러오는 중 오류가 발생했습니다' })
      }
    },

    clearCurrentRecipe: () =>
      set({ currentRecipe: null, analysisSteps: [], error: null }),

    clearError: () => set({ error: null }),
  }),
)
