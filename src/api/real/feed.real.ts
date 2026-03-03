import type { ApiResponse, FeedItem } from '@/types'

import { apiClient } from '../client'
import { ENDPOINTS } from '../endpoints'
import type { FeedService } from '../services/feed.service'

export class RealFeedService implements FeedService {
  async getFeed(params: {
    sort: 'latest' | 'popular'
    page: number
    limit?: number
  }): Promise<ApiResponse<FeedItem[]>> {
    try {
      const response = await apiClient.get(ENDPOINTS.FEED.LIST, {
        params: {
          sort: params.sort,
          page: params.page,
          limit: params.limit ?? 20,
        },
      })
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '피드를 불러오는데 실패했습니다',
      }
    }
  }

  async getFeedDetail(id: string): Promise<ApiResponse<FeedItem>> {
    try {
      const response = await apiClient.get(ENDPOINTS.FEED.DETAIL(id))
      return response.data
    } catch (error) {
      return {
        success: false,
        error: '피드 상세를 불러오는데 실패했습니다',
      }
    }
  }
}
