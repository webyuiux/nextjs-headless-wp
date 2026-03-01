// app/not-found.tsx

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Page Not Found</h1>
      <p className="not-found__text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn btn--primary">
        ← Back to Home
      </Link>
    </div>
  )
}