import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'
import { Inline } from '@/components/primitives'
import BuyMeACoffeeCTA from '../buyMeACoffeeCTA'
import { RiMailSendLine, RiGithubFill, RiLinkedinLine } from '@remixicon/react'
import Icon from '@/components/icon'

// TODO: add links to linkedin and github
export default function Footer({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear()
  return (
    <Inline as="footer" align="center" justify='even' className={clsx('footer', className)} {...props}>

      <p>&copy; {year} Carl Davidson. All rights reserved.</p>
      <span>|</span>
      <ul className='footer__socials'>
        <li><BuyMeACoffeeCTA className="contact-link"/></li>
        <li>
          <Link className="contact-link" href="mailto:codercarl1243@gmail.com" showExternalIcon={false}>
            <Icon className="contact-link__icon" icon={RiMailSendLine} /><span>Email</span>
          </Link>
        </li>
        <li>
          <Link className="contact-link" href="https://github.com/codercarl1243" showExternalIcon={false}>
            <Icon className="contact-link__icon" icon={RiGithubFill} /><span>Github</span>
          </Link>
        </li>
        <li>
          <Link className="contact-link" href="https://www.linkedin.com/in/carl-davidson/" showExternalIcon={false}>
            <Icon className="contact-link__icon" icon={RiLinkedinLine} /><span>LinkedIn</span>
          </Link>
        </li>
      </ul>
    </Inline>
  )
}
