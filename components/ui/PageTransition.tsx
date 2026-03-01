// components/ui/PageTransition.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const pathname = usePathname()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    // Reset to invisible + shifted up
    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.transform = 'translateY(10px)'

    // Force browser to register the reset before animating
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    })

    return () => cancelAnimationFrame(raf)
  }, [pathname])

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div ref={wrapperRef} className="page-transition">
      {children}
    </div>
  )
}