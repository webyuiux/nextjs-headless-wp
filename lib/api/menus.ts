// lib/api/menus.ts

import { wpFetch } from './wordpress'
import type { WPMenuItem } from '../types/wordpress'

type RawPage = {
  id: number
  slug: string
  title: { rendered: string }
  parent: number
  menu_order: number
  status: string
  link: string
}

export async function getMenuBySlug(_slug: string): Promise<WPMenuItem[]> {
  const wpOrigin = (process.env.NEXT_PUBLIC_WP_API_URL ?? '')
    .replace('/wp-json', '')

  const pages = await wpFetch<RawPage[]>(
    '/wp/v2/pages?per_page=100&status=publish&orderby=menu_order&order=asc&_fields=id,slug,title,parent,menu_order,status,link',
    { tags: ['menu-pages'], revalidate: 86400 }
  )

  if (!pages || pages.length === 0) return []

  const items: WPMenuItem[] = pages.map((page) => ({
    id: page.id,
    title: page.title?.rendered ?? '',
    url: page.slug === 'home' ? '/' : '/' + page.slug,
    slug: page.slug,
    target: '',
    classes: [],
    menu_item_parent: String(page.parent ?? 0),
    children: [],
  }))

  const map = new Map()
  const roots: WPMenuItem[] = []

  items.forEach((item) =>
    map.set(item.id, { ...item, children: [] })
  )

  items.forEach((item) => {
    const node = map.get(item.id)
    const parentId = Number(item.menu_item_parent)

    if (parentId === 0) {
      roots.push(node)
    } else {
      const parent = map.get(parentId)
      if (parent) {
        parent.children = parent.children ?? []
        parent.children.push(node)
      } else {
        roots.push(node)
      }
    }
  })

  return roots
}