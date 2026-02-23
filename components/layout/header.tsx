'use client'
import SkipLink from '@/components/skiplink'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import Link from '@/components/link'
import { usePathname } from 'next/navigation'
import { RiBookReadFill, RiHomeHeartLine, RiMenuLine, RiMoonClearFill, RiSunLine, RiUser3Fill } from '@remixicon/react'
import { Hamburger } from '@/components/hamburger'
import Switch from '../button/switch'
import { useTheme } from '@/lib/hooks/useTheme'
import Icon from '../icon'

export default function Header({ className, userTheme, ...props }: ComponentProps<'header'> & { userTheme: string }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme(userTheme);
  return (
    <Hamburger.Wrapper
      as="header"
      position="left"
      className={clsx("header--wrapper", className)}
      breakpoint="mobile"
      menuId="Primary-Nav"
      {...props}
    >
      <SkipLink />
      <Hamburger.Toggle
        variantAppearance='filled'
        variant='primary'
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
        <Switch
          checked={theme === "dark"}
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className='block darkmode__switch px-8 py-4 surface-frame'
          variant={"light"}
          variantAppearance='filled'
          paint="all"
        >{
            theme === "dark" ?
              <Icon icon={RiSunLine} variant='warning' />
              : <Icon icon={RiMoonClearFill} variant='light' />
          }
        </Switch>
      </Hamburger.Menu>
    </Hamburger.Wrapper>
  )
}
