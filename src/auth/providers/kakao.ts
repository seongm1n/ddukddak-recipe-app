import { login as kakaoLogin } from '@react-native-seoul/kakao-login'

import type { SocialAuthResult } from '../socialAuthProvider'

export async function getKakaoToken(): Promise<SocialAuthResult> {
  const result = await kakaoLogin()

  if (!result.accessToken) {
    throw new Error('카카오 로그인에서 액세스 토큰을 받지 못했습니다')
  }

  return {
    token: result.accessToken,
    provider: 'kakao',
  }
}
