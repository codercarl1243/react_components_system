import Code from '@/components/code'
import { CODE_MAP, keys } from './codeMap'
import ButtonExampleClient from './example.client'
import type { Variant } from '@/types/variant'


export default function ButtonExample() {
  return (
    <ButtonExampleClient keys={keys}>
      {keys.map((key) => {
        const { tokens, code } = CODE_MAP[key]
        const [variant] = key.split('_') as [
          Variant
        ]
        return (
          <div
            key={key}
            data-code-block
            data-code-key={key}
          >
            <Code
              lang="html"
              title="HTML (framework-agnostic):"
              highlightTokens={tokens}
              options={{ variant: "secondary" }}
              codeString={code}
              copyEnabled
            />
          </div>
        )
      })}
    </ButtonExampleClient>
  )
}