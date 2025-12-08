'use client'

import { useState, useEffect } from 'react'
import Icon from '../icon'
import { RiCheckFill, RiErrorWarningLine, RiFileCopyLine } from '@remixicon/react'
import Button from '@/components/button'

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean | null>(null)

  useEffect(() => {
    // Check clipboard support after hydration
    setIsSupported(!!navigator.clipboard)
  }, [])

  // Don't render anything until we've checked support
  if (isSupported === null || !isSupported) {
    return null
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(false)
      setTimeout(() => setCopied(false), 1250)
    } catch (err) {
      setError(true)
      // eslint-disable-next-line no-console
      console.log("error copying content to clipboard", err)
    }
  }

  return (
    <Button
      onClick={copyToClipboard}
      variantAppearance={copied ? 'outlined' : 'filled'}
      variant={copied ? undefined : 'accent'}
      aria-label="Copy to clipboard"
      title={error ? 'Copy failed' : copied ? 'Copied!' : 'Copy to clipboard'}
      className='button--copy'
      disabled={error}
    >
      {error
        ? (
          <Icon icon={RiErrorWarningLine} variant="danger" />
        )
        : copied
          ? (
            <Icon icon={RiCheckFill} variant='accent' />
          )
          : (
            <Icon icon={RiFileCopyLine} variant='accent' />
          )}
    </Button>
  )
}
