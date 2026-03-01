// app/layout.tsx

import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/PageTransition'
import { getMenuBySlug } from '@/lib/api/menus'
import '@/styles/globals.css'
import '@/styles/elementor-overrides.css'

export const metadata: Metadata = {
  title: {
    template: '%s | My Site',
    default: 'My Site',
  },
  description: 'Headless WordPress powered by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch nav once at layout level — cached for 24 hours
  const navItems = await getMenuBySlug('primary-menu')

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header navItems={navItems} siteName="My Site" />
        <PageTransition>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}