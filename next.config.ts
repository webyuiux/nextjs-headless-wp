import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'headless-wp.local',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'chocolate-frog-538600.hostingersite.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default config