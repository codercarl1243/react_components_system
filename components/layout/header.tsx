'use client'
import SkipLink from '@/components/skiplink'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'
import { usePathname } from 'next/navigation'
/**
 * Site footer component that displays the current year, copyright notice and a link to codercarl.dev.
 *
 * The component computes the current year at render time and forwards any other standard footer element props to the root <footer>.
 *
 * @param className - Optional additional CSS class(es) applied to the footer element.
 * @returns The rendered footer JSX element.
 */
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
