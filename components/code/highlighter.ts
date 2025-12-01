import { logError, logInfo } from '@/lib/logging/log'
import { isNonEmptyArray } from '@/lib/utils/guards'
import type { Variant, VariantAppearance } from '@/types/variant'
import { createHighlighter, type Highlighter, type ThemeRegistration } from 'shiki'
import { HighlightCustomTokensOptions } from './code.type'


declare global {
  var __highlighterPromise: Promise<Highlighter> | undefined
  var __customTheme: ThemeRegistration | undefined
  var __inlineTheme: ThemeRegistration | undefined
}
const globalForShiki = globalThis


export async function getHighlighterSingleton(): Promise<Highlighter> {
  if (!globalForShiki.__highlighterPromise) {
    if (process.env.NODE_ENV !== 'production') {
      logInfo('🟦 Creating new Shiki highlighter', { context: `getHighlighterSingleton` })
    }
    const highlighterPromise = createHighlighter({
      // themes: ['github-dark', 'light-plus'],
      themes: ['github-dark-default', 'github-light'],
      langs: ['tsx', 'ts', 'css', 'md', 'bash', 'html']
    }).catch(err => {
      // reset cache so a later retry can succeed
      delete globalForShiki.__highlighterPromise
      logError('Failed to create shiki Highlighter', err, { context: "getHighlighterSingleton" })
      throw err
    })
    globalForShiki.__highlighterPromise = highlighterPromise
  }
  return globalForShiki.__highlighterPromise
}

export async function getInlineCodeTheme() {
  if (globalForShiki.__inlineTheme) return globalForShiki.__inlineTheme
  const highlighter = await getHighlighterSingleton()
  const baseTheme = highlighter.getTheme('github-light')

  globalForShiki.__inlineTheme = baseTheme
  return baseTheme
}

/**
 * Builds a custom GitHub Dark theme variant with modified colors.
 */
export async function getCustomTheme(): Promise<ThemeRegistration> {
  if (globalForShiki.__customTheme) return globalForShiki.__customTheme

  const highlighter = await getHighlighterSingleton()
  // const baseTheme = highlighter.getTheme('github-dark')
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

  logInfo("🧧 customTheme", {data: customTheme})

  globalForShiki.__customTheme = customTheme
  return customTheme
}



export function highlightCustomTokens(
  html: string,
  tokens: string[] = [],
  options?: HighlightCustomTokensOptions
) {
  if (!isNonEmptyArray(tokens)) return html;

  let result = html;

  const variant = options?.variant ?? 'primary';
  const appearance = options?.appearance;

  for (const token of tokens) {
    if (!token) continue;
    const replaceRegex = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(replaceRegex, 'g');
    const attrs = [`data-variant="${variant}"`];
    if (appearance) attrs.push(`data-appearance="${appearance}"`);
    result = result.replace(regex, () => {
      return `<span class="custom-code-highlight" ${attrs.join(' ')}>${token}</span>`;
    });
  }

  return result;
}