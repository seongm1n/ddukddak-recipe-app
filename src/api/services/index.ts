import { MockAuthService } from '../mocks/auth.mock'
import { MockFeedService } from '../mocks/feed.mock'
import { MockRecipeService } from '../mocks/recipe.mock'
import { MockStorageService } from '../mocks/storage.mock'
import { RealAuthService } from '../real/auth.real'
import { RealFeedService } from '../real/feed.real'
import { RealRecipeService } from '../real/recipe.real'
import { RealStorageService } from '../real/storage.real'

import type { AuthService } from './auth.service'
import type { FeedService } from './feed.service'
import type { RecipeService } from './recipe.service'
import type { StorageService } from './storage.service'

const useMock = process.env.EXPO_PUBLIC_USE_MOCK_API === 'true'

export const storageService: StorageService = useMock
  ? new MockStorageService()
  : new RealStorageService()

export const authService: AuthService = useMock
  ? new MockAuthService()
  : new RealAuthService()

export const recipeService: RecipeService = useMock
  ? new MockRecipeService()
  : new RealRecipeService()

export const feedService: FeedService = useMock
  ? new MockFeedService()
  : new RealFeedService()
