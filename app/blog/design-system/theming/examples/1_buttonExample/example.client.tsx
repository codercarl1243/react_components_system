'use client'

import { useState } from 'react'
import type { CodeKey } from './codeMap'
import type { ButtonProps } from '@/components/button/button.type'
import { Block } from '@/components/primitives'

function formatLabel(key: CodeKey) {
  return key
    .replace('_', ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export default function ButtonExampleClient({
  keys,
  children,
}: {
  keys: CodeKey[]
  children: React.ReactNode
}) {
  const [active, setActive] = useState<CodeKey>(keys[0])

  const constructToggle = (key: CodeKey) => {
    const [variant, appearance] = key.split("_");

    return {
      variant: variant as ButtonProps['variant'],
      variantAppearance: appearance as ButtonProps['variantAppearance'],
      children: formatLabel(key),
    };
  };

  return (
    <Block as="figure"
      className="surface-frame p-8 frame-inset-8 flow-8 theming_buttonExample"
      variant="inverse"
      variantAppearance='outlined'
      paint="all"
      data-active={active}
    >
      <figcaption className='text-sm italic'>
        Click a button to see its code:
      </figcaption>
      <Block
        className={"toggle-group theming_buttonExample__buttons mx-auto"}
        aria-label="Example of buttons with different theming">
        {keys.map((key => {
          const { variant, variantAppearance, children } = constructToggle(key)
          return <button
            data-example-variant={variant || undefined}
            data-example-appearance={variantAppearance || undefined}
            data-example-paint={"all"}
            type='button'
            style={{ width: "fit-content" }}
            className="button example-component"
            aria-pressed={active === key}
            onClick={() => setActive(key)}
            key={key}
          >
            <span>{children}</span>
          </button>
        }
        ))}
      </Block>

      {/* Code blocks */}
      <div className="code-example">
        {children}
      </div>
    </Block>
  )
}
