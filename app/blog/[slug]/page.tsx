import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllPostSlugs, getPostBySlug } from '@/lib/api/posts'
import { buildMetadata } from '@/lib/utils/seo'
import ElementorContent from '@/components/elementor/ElementorContent'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata(post.yoast_head_json, {
    title: post.title.rendered,
    slug: 'blog/' + slug,
  })
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const media = (post as any)?._embedded?.['wp:featuredmedia']
  const img = Array.isArray(media) ? media[0] : null

  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="post">
      {img?.source_url && (
        <div className="post__hero">
          <Image
            src={img.source_url}
            alt={img.alt_text || post.title.rendered}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <header className="post__header">
        <h1
          className="post__title"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <time className="post__date" dateTime={post.date}>
          {dateStr}
        </time>
      </header>
      <ElementorContent
        html={post.content.rendered}
        pageId={post.id}
        cssUrl={post.elementor_css_url}
      />
    </article>
  )
}