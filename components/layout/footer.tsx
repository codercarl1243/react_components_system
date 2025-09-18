import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'

export default function Footer ({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear()
  return (
        <footer className={clsx('footer', className)} {...props}>
            <p>&copy; {year} Carl Davidson. All rights reserved. <span>|</span> <Link href="https://codercarl.dev">codercarl.dev</Link></p>
        </footer>
  )
}
