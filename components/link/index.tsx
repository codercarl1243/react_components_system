import NextLink from 'next/link'
import Icon from '../icon'
import { RiExternalLinkLine } from '@remixicon/react'
import clsx from 'clsx'
import type { LinkProps } from '@/components/link/link.type'

/**
 * Render a link that chooses between an external <a> (with security attributes and an external icon),
 * a Next.js client-side link, or plain children when no valid link is provided.
 *
 * If `href` is falsy the component renders only `children`. Unsafe protocols (`javascript`, `data`, `vbscript`)
 * are blocked and will also render only `children`. Protocol-relative URLs or recognised external schemes
 * (`http`, `https`, `mailto`, `tel`) are rendered as an external anchor with `rel="noopener noreferrer"` and an external-link icon.
 * All other values are rendered using Next.js navigation (NextLink).
 *
 * @param href - The destination URL. Behaviour varies by scheme:
 *   - falsy: no link rendered;
 *   - unsafe schemes (`javascript`, `data`, `vbscript`): blocked (no link);
 *   - external schemes or protocol-relative (`//`) with safe schemes (`http`, `https`, `mailto`, `tel`): render external `<a>`;
 *   - otherwise: render Next.js client-side link.
 * @returns A React element representing the appropriate link (or plain children).
 */
export default function Link({ icon, children, className, href, ...props }: LinkProps) {
  if (!href) return <>{children}</>

  const schemeMatch = href.match(/^([a-zA-Z][a-zA-Z+.-]*):/)
  const scheme = schemeMatch?.[1]?.toLowerCase()
  const isProtocolRelative = href.startsWith('//')
  const isExternal = Boolean(scheme) || isProtocolRelative
  const UNSAFE_PROTOCOLS = new Set(['javascript', 'data', 'vbscript'])
  const SAFE_EXTERNAL = new Set(['http', 'https', 'mailto', 'tel'])

  // Block unsafe protocols entirely
  if (scheme && UNSAFE_PROTOCOLS.has(scheme)) {
    return <>{children}</>
  }

  if (isExternal && (!scheme || SAFE_EXTERNAL.has(scheme))) {
    return (
      <a href={href} rel="noopener noreferrer" className={clsx(className, {'link-w-icon': icon}, 'link external')} {...props}>
        {icon && <Icon icon={icon} />}
        {children}
        <Icon color={'currentColor'} icon={RiExternalLinkLine} size={'sm'} className='icon' />
      </a>
    )
  }
  return (
    <NextLink href={href} className={clsx(className, {'link-w-icon': icon}, 'link internal')} {...props}>
      {icon && <Icon icon={icon} />}
      {children}
    </NextLink>
  )
}

