import { createClient } from '@supabase/supabase-js'

export type Project = {
  id: string
  name: string
  location: string
  description: string
  category: string
  images: string[]
  created_at: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = ReturnType<typeof createClient<any>>

let _client: AnyClient | null = null

export function getClient(): AnyClient | null {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'your-supabase-url') return null
  _client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
  return _client
}
