import { create } from 'zustand'

import { feedService } from '@/api/services'
import type { FeedItem } from '@/types'

interface FeedState {
  readonly feedItems: readonly FeedItem[]
  readonly sortBy: 'latest' | 'popular'
  readonly isLoading: boolean
  readonly page: number
  readonly hasMore: boolean
  readonly error: string | null
}

interface FeedActions {
  loadFeed: () => Promise<void>
  loadMore: () => Promise<void>
  changeSortOrder: (sort: 'latest' | 'popular') => void
  refresh: () => Promise<void>
}

const ITEMS_PER_PAGE = 20

const initialState: FeedState = {
  feedItems: [],
  sortBy: 'latest',
  isLoading: false,
  page: 1,
  hasMore: true,
  error: null,
}

export const useFeedStore = create<FeedState & FeedActions>((set, get) => ({
  ...initialState,

  loadFeed: async () => {
    set({ isLoading: true, error: null, page: 1 })
    try {
      const { sortBy } = get()
      const response = await feedService.getFeed({
        page: 1,
        limit: ITEMS_PER_PAGE,
        sort: sortBy,
      })

      if (response.success && response.data) {
        set({
          feedItems: response.data,
          hasMore: response.data.length >= ITEMS_PER_PAGE,
          isLoading: false,
        })
      } else {
        set({
          error: response.error || '피드를 불러오는데 실패했습니다',
          isLoading: false,
        })
      }
    } catch {
      set({
        error: '피드를 불러오는 중 오류가 발생했습니다',
        isLoading: false,
      })
    }
  },

  loadMore: async () => {
    const { isLoading, hasMore, page, sortBy, feedItems } = get()

    if (isLoading || !hasMore) {
      return
    }

    const nextPage = page + 1
    set({ isLoading: true, error: null })

    try {
      const response = await feedService.getFeed({
        page: nextPage,
        limit: ITEMS_PER_PAGE,
        sort: sortBy,
      })

      if (response.success && response.data) {
        set({
          feedItems: [...feedItems, ...response.data],
          page: nextPage,
          hasMore: response.data.length >= ITEMS_PER_PAGE,
          isLoading: false,
        })
      } else {
        set({
          error: response.error || '피드를 더 불러오는데 실패했습니다',
          isLoading: false,
        })
      }
    } catch {
      set({
        error: '피드를 더 불러오는 중 오류가 발생했습니다',
        isLoading: false,
      })
    }
  },

  changeSortOrder: (sort) => {
    const { sortBy } = get()

    if (sort === sortBy) {
      return
    }

    set({
      sortBy: sort,
      feedItems: [],
      page: 1,
      hasMore: true,
    })

    // Reload feed with new sort order
    get().loadFeed()
  },

  refresh: async () => {
    set({
      feedItems: [],
      page: 1,
      hasMore: true,
    })

    await get().loadFeed()
  },
}))
