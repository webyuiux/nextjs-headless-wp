// components/elementor/ElementorContent.tsx
// Renders Elementor-built page HTML safely

import { sanitizeHTML } from '@/lib/utils/sanitize'
import ElementorStyles from './ElementorStyles'

interface Props {
  html: string
  pageId: number
  cssUrl?: string
  className?: string
}

export default function ElementorContent({
  html,
  pageId,
  cssUrl,
  className,
}: Props) {
  // Sanitize HTML on the server before sending to browser
  const cleanHTML = sanitizeHTML(html)

  return (
    <>
      {/* Inject Elementor CSS for this specific page */}
      <ElementorStyles pageId={pageId} cssUrl={cssUrl} />

      {/* Render the Elementor HTML */}
      <div
        className={`elementor-page ${className ?? ''}`.trim()}
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    </>
  )
}