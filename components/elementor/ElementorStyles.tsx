// components/elementor/ElementorStyles.tsx
// Fetches Elementor CSS server-side and inlines it — works on any host

interface Props {
  pageId: number
  cssUrl?: string
}

async function fetchCSS(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return ''
    const css = await res.text()
    return css
  } catch {
    return ''
  }
}

export default async function ElementorStyles({ pageId, cssUrl }: Props) {
  const WP_BASE = (process.env.NEXT_PUBLIC_WP_API_URL ?? '')
    .replace('/wp-json', '')

  const globalCSSUrl =
    `${WP_BASE}/wp-content/plugins/elementor/assets/css/frontend.min.css`

  const pageCSSUrl = cssUrl ??
    `${WP_BASE}/wp-content/uploads/elementor/css/post-${pageId}.css`

  // Fetch both CSS files server-side
  const [globalCSS, pageCSS] = await Promise.all([
    fetchCSS(globalCSSUrl),
    fetchCSS(pageCSSUrl),
  ])

  return (
    <>
      {globalCSS && (
        <style
          dangerouslySetInnerHTML={{ __html: globalCSS }}
          data-elementor="global"
        />
      )}
      {pageCSS && (
        <style
          dangerouslySetInnerHTML={{ __html: pageCSS }}
          data-elementor={`page-${pageId}`}
        />
      )}
    </>
  )
}