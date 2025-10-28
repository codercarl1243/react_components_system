import { createHighlighter, type Highlighter, type ThemeRegistration } from 'shiki'

// ✅ Cached in globalThis to persist across reloads (especially in dev)
const globalForShiki = globalThis as unknown as {
  __highlighterPromise?: Promise<Highlighter>
  __customTheme?: ThemeRegistration
}

/** 
 * Create or reuse the Shiki highlighter singleton.
 */
export async function getHighlighterSingleton(): Promise<Highlighter> {
  if (!globalForShiki.__highlighterPromise) {
    console.debug('🟦 Creating new Shiki highlighter')
    globalForShiki.__highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: ['tsx', 'ts', 'css', 'md', 'bash']
    })
  }
  return globalForShiki.__highlighterPromise
}

/**
 * Builds a custom GitHub Dark theme variant with modified colors.
 * This runs once and caches the result.
 */
export async function getCustomGithubDark(): Promise<ThemeRegistration> {
  if (globalForShiki.__customTheme) return globalForShiki.__customTheme

  const highlighter = await getHighlighterSingleton()
  const baseTheme = highlighter.getTheme('github-dark')

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