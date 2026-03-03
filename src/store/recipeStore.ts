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
  saveRecipe: (recipeId: string) => Promise<void>
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

      // 클라이언트 사이드 진행률 시뮬레이션
      // 백엔드는 단일 응답이므로, 대기 중 단계별 전환을 보여줌
      const stepTimers: ReturnType<typeof setTimeout>[] = []
      let currentStep = 0

      const advanceStep = (index: number) => {
        if (index >= steps.length) return
        currentStep = index
        const updated = steps.map((step, i) => {
          if (i < index) return { ...step, status: 'completed' as const }
          if (i === index) return { ...step, status: 'in_progress' as const }
          return { ...step, status: 'pending' as const }
        })
        set({ analysisSteps: updated })
      }

      advanceStep(0)
      stepTimers.push(setTimeout(() => advanceStep(1), 5000))
      stepTimers.push(setTimeout(() => advanceStep(2), 15000))

      try {
        const response = await recipeService.analyze(url)

        stepTimers.forEach(clearTimeout)

        if (!response.success || !response.data) {
          set({
            error: response.error || '레시피 분석에 실패했습니다',
            isAnalyzing: false,
            analysisSteps: steps.map((step) => ({
              ...step,
              status: 'completed' as const,
            })),
          })
          return
        }

        const { recipe } = response.data

        set({
          currentRecipe: recipe,
          analysisSteps: steps.map((step) => ({
            ...step,
            status: 'completed' as const,
          })),
          isAnalyzing: false,
        })

        // 분석 완료된 레시피를 자동으로 컬렉션에 저장
        try {
          const saveResponse = await recipeService.save(recipe.id)
          if (saveResponse.success && saveResponse.data) {
            const { savedRecipes } = get()
            const isAlreadySaved = savedRecipes.some((r) => r.id === recipe.id)
            if (!isAlreadySaved) {
              set({ savedRecipes: [...savedRecipes, saveResponse.data] })
            }
          }
        } catch {
          // 자동 저장 실패는 무시
        }
      } catch {
        stepTimers.forEach(clearTimeout)
        set({
          error: '레시피 분석 중 오류가 발생했습니다',
          isAnalyzing: false,
        })
      }
    },

    saveRecipe: async (recipeId) => {
      try {
        const response = await recipeService.save(recipeId)

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
