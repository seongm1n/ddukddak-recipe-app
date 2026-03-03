import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin'

import type { SocialAuthResult } from '../socialAuthProvider'

export function configureGoogleSignIn(): void {
  GoogleSignin.configure({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  })
}

export async function getGoogleToken(): Promise<SocialAuthResult> {
  try {
    await GoogleSignin.hasPlayServices()
    const response = await GoogleSignin.signIn()

    if (!response.data?.idToken) {
      throw new Error('Google 로그인에서 ID 토큰을 받지 못했습니다')
    }

    return {
      token: response.data.idToken,
      provider: 'google',
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Google 로그인이 취소되었습니다')
      }
      if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Google 로그인이 이미 진행 중입니다')
      }
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play 서비스를 사용할 수 없습니다')
      }
    }
    throw error
  }
}
