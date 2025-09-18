'use client'
import SkipLink from '@/components/skiplink'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'
import { usePathname } from 'next/navigation'

export default function Header({ className, ...props }: ComponentProps<'header'>) {
  const pathname = usePathname()

  return (
    <header className={clsx('header', className)} aria-label="Main" {...props}>
      <SkipLink />
      <nav>
        <Link href="/" className={clsx({ 'active': pathname === '/' })} aria-current={pathname === '/' ? 'true' : undefined}>Home</Link>
        <Link href="/blog" className={clsx({ 'active': pathname.startsWith('/blog') })} aria-current={pathname === '/blog' ? 'true' : undefined}>Blog</Link>
        <Link href="/about" className={clsx({ 'active': pathname === '/about' })} aria-current={pathname === '/about' ? 'true' : undefined}>About</Link>
      </nav>
    </header>
  )
}
