// components/elementor/ElementorStyles.tsx

interface Props {
  pageId: number
  cssUrl?: string
}

export default function ElementorStyles({ pageId, cssUrl }: Props) {
  const WP_BASE = (process.env.NEXT_PUBLIC_WP_API_URL ?? '')
    .replace('/wp-json', '')

  const pageCSS = cssUrl ??
    `${WP_BASE}/wp-content/uploads/elementor/css/post-${pageId}.css`

  const globalCSS =
    `${WP_BASE}/wp-content/plugins/elementor/assets/css/frontend.min.css`

  return (
    <>
      <link rel="stylesheet" href={globalCSS} />
      <link rel="stylesheet" href={pageCSS} />
    </>
  )
}