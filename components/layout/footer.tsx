import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'
import { Inline } from '@/components/primitives'

export default function Footer ({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear()
  return (
        <Inline as="footer" align="center" className={clsx('footer', className)} {...props}>
            <p>&copy; {year} Carl Davidson. All rights reserved. <span>|</span> <Link href="mailto:codercarl1243@gmail.com">codercarl1243@gmail.com</Link></p>
        </Inline>
  )
}
