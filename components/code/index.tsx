import { getHighlighterSingleton, getCustomTheme } from '@/components/code/highlighter'
import { CopyButton } from '@/components/button/copyButton'
import { createHash } from 'crypto';
import { CodeProps, SupportedLangs } from './code.type';
import InlineCode from './inlineCode';

export default async function Code({
  codeString,
  lang = 'tsx',
  inline = false,
  layout = 'content',
  title,
  copyEnabled = true
}: CodeProps) {
  if (!codeString.trim()) {
    return null
  }

  if (inline) {
    return <InlineCode codeString={codeString} lang={lang} />
  }
  
  const highlighter = await getHighlighterSingleton()
  const loadedLanguages = new Set(highlighter.getLoadedLanguages?.() ?? [])
  const safeLanguage = (loadedLanguages.has(lang) ? lang : 'plaintext') as SupportedLangs
  const customTheme = await getCustomTheme()

  const out = highlighter.codeToHtml(
    codeString,
    {
      lang: safeLanguage,
      theme: customTheme
    }
  )

  const titleId = title ? `code-${createHash('sha1').update(title).digest('hex').slice(0, 8)}` : undefined;

  return (
    <div className={`shiki-wrapper width-${layout}`}>
      {(title || copyEnabled) && (
        <div className="code-header">
          {title && <div id={titleId} className="code-title">{title}</div>}
          {copyEnabled && <CopyButton text={codeString} />}
        </div>
      )}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted in this context */}
      <div {...(title && { role: 'region', 'aria-labelledby': titleId, tabIndex: 0 })}
        dangerouslySetInnerHTML={{ __html: out }} />
    </div>
  )
}


