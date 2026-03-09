'use client'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import SkipLink from '@/components/skiplink'
import { Hamburger } from '@/components/hamburger'
import { RiMenuLine } from '@remixicon/react'
import NavLinks from './navLinks'
import DarkModeSwitch from '../darkModeSwitch'
import BubbleButton from '../bubbles/bubbleButton'

export default function Header({ className, userTheme, ...props }: ComponentProps<'header'> & { userTheme: string }) {

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
            <NavLinks
              className='nav__primary'
              aria-label="Primary"
            />
            <div className='header__toggles'>
              <BubbleButton />
              <DarkModeSwitch userTheme={userTheme} />
            </div>
          </div>
        </Hamburger.Menu>
      </Hamburger.Wrapper>
    </>
  )
}
