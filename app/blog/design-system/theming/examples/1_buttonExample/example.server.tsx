import Code from '@/components/code'
import { CODE_MAP, keys} from './codeMap'
import ButtonExampleClient from './example.client'


export default function ButtonExample() {
  return (
    <ButtonExampleClient keys={keys}>
      {keys.map((key) => {
        const { tokens, code } = CODE_MAP[key]

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
              codeString={code}
              copyEnabled
            />
          </div>
        )
      })}
    </ButtonExampleClient>
  )
}