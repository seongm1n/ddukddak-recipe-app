export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  RECIPE: {
    ANALYZE: '/recipe/analyze',
    SAVE: '/recipe/save',
    LIST: '/recipe/list',
    DELETE: (id: string) => `/recipe/${id}`,
  },
  FEED: {
    LIST: '/feed',
    DETAIL: (id: string) => `/feed/${id}`,
  },
} as const
