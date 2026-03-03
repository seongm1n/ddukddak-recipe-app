import * as AppleAuthentication from 'expo-apple-authentication'

import type { SocialAuthResult } from '../socialAuthProvider'

export async function getAppleToken(): Promise<SocialAuthResult> {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  })

  if (!credential.identityToken) {
    throw new Error('Apple 로그인에서 인증 토큰을 받지 못했습니다')
  }

  return {
    token: credential.identityToken,
    provider: 'apple',
  }
}
