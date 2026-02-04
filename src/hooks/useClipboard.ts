import { useState, useCallback } from 'react'
import * as Clipboard from 'expo-clipboard'

export function useClipboard() {
  const [clipboardContent, setClipboardContent] = useState<string>('')

  const readClipboard = useCallback(async () => {
    try {
      const text = await Clipboard.getStringAsync()
      setClipboardContent(text)
      return text
    } catch {
      return ''
    }
  }, [])

  const hasYoutubeUrl = useCallback((text: string) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/
    return youtubeRegex.test(text)
  }, [])

  return { clipboardContent, readClipboard, hasYoutubeUrl }
}
