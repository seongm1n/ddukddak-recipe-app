export const colors = {
  primary: { DEFAULT: '#FF6B35', light: '#FF8C61', dark: '#E55A2B' },
  secondary: { DEFAULT: '#FF8C61', light: '#FFAA8A', dark: '#E57545' },
  background: {
    DEFAULT: '#FFFFFF',
    secondary: '#F8F8F8',
    tertiary: '#F0F0F0',
  },
  text: { DEFAULT: '#1A1A1A', secondary: '#6B7280', tertiary: '#9CA3AF' },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const

export const gradients = {
  primary: ['#FF6B35', '#E55A2B'] as const,
  primarySoft: ['#FF8C61', '#FF6B35'] as const,
  hero: ['#FF6B35', '#FF8C61', '#FFAA8A'] as const,
} as const
