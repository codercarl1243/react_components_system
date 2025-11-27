import { logError, logInfo } from '@/lib/logging/log'
import { createHighlighter, type Highlighter, type ThemeRegistration } from 'shiki'


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
    settings: [
      {
        settings: {
          foreground: baseTheme.settings?.[0]?.settings?.foreground || '#e1e4e8',
          background: '#1c1e24',
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
          foreground: '#9198a1',
          fontStyle: 'italic',
        },
      },
    ],
    colors: {
      ...baseTheme.colors,
      'editor.background': '#1c1e24',
      comment: '#9198a1',
    },
    colorReplacements: {
      '#24292e': '#1c1e24',
    },
  }

  globalForShiki.__customTheme = customTheme
  return customTheme
}