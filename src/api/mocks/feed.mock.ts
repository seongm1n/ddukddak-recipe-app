import type { ApiResponse, FeedItem } from '@/types'

import type { FeedService } from '../services/feed.service'
import { MOCK_FEED_ITEMS } from './data'

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const DEFAULT_ITEMS_PER_PAGE = 10

export class MockFeedService implements FeedService {
  async getFeed(params: {
    sort: 'latest' | 'popular'
    page: number
    limit?: number
  }): Promise<ApiResponse<FeedItem[]>> {
    await delay(400)

    const itemsPerPage = params.limit ?? DEFAULT_ITEMS_PER_PAGE

    const sorted = [...MOCK_FEED_ITEMS].sort((a, b) => {
      if (params.sort === 'popular') {
        return b.likes - a.likes
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    const startIndex = (params.page - 1) * itemsPerPage
    const paginated = sorted.slice(startIndex, startIndex + itemsPerPage)

    return {
      success: true,
      data: paginated,
    }
  }

  async getFeedDetail(id: string): Promise<ApiResponse<FeedItem>> {
    await delay(300)

    const item = MOCK_FEED_ITEMS.find((feedItem) => feedItem.id === id)

    if (!item) {
      return {
        success: false,
        error: `Feed item with id "${id}" not found`,
      }
    }

    return {
      success: true,
      data: item,
    }
  }
}
