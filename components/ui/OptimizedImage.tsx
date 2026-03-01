// components/ui/OptimizedImage.tsx

import Image from 'next/image'

interface Props {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  fill?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  fill = false,
}: Props) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className={className}
        style={{ objectFit: 'cover' }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}