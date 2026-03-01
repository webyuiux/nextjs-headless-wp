// components/layout/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">

        <div className="site-footer__brand">
          <Link href="/" className="site-logo">
            My Site
          </Link>
          <p className="site-footer__tagline">
            Powered by WordPress &amp; Next.js
          </p>
        </div>

        <nav
          className="site-footer__nav"
          aria-label="Footer navigation"
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        <p className="site-footer__copy">
          &copy; {year} My Site. All rights reserved.
        </p>

      </div>
    </footer>
  )
}