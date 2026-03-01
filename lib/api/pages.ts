// lib/api/pages.ts

import { wpFetch } from './wordpress'
import type { WPPage } from '../types/wordpress'

// Get all page slugs — used by generateStaticParams
export async function getAllPageSlugs(): Promise<string[]> {
  const pages = await wpFetch<WPPage[]>(
    '/wp/v2/pages?per_page=100&_fields=slug,status&status=publish',
    { revalidate: false }
  )
  if (!pages) return []
  return pages.map((p) => p.slug)
}

// Get a single page by its slug
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>(
    `/wp/v2/pages?slug=${slug}&_embed=true&status=publish`,
    { tags: [`page-${slug}`] }
  )
  if (!pages || pages.length === 0) return null
  return pages[0]
}

// Get homepage — tries 'home' slug first, then falls back to first published page
export async function getHomePage(): Promise<WPPage | null> {
  // Try the slug 'home' first (most common setup)
  const bySlug = await getPageBySlug('home')
  if (bySlug) return bySlug

  // Fallback: grab the first published page
  const pages = await wpFetch<WPPage[]>(
    '/wp/v2/pages?per_page=1&_embed=true&status=publish&orderby=menu_order&order=asc',
    { tags: ['homepage'] }
  )
  if (!pages || pages.length === 0) return null
  return pages[0]
}