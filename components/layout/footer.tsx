import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'
import { Block } from '@/components/primitives'
import BuyMeACoffeeCTA from '../buyMeACoffeeCTA'
import { RiMailSendLine, RiGithubFill, RiLinkedinLine } from '@remixicon/react'
import Icon from '@/components/icon'
import NavLinks from '@/components/navLinks'
import List from '@/components/list'

export default function Footer({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear()

  return (
    <footer className={clsx('footer footer-container flow-8 mt-16', className)} {...props} >
      <div className='divider' />
      <Block className='footer__content flow-8'>
        <NavLinks
          className='nav__secondary'
          aria-label="Secondary"
          showHome={true}
        />
        <List
          as="ul"
          marker='none'
          className='footer__socials'>
          <li>
            <Link className="socials__item" showExternalIcon={false} href="mailto:codercarl1243@gmail.com">
              <Icon icon={RiMailSendLine} color='currentcolor' />
              <span>Email</span>
            </Link>
          </li>
          <li>
            <Link className="socials__item" showExternalIcon={false} href="https://github.com/codercarl1243">
              <Icon icon={RiGithubFill} color='currentcolor' />
              <span>Github</span>
            </Link>
          </li>
          <li>
            <Link className="socials__item" showExternalIcon={false} href="https://www.linkedin.com/in/carl-davidson/">
              <Icon icon={RiLinkedinLine} color='currentcolor' />
              <span>LinkedIn</span>
            </Link>
          </li>
          <li><BuyMeACoffeeCTA className='socials__item' showExternalIcon={false} /></li>
        </List>
      </Block>
      <p className="footer__copyright mx-auto">
        &copy; {year} Carl Davidson. All rights reserved.
      </p>
    </footer>
  )
}
