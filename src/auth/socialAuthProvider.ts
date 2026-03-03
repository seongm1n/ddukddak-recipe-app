import { Platform } from 'react-native'

export interface SocialAuthResult {
  readonly token: string
  readonly provider: 'apple' | 'google' | 'kakao'
}

export async function getSocialToken(
  provider: 'apple' | 'google' | 'kakao',
): Promise<SocialAuthResult> {
  switch (provider) {
    case 'apple': {
      if (Platform.OS !== 'ios') {
        throw new Error('Apple 로그인은 iOS에서만 사용 가능합니다')
      }
      const { getAppleToken } = await import('./providers/apple')
      return getAppleToken()
    }
    case 'google': {
      const { getGoogleToken } = await import('./providers/google')
      return getGoogleToken()
    }
    case 'kakao': {
      const { getKakaoToken } = await import('./providers/kakao')
      return getKakaoToken()
    }
  }
}
