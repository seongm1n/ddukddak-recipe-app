import { useEffect, useRef } from 'react'
import * as StoreReview from 'expo-store-review'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const ANALYSIS_COUNT_KEY = 'analysis_complete_count'
const REVIEW_TARGET_COUNT = 2

async function getAnalysisCount(): Promise<number> {
  const value = await SecureStore.getItemAsync(ANALYSIS_COUNT_KEY)
  return value ? parseInt(value, 10) : 0
}

async function incrementAnalysisCount(): Promise<number> {
  const count = await getAnalysisCount()
  const newCount = count + 1
  await SecureStore.setItemAsync(ANALYSIS_COUNT_KEY, String(newCount))
  return newCount
}

export function useStoreReview(shouldTrigger: boolean) {
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (!shouldTrigger || hasTriggered.current) return
    hasTriggered.current = true

    const requestReview = async () => {
      try {
        const count = await incrementAnalysisCount()

        if (count !== REVIEW_TARGET_COUNT) return
        if (Platform.OS !== 'ios') return

        const isAvailable = await StoreReview.isAvailableAsync()
        if (!isAvailable) return

        // 결과를 본 후 잠시 뒤에 리뷰 요청
        setTimeout(async () => {
          await StoreReview.requestReview()
        }, 3000)
      } catch {
        // 리뷰 요청 실패는 무시
      }
    }

    requestReview()
  }, [shouldTrigger])
}
