'use client'

import { useState } from 'react'
import Button from '@/components/button'
import type { CodeKey } from './codeMap'
import type { ButtonProps } from '@/components/button/button.type'
import { Inline } from '@/components/primitives'

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
      className="surface-frame p-8 frame-inset-8 flow-8 theming_buttonExample"
      data-active={active}
    >
      <figcaption>
        Click a button to see its code:
      </figcaption>

      {/* Controls */}
      <Inline className=''>
        {keys.map((key) => {
          const [variant, appearance] = key.split("_");
          return (
          <Button
            key={key}
            type="button"
            className='mx-auto'
            aria-pressed={active === key}
            variant={variant as ButtonProps['variant']}
            variantAppearance={appearance as ButtonProps['variantAppearance']}
            onClick={() => setActive(key)}
          >
            {variant + " " + appearance}
          </Button>
        )})}
      </Inline>

      {/* Code blocks */}
      <div className="code-example">
        {children}
      </div>
    </figure>
  )
}