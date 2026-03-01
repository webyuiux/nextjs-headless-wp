// lib/api/wordpress.ts

const WP_API = process.env.NEXT_PUBLIC_WP_API_URL!
const ISR_REVALIDATE = Number(process.env.ISR_REVALIDATE ?? 3600)

type FetchOptions = {
  revalidate?: number | false
  tags?: string[]
}

export async function wpFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = ISR_REVALIDATE, tags = [] } = options

  const url = `${WP_API}${endpoint}`

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate,
        ...(tags.length && { tags }),
      },
    })

    // Return null instead of throwing for 404s
    if (res.status === 404) return null as T

    if (!res.ok) {
      throw new Error(`WP API error: ${res.status} ${res.statusText} → ${url}`)
    }

    return res.json()

  } catch (error) {
    console.error(`[wpFetch] Failed to fetch: ${url}`, error)
    return null as T
  }
}

export { WP_API, ISR_REVALIDATE }