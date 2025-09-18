'use client'
import SkipLink from '@/components/skiplink'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'
import { usePathname } from 'next/navigation'

export default function Header({ className, ...props }: ComponentProps<'header'>) {
  const pathname = usePathname()

  return (
    <header className={clsx('header', className)} {...props}>
      <SkipLink />
      <nav aria-label="Primary">
        <Link href="/" className={clsx({ 'active': pathname === '/' })} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
        <Link href="/blog" className={clsx({ 'active': pathname.startsWith('/blog/') })} aria-current={pathname === '/blog' ? 'page' : undefined}>Blog</Link>
        <Link href="/about" className={clsx({ 'active': pathname === '/about' })} aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
      </nav>
    </header>
  )
}
