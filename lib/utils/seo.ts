// lib/utils/seo.ts

import type { Metadata } from 'next'
import type { YoastMeta } from '../types/wordpress'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const SITE_NAME = 'My Site' // ← change this to your site name

export function buildMetadata(
  yoast?: YoastMeta | null,
  fallback?: {
    title?: string
    description?: string
    image?: string
    slug?: string
  }
): Metadata {
  const title = yoast?.title ?? fallback?.title ?? SITE_NAME
  const description = yoast?.description ?? fallback?.description ?? ''
  const ogImage = yoast?.og_image?.[0]?.url ?? fallback?.image
  const canonical = yoast?.canonical ??
    (fallback?.slug ? `${SITE_URL}/${fallback.slug}` : SITE_URL)

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    robots: yoast?.robots
      ? {
          index: yoast.robots.index === 'index',
          follow: yoast.robots.follow === 'follow',
        }
      : { index: true, follow: true },
    openGraph: {
      title: yoast?.og_title ?? title,
      description: yoast?.og_description ?? description,
      url: yoast?.og_url ?? canonical,
      type: (yoast?.og_type as 'website' | 'article') ?? 'website',
      siteName: SITE_NAME,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: (yoast?.twitter_card as 'summary_large_image' | 'summary')
        ?? 'summary_large_image',
      title: yoast?.twitter_title ?? title,
      description: yoast?.twitter_description ?? description,
      images: yoast?.twitter_image ? [yoast.twitter_image] : [],
    },
  }
}