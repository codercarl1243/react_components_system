import { highlightCustomTokens, getHighlighter, getCodeTheme, getLoadedLanguages } from '@/components/code/highlighter'
import { CopyButton } from '@/components/button/copyButton'
import { createHash } from 'crypto';
import { CodeProps, SupportedLangs } from './code.type';
import { isEmptyString } from '@/lib/utils/guards';

export default async function Code({
  codeString,
  lang = 'tsx',
  layout = 'content',
  title,
  copyEnabled = true,
  highlightTokens = [],
  options
}: CodeProps) {
  if (isEmptyString(codeString)) {
    return null
  }

  const [highlighter, theme, loadedLanguages] = await Promise.all([
    getHighlighter(),
    getCodeTheme(),
    getLoadedLanguages(),
  ]);

  const safeLanguage = (loadedLanguages.has(lang) ? lang : 'text') as SupportedLangs

  const out = highlighter.codeToHtml(
    codeString,
    {
      lang: safeLanguage,
      theme: theme
    }
  )
  const highlightedCode = highlightCustomTokens(out, highlightTokens, options);
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
        dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  )
}
