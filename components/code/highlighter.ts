import { logError, logInfo } from '@/lib/logging/log'
import { isNonEmptyArray } from '@/lib/utils/guards'
import { createHighlighter, type Highlighter, type ThemeRegistration } from 'shiki'
import type { HighlightCustomTokensOptions, HighlightTokens } from './code.type'
import { cache } from 'react'


declare global {
  var __highlighterPromise: Promise<Highlighter> | undefined
}
const globalForShiki = globalThis

export const getHighlighter = cache(async () => {
  if (!globalForShiki.__highlighterPromise) {

    logInfo('🟦 Creating new Shiki highlighter', { context: `getHighlighterSingleton` })

    globalForShiki.__highlighterPromise = createHighlighter({
      // themes: ['github-dark', 'light-plus'],
      themes: ['github-dark-default', 'github-light'],
      langs: ['tsx', 'ts', 'css', 'md', 'bash', 'html']
    }).catch(err => {
      // reset cache so a later retry can succeed
      delete globalForShiki.__highlighterPromise
      logError('Failed to create shiki Highlighter', err, { context: "getHighlighterSingleton" })
      throw err
    })
  }

  return globalForShiki.__highlighterPromise
});

export const getLoadedLanguages = cache(async () => {
  const highlighter = await getHighlighter();
  return new Set(highlighter.getLoadedLanguages?.() ?? []);
});

export const getInlineCodeTheme = cache(async () => {
  const highlighter = await getHighlighter()
  return highlighter.getTheme('github-light')
});

/**
 * Builds a custom GitHub Dark theme variant with modified colors.
 */
export const getCodeTheme = cache(async (): Promise<ThemeRegistration> => {
  const highlighter = await getHighlighter()
  const baseTheme = highlighter.getTheme('github-dark-default')

  const customTheme: ThemeRegistration = {
    ...baseTheme,
    name: 'custom-github-dark',
    bg: "var(--color-neutral-700)",
    settings: [
      {
        settings: {
          foreground: baseTheme.settings?.[0]?.settings?.foreground || 'var(--color-neutral-300)',
          background: 'var(--color-neutral-700)',
        },
      },
      ...(baseTheme.settings || []).slice(1).filter((token) => {
        if (!token.scope) return true
        const scopes = Array.isArray(token.scope) ? token.scope : [token.scope]
        return !scopes.some((s: string) =>
          s === 'comment' ||
          s === 'punctuation.definition.comment' ||
          s === 'string.comment' ||
          s.includes('comment')
        )
      }),
      {
        scope: [
          'comment',
          'punctuation.definition.comment',
          'string.comment',
        ],
        settings: {
          foreground: 'var(--color-neutral-300)',
          fontStyle: 'italic',
        },
      },
    ],
    colors: {
      ...baseTheme.colors,
      'editor.background': 'var(--color-neutral-800)',
      comment: 'var(--color-neutral-300)',
    },
    colorReplacements: {
      '#24292e': 'var(--color-neutral-800)',
    },
  }

  return customTheme
})

export function highlightCustomTokens(
  html: string,
  tokens: HighlightTokens = [],
  options?: HighlightCustomTokensOptions
) {
  if (!isNonEmptyArray(tokens)) return html;

  let result = html;

  const variant = options?.variant ?? 'primary';
  const appearance = options?.appearance;

  for (const token of tokens) {
    if (!token) continue;

    // Check if token is a data attribute pattern like 'data-variant="primary"'
    const dataAttrMatch = token.match(/^(data-[\w-]+)="([^"]+)"$/);

    if (dataAttrMatch) {
      const [, attrName, attrValue] = dataAttrMatch;

      // Match the attribute name, equals sign, and quoted value across multiple spans
      // Example: <span>data-variant</span><span>=</span><span>"primary"</span>
      const pattern = new RegExp(
        `(<span[^>]*>\\s*${escapeRegex(attrName)}\\s*</span>` + // attribute name
        `<span[^>]*>\\s*=\\s*</span>` +                          // equals sign
        `<span[^>]*>\\s*"${escapeRegex(attrValue)}"\\s*</span>)`, // quoted value
        'g'
      );

      const attrs = [`data-variant="${variant}"`];
      if (appearance) attrs.push(`data-appearance="${appearance}"`);

      result = result.replace(pattern, (match) => {
        return `<span class="custom-code-highlight" ${attrs.join(' ')}>${match}</span>`;
      });
    } else {
      // Fallback to original logic for non-attribute tokens
      const replaceRegex = escapeRegex(token);
      const regex = new RegExp(replaceRegex, 'g');
      const attrs = [`data-variant="${variant}"`];
      if (appearance) attrs.push(`data-appearance="${appearance}"`);

      result = result.replace(regex, () => {
        return `<span class="custom-code-highlight" ${attrs.join(' ')}>${token}</span>`;
      });
    }
  }

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}