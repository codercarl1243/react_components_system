'use client'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { usePathname } from 'next/navigation'
import SkipLink from '@/components/skiplink'
import Link from '@/components/link'
import { Hamburger } from '@/components/hamburger'
import Icon from '@/components/icon'
import Switch from '@/components/button/switch'
import { useTheme } from '@/lib/hooks/useTheme'
import { RiBookReadFill, RiHomeHeartLine, RiMenuLine, RiMoonClearFill, RiSunLine, RiUser3Fill } from '@remixicon/react'
import Bubbles from '@/components/bubbles/bubbles'
import useBubbles from '@/components/bubbles/useBubble'

export default function Header({ className, userTheme, ...props }: ComponentProps<'header'> & { userTheme: string }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme(userTheme);
  const { bubbles, splatters, popBubble, addBubble } = useBubbles();

  const isBlogPath = pathname === '/blog' || pathname.startsWith('/blog/');
  // TODO: restructure this to wrap a nav element inside of the hamburger wrapper. this way we can isolate the nav elements from the Toggles
  return (
    <>
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
          as="div"
        >
          <div className='nav__wrapper'>
            <nav
            className='nav__primary'
            aria-label="Primary">
            {pathname !== '/' && <Link href="/" icon={RiHomeHeartLine}>Home</Link>}
            <Link
              href="/blog"
              className={clsx({ 'active': isBlogPath })}
              aria-current={isBlogPath ? 'page' : undefined}
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

          <div className='header__toggles'>
            <button
              className="bubble-button bubble"
              type="button"
              onClick={addBubble}
            >
              <span className="sr-only">Blow a decorative bubble</span>
            </button>
            <Switch
              checked={theme === "dark"}
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className='block darkmode__switch surface-frame'
              variant={"light"}
              variantAppearance='filled'
              paint="all"
            >{
                theme === "dark" ?
                  <Icon icon={RiSunLine} variant='warning' />
                  : <Icon icon={RiMoonClearFill} variant='light' />
              }
            </Switch>
          </div>
          </div>
        </Hamburger.Menu>
      </Hamburger.Wrapper>
      <Bubbles
        bubbles={bubbles}
        splatters={splatters}
        popBubble={popBubble}
      />
    </>
  )
}
