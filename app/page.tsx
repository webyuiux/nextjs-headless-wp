// app/page.tsx

import { notFound } from 'next/navigation'
import { getHomePage } from '@/lib/api/pages'
import { buildMetadata } from '@/lib/utils/seo'
import ElementorContent from '@/components/elementor/ElementorContent'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  if (!page) return { title: 'Home' }
  return buildMetadata(page.yoast_head_json, {
    title: page.title.rendered,
  })
}

export default async function HomePage() {
  const page = await getHomePage()

  if (!page) notFound()

  return (
    <article>
      <ElementorContent
        html={page.content.rendered}
        pageId={page.id}
        cssUrl={page.elementor_css_url}
      />
    </article>
  )
}