import { cache } from "react";
import { ThemeRegistration } from "shiki";
import { getHighlighter } from "@/components/code/code.resources.server";

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

  return {
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
})
