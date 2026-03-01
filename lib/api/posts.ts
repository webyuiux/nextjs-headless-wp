// lib/api/posts.ts

import { wpFetch, WP_API } from './wordpress'
import type { WPPost, WPMedia } from '../types/wordpress'

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await wpFetch<WPPost[]>(
    '/wp/v2/posts?per_page=100&_fields=slug,status&status=publish',
    { revalidate: false }
  )
  if (!posts) return []
  return posts.map((p) => p.slug)
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(
    `/wp/v2/posts?slug=${slug}&_embed=true&status=publish`,
    { tags: [`post-${slug}`] }
  )
  if (!posts || posts.length === 0) return null

  const post = posts[0]

  // If _embedded didn't come through but featured_media ID exists
  // fetch the image directly
  if (
    post.featured_media &&
    post.featured_media > 0 &&
    !(post as any)._embedded?.['wp:featuredmedia']?.[0]
  ) {
    const media = await wpFetch<WPMedia>(
      `/wp/v2/media/${post.featured_media}`,
      { tags: [`media-${post.featured_media}`] }
    )
    if (media) {
      ;(post as any)._embedded = {
        'wp:featuredmedia': [media],
      }
    }
  }

  return post
}

export async function getPosts(
  page = 1,
  perPage = 10
): Promise<{
  posts: WPPost[]
  total: number
  totalPages: number
}> {
  const endpoint =
    `/wp/v2/posts?page=${page}&per_page=${perPage}&_embed=true&status=publish`

  try {
    const res = await fetch(`${WP_API}${endpoint}`, {
      next: { revalidate: 3600, tags: ['posts'] },
    })

    if (!res.ok) return { posts: [], total: 0, totalPages: 0 }

    const posts: WPPost[] = await res.json()

    // For any post missing embedded media, fetch it directly
    const enriched = await Promise.all(
      posts.map(async (post) => {
        if (
          post.featured_media &&
          post.featured_media > 0 &&
          !(post as any)._embedded?.['wp:featuredmedia']?.[0]
        ) {
          const media = await wpFetch<WPMedia>(
            `/wp/v2/media/${post.featured_media}`,
            { tags: [`media-${post.featured_media}`] }
          )
          if (media) {
            ;(post as any)._embedded = {
              'wp:featuredmedia': [media],
            }
          }
        }
        return post
      })
    )

    return {
      posts: enriched,
      total: Number(res.headers.get('X-WP-Total') ?? 0),
      totalPages: Number(res.headers.get('X-WP-TotalPages') ?? 0),
    }
  } catch {
    return { posts: [], total: 0, totalPages: 0 }
  }
}