import type { BundledLanguage } from 'shiki'
import { getCustomGithubDark, getHighlighterSingleton } from '@/components/code/highlighter'
import { CopyButton } from '@/components/button/copyButton'
type SupportedLangs = Extract<BundledLanguage, 'tsx' | 'ts' | 'css' | 'md' | 'bash'>;

interface Props {
    codeString: string
    lang?: SupportedLangs;
    inline?: boolean;
    layout?: 'full' | 'bleed' | 'content';
    title?: string;
    copyEnabled?: boolean;
}

export default async function Code ({
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
    return <div
            className={`shiki-wrapper width-${layout}`}>
            {copyEnabled && <CopyButton text={codeString} />}
            <div {...(title && { 'aria-label': title, role: 'region' })}
                dangerouslySetInnerHTML={{ __html: out }} />
        </div>
  }

  const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, '')

  return <code
        className={'shiki-inline shiki'}
        {...(title && { 'aria-label': title})}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
    />
}
