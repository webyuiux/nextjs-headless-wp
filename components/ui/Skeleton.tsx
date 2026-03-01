// components/ui/Skeleton.tsx
// Shows animated placeholder while page content loads

interface Props {
  lines?: number
  showImage?: boolean
  className?: string
}

export default function Skeleton({
  lines = 6,
  showImage = false,
  className,
}: Props) {
  return (
    <div
      className={`skeleton ${className ?? ''}`.trim()}
      aria-busy="true"
      aria-label="Loading content, please wait"
      role="status"
    >
      {/* Optional hero image placeholder */}
      {showImage && (
        <div className="skeleton__image" />
      )}

      {/* Title placeholder — wider than body lines */}
      <div className="skeleton__title" />

      {/* Body line placeholders */}
      <div className="skeleton__lines">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="skeleton__line"
            style={{
              // Vary widths so it looks natural
              width: `${i === lines - 1 ? 60 : 85 + (i % 3) * 5}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}