export type WPMedia = {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes: Record<string, { source_url: string; width: number; height: number }>
  }
}

export type WPMenuItem = {
  id: number
  title: string
  url: string
  slug: string
  target: string
  classes: string[]
  children?: WPMenuItem[]
  menu_item_parent: string
}

export type WPMenu = {
  id: number
  name: string
  slug: string
  items: WPMenuItem[]
}

export type YoastMeta = {
  title: string
  description: string
  og_title: string
  og_description: string
  og_image?: { url: string; width: number; height: number }[]
  og_url: string
  og_type: string
  twitter_card: string
  twitter_title: string
  twitter_description: string
  twitter_image?: string
  canonical: string
  robots?: { index: string; follow: string }
}

export type WPPage = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string; protected: boolean }
  excerpt: { rendered: string }
  featured_media: number
  status: string
  date: string
  modified: string
  link: string
  elementor_css_url?: string
  yoast_head_json?: YoastMeta
}

export type WPPost = WPPage & {
  categories: number[]
  tags: number[]
  author: number
}