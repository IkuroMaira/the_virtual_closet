import { useEffect, useState } from 'react'
import { supabase } from '@/shared/services/supabaseClient'

const BUCKET = 'clothes-pictures'
const BUCKET_SEGMENT = '/clothes-pictures/'

function extractPath(picture) {
  if (!picture) return null
  if (picture.startsWith('http')) {
    const idx = picture.indexOf(BUCKET_SEGMENT)
    return idx !== -1 ? picture.slice(idx + BUCKET_SEGMENT.length) : null
  }
  return picture
}

export function useSignedUrl(picture) {
  const [signedUrl, setSignedUrl] = useState(null)

  useEffect(() => {
    const path = extractPath(picture)
    if (!path) {
      setSignedUrl(null)
      return
    }

    supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, 3600)
      .then(({ data, error }) => {
        if (!error && data?.signedUrl) setSignedUrl(data.signedUrl)
      })
  }, [picture])

  return signedUrl
}
