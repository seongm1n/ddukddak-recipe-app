export interface User {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly avatarUrl?: string
  readonly provider: 'apple' | 'google'
  readonly createdAt: string
}

export interface Ingredient {
  readonly id: string
  readonly name: string
  readonly quantity: string
  readonly unit: string
  readonly price: number
  readonly note?: string
}

export interface Recipe {
  readonly id: string
  readonly title: string
  readonly videoUrl: string
  readonly thumbnailUrl: string
  readonly channelName: string
  readonly steps: readonly string[]
  readonly ingredients: readonly Ingredient[]
  readonly totalCost: number
  readonly servings: number
  readonly savedAt?: string
  readonly userId?: string
}

export interface RecipeAnalysisResult {
  readonly recipe: Recipe
  readonly analysisSteps: readonly AnalysisStep[]
}

export interface AnalysisStep {
  readonly label: string
  readonly status: 'pending' | 'in_progress' | 'completed'
}

export interface FeedItem {
  readonly id: string
  readonly recipe: Recipe
  readonly author: User
  readonly likes: number
  readonly createdAt: string
}

export interface ApiResponse<T> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
}

export interface AuthTokens {
  readonly accessToken: string
  readonly refreshToken: string
}
