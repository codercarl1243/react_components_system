import NextLink from 'next/link'
import React from 'react'
import Icon from '../icon'
import { RiExternalLinkLine } from '@remixicon/react'

export default function Link ({ children, href, ...props }: React.ComponentProps<'a'>) {
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
      <a href={href} rel="noopener noreferrer" {...props}>
        {children}{' '}
        <Icon color={'currentColor'} icon={RiExternalLinkLine} size={'sm'} />
      </a>
    )
  }
  return (
    <NextLink href={href} {...props}>{children}</NextLink>
  )
}

