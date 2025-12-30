'use client'

import { useState, useEffect } from 'react'
import Icon from '@/components/icon'
import { RiCheckFill, RiErrorWarningLine, RiFileCopyLine } from '@remixicon/react'
import Button from '@/components/button'
import { logError } from '@/lib/logging/log'

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

  useEffect(() => {
    if (!copied) return

    const id = setTimeout(() => setCopied(false), 1250)
    return () => clearTimeout(id)
  }, [copied])


  // Don't render anything until we've checked support
  if (isSupported === null || !isSupported) {
    return null
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(false)
    } catch (err) {
      setError(true)
      logError("error copying content to clipboard", err)
    }
  }


  return (
    <Button
      onClick={copyToClipboard}
      variantAppearance={copied ? 'outlined' : 'filled'}
      variant={error ? 'inverse' : 'accent'}
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
            <Icon icon={RiFileCopyLine} />
          )}
    </Button>
  )
}
