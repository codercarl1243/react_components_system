'use client'
import SkipLink from '@/components/skiplink'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import Link from '@/components/link'
import { usePathname } from 'next/navigation'
import { RiBookReadFill, RiCloseLargeLine, RiHomeHeartLine, RiMenuLine, RiUser3Fill } from '@remixicon/react'

import { Hamburger } from '../hamburger'
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
    <Hamburger.Wrapper
      as="header"
      position="left"
      className="header--wrapper"
      breakpoint="mobile"
      menuId="Primary-Nav"
      {...props}
    >
      <SkipLink />
      <Hamburger.Toggle
        className='hamburger-menu--toggle'
        data-style='filled'
        data-variant='primary'
        openIcon={RiMenuLine}
      >
        Menu
      </Hamburger.Toggle>
      <Hamburger.Menu
        as="nav"
        className='nav__primary'
        aria-label="Primary"
      >
        {pathname !== '/' && <Link href="/" icon={RiHomeHeartLine}>Home</Link>}
        <Link
          href="/blog"
          className={clsx({ 'active': pathname.startsWith('/blog') })}
          aria-current={pathname === '/blog' ? 'page' : undefined}
          icon={RiBookReadFill}
        >
          Blog
        </Link>
        <Link
          href="/about"
          className={clsx({ 'active': pathname === '/about' })}
          aria-current={pathname === '/about' ? 'page' : undefined}
          icon={RiUser3Fill}
        >
          About
        </Link>
      </Hamburger.Menu>
    </Hamburger.Wrapper>
  )
}
