// app/blog/page.tsx

import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/api/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest articles and updates.',
}

export default async function BlogPage() {
  const { posts } = await getPosts(1, 12)

  return (
    <div className="container">
      <h1 style={{
        padding: '3rem 0 1rem',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 800
      }}>
        Blog
      </h1>

      {posts.length === 0 ? (
        <p style={{ padding: '2rem 0', color: 'var(--color-text-muted)' }}>
          No posts found.
        </p>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => {
            const media = (post as any)._embedded?.['wp:featuredmedia']?.[0]
            const imageUrl = media?.source_url ?? null
            const imageAlt = media?.alt_text || post.title.rendered
            const imageWidth = media?.media_details?.width ?? 800
            const imageHeight = media?.media_details?.height ?? 450

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                {/* Featured Image */}
                {imageUrl ? (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    background: 'var(--color-bg-soft)'
                  }}>
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  /* Placeholder when no image */
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'var(--color-bg-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.85rem'
                  }}>
                    No image
                  </div>
                )}

                <div className="blog-card__body">
                  <p className="blog-card__date">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h2
                    className="blog-card__title"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  {post.excerpt?.rendered && (
                    <div
                      className="blog-card__excerpt"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}