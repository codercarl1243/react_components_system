import clsx from 'clsx'
import type { ComponentProps } from 'react'
import Link from '@/components/link'

/**
 * Site footer component that displays the current year, copyright notice and a link to codercarl.dev.
 *
 * The component computes the current year at render time and forwards any other standard footer element props to the root <footer>.
 *
 * @param className - Optional additional CSS class(es) applied to the footer element.
 * @returns The rendered footer JSX element.
 */
export default function Footer ({ className, ...props }: ComponentProps<'footer'>) {
  const year = new Date().getFullYear()
  return (
        <footer className={clsx('footer', className)} {...props}>
            <p>&copy; {year} Carl Davidson. All rights reserved. <span>|</span> <Link href="https://codercarl.dev">codercarl.dev</Link></p>
        </footer>
  )
}
