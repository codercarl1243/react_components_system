import type { BundledLanguage } from 'shiki'
import { getCustomGithubDark, getHighlighterSingleton } from '@/components/code/highlighter'
import { CopyButton } from '@/components/button/copyButton'
import { generateSlug } from '@/lib/utils/generateSlug';
import { createHash } from 'crypto';

type SupportedLangs = Extract<BundledLanguage, 'tsx' | 'ts' | 'css' | 'md' | 'bash'>;

interface Props {
  codeString: string
  lang?: SupportedLangs;
  inline?: boolean;
  layout?: 'full' | 'bleed' | 'content';
  title?: string;
  copyEnabled?: boolean;
}

export default async function Code({
  codeString,
  lang = 'tsx',
  inline = false,
  layout = 'content',
  title,
  copyEnabled = true
}: Props) {
  if (!codeString.trim()) {
    return null
  }

  const highlighter = await getHighlighterSingleton()
  const customGithubDark = await getCustomGithubDark()

  const loadedLanguages = new Set(highlighter.getLoadedLanguages?.() ?? [])
  const safeLanguage = (loadedLanguages.has(lang) ? lang : 'plaintext') as BundledLanguage

  const out = highlighter.codeToHtml(
    codeString,
    {
      lang: safeLanguage,
      theme: customGithubDark
    }
  )

  if (!inline) {
    const titleId = title ? `code-${createHash('sha1').update(codeString).digest('hex').slice(0, 8)}` : undefined;

    return <div
      className={`shiki-wrapper width-${layout}`}
    >
      <div className='code-header'>
        {title && (
          <div id={titleId} className="code-title">
            {title}
          </div>
        )}
        {copyEnabled && <CopyButton text={codeString} />}
      </div>
      <div {...(title && { role: 'region', 'aria-labelledby': titleId, tabIndex: 0 })}
        dangerouslySetInnerHTML={{ __html: out }} />
    </div>
  }

  const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, '')

  return <code
    className={'shiki-inline shiki'}
    {...(title && { 'aria-label': title })}
    dangerouslySetInnerHTML={{ __html: innerHtml }}
  />
}
