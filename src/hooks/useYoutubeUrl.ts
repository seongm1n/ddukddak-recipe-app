import { useState, useCallback } from 'react'

const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]+)/

export function useYoutubeUrl() {
  const [url, setUrl] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [videoId, setVideoId] = useState<string | null>(null)

  const validateUrl = useCallback((input: string) => {
    setUrl(input)
    const match = input.match(YOUTUBE_REGEX)
    if (match && match[1]) {
      setIsValid(true)
      setVideoId(match[1])
    } else {
      setIsValid(false)
      setVideoId(null)
    }
  }, [])

  const reset = useCallback(() => {
    setUrl('')
    setIsValid(false)
    setVideoId(null)
  }, [])

  return { url, isValid, videoId, validateUrl, reset }
}
