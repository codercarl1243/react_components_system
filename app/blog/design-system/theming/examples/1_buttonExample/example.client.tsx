'use client'

import { useState } from 'react'
import Button from '@/components/button'
import type { CodeKey } from './codeMap'

export default function ButtonExampleClient({
  keys,
  children,
}: {
  keys: CodeKey[]
  children: React.ReactNode
}) {
  const [active, setActive] = useState<CodeKey>(keys[0])

  return (
    <figure
      className="surface-frame p-8 frame-inset-8 theming_buttonExample"
      data-active={active}
    >
      <figcaption className="text-sm text-muted center mb-4">
        Click a button to see its code:
      </figcaption>

      {/* Controls */}
      <div className="flex gap-2 justify-center mb-6">
        {keys.map((key) => (
          <Button
            key={key}
            type="button"
            aria-pressed={active === key}
            onClick={() => setActive(key)}
          >
            {key.replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* Code blocks */}
      <div className="code-example">
        {children}
      </div>
    </figure>
  )
}