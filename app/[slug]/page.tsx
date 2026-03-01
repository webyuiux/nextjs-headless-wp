// app/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { getAllPageSlugs, getPageBySlug } from '@/lib/api/pages'
import { buildMetadata } from '@/lib/utils/seo'
import ElementorContent from '@/components/elementor/ElementorContent'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  // Exclude 'home' since it's handled by app/page.tsx
  return slugs
    .filter((slug) => slug !== 'home')
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return {}
  return buildMetadata(page.yoast_head_json, {
    title: page.title.rendered,
    slug,
  })
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

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