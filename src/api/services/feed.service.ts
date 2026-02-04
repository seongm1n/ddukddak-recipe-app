import type { ApiResponse, FeedItem } from '@/types'

export interface FeedService {
  getFeed(params: {
    sort: 'latest' | 'popular'
    page: number
    limit?: number
  }): Promise<ApiResponse<FeedItem[]>>
  getFeedDetail(id: string): Promise<ApiResponse<FeedItem>>
}
