import { MockAuthService } from '../mocks/auth.mock'
import { MockFeedService } from '../mocks/feed.mock'
import { MockRecipeService } from '../mocks/recipe.mock'
import { MockStorageService } from '../mocks/storage.mock'

import type { AuthService } from './auth.service'
import type { FeedService } from './feed.service'
import type { RecipeService } from './recipe.service'
import type { StorageService } from './storage.service'

export const authService: AuthService = new MockAuthService()
export const recipeService: RecipeService = new MockRecipeService()
export const feedService: FeedService = new MockFeedService()
export const storageService: StorageService = new MockStorageService()
