'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { WPMenuItem } from '@/lib/types/wordpress'

type NavProps = {
  items: WPMenuItem[]
  depth?: number
}

type NavItemProps = {
  item: WPMenuItem
  depth: number
  pathname: string
}

export default function Navigation({ items, depth = 0 }: NavProps) {
  const pathname = usePathname()

  if (!items || items.length === 0) return null

  return (
    <ul
      className={'nav-list nav-depth-' + depth}
      role={depth === 0 ? 'menubar' : 'menu'}
    >
      {items.map((item) => (
        <NavItem
          key={'nav-item-' + item.id}
          item={item}
          depth={depth}
          pathname={pathname}
        />
      ))}
    </ul>
  )
}

function NavItem({ item, depth, pathname }: NavItemProps) {
  const [open, setOpen] = useState(false)
  const hasChildren = (item.children?.length ?? 0) > 0

  const isActive =
    pathname === item.url ||
    (item.url !== '/' && pathname.startsWith(item.url))

  const liClass = [
    'nav-item',
    isActive ? 'nav-item--active' : '',
    hasChildren ? 'nav-item--has-children' : '',
    open ? 'nav-item--open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li
      role="none"
      className={liClass}
      onMouseEnter={() => hasChildren && setOpen(true)}
      onMouseLeave={() => hasChildren && setOpen(false)}
    >
      <Link
        href={item.url}
        role="menuitem"
        prefetch={true}
        aria-current={isActive ? 'page' : undefined}
        target={item.target || '_self'}
        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={() => setOpen(false)}
      >
        {item.title}
        {hasChildren && (
          <span className="nav-arrow" aria-hidden="true">v</span>
        )}
      </Link>

      {hasChildren && open && (
        <Navigation items={item.children!} depth={depth + 1} />
      )}
    </li>
  )
}