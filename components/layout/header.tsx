'use client'
import SkipLink from '@/components/skiplink'
import clsx from 'clsx'
import { useEffect, useState, type ComponentProps } from 'react'
import Link from '@/components/link'
import { usePathname } from 'next/navigation'
import { RiBookReadFill, RiCloseLargeLine, RiHomeHeartLine, RiMenuLine, RiUser3Fill } from '@remixicon/react'
import Button from '@/components/button'
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
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);


  const handleMenuOpenState = (state?: boolean) => {
    setMenuIsOpen(prev => state !== undefined ? state : !prev);
  };

  useEffect(() => {
    handleMenuOpenState(false)
  }, [pathname])

  return (
    <header className={clsx('header-wrapper overlay', { 'overlay--visible': menuIsOpen }, className)} {...props}>
      <SkipLink />
      <Button
        className='header__menu-button overlay-control fixed'
        aria-controls='primary-nav'
        aria-expanded={menuIsOpen}
        onClick={() => handleMenuOpenState()}
        aria-label={menuIsOpen ? "Close menu" : "Open menu"}
        data-style='filled'
        data-variant='primary'
        icon={menuIsOpen ? RiCloseLargeLine : RiMenuLine}
      >
        Menu
      </Button>
      <nav
        className='nav__primary'
        data-isopen={menuIsOpen}
        aria-label="Primary"
        id="primary-nav"
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
      </nav>
    </header>
  )
}
