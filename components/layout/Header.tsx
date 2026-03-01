// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import Navigation from './Navigation'
import { useState, useEffect } from 'react'
import type { WPMenuItem } from '@/lib/types/wordpress'

interface Props {
  navItems: WPMenuItem[]
  siteName?: string
}

export default function Header({
  navItems,
  siteName = 'My Site',
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add shadow to header when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner container">

        {/* Logo / Site Name */}
        <Link href="/" className="site-logo" aria-label="Go to homepage">
          {siteName}
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="site-nav site-nav--desktop"
          aria-label="Primary navigation"
        >
          <Navigation items={navItems} />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="hamburger__line" />
          <span className="hamburger__line" />
          <span className="hamburger__line" />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="site-nav site-nav--mobile"
          aria-label="Mobile navigation"
        >
          <Navigation items={navItems} />
        </nav>
      )}
    </header>
  )
}