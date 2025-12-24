'use client'

import { useState } from 'react'
import type { CodeKey } from './codeMap'
import type { ButtonProps } from '@/components/button/button.type'
import { Inline } from '@/components/primitives'
import { ToggleGroup } from '@/components/button/toggle'

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
      value: key,
      variant: variant as ButtonProps['variant'],
      variantAppearance: appearance as ButtonProps['variantAppearance'],
      children: formatLabel(key),
    };
  };

  return (
    <figure
      className="surface-frame p-8 frame-inset-8 flow-8 theming_buttonExample"
      data-active={active}
    >
      <figcaption>
        Click a button to see its code:
      </figcaption>

      {/* Controls */}
      <Inline>
        <ToggleGroup
          items={keys.map(constructToggle)}
          aria-label="Example of buttons with different theming"
          value={active}
          onValueChange={(next) => setActive(next as CodeKey)}
        />
      </Inline>

      {/* Code blocks */}
      <div className="code-example">
        {children}
      </div>
    </figure>
  )
}
