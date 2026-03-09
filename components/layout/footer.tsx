import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'
import { Block, Inline, Stack } from '@/components/primitives'
import BuyMeACoffeeCTA from '../buyMeACoffeeCTA'
import { RiMailSendLine, RiGithubFill, RiLinkedinLine } from '@remixicon/react'
import Icon from '@/components/icon'
import NavLinks from './navLinks'

export default function Footer({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear()

  return (
    <Stack as="footer" gap={8} className={clsx('footer mt-16', className)} {...props} >
      <div className='divider' />
      <Stack align="center" gap={8}>
        <Inline
          as="nav"
          aria-label="Footer navigation"
          justify="center"
          gap={16}
          className="footer__nav mx-auto"
        >
        </Inline>
        <NavLinks
          className='nav__secondary'
          aria-label="Secondary"
          showHome={true}
        />
        <Block
          as="ul"
          variant="neutral"
          variantAppearance="filled"
          paint="all"
          className='footer__socials contact-links__grid surface-frame mx-auto px-2'>
          <li><BuyMeACoffeeCTA /></li>
          <li>
            <Link className="contact-link contact-link--external" href="mailto:codercarl1243@gmail.com">
              <Icon className="contact-link__icon" icon={RiMailSendLine} /><span>Email</span>
            </Link>
          </li>
          <li>
            <Link className="contact-link contact-link--external" href="https://github.com/codercarl1243">
              <Icon className="contact-link__icon" icon={RiGithubFill} /><span>Github</span>
            </Link>
          </li>
          <li>
            <Link className="contact-link contact-link--external" href="https://www.linkedin.com/in/carl-davidson/">
              <Icon className="contact-link__icon" icon={RiLinkedinLine} /><span>LinkedIn</span>
            </Link>
          </li>
        </Block>
      </Stack>
      <p className="footer__copyright">
        &copy; {year} Carl Davidson. All rights reserved.
      </p>
    </Stack>
  )
}
