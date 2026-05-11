import { cache } from "react";
import { ThemeRegistration } from "shiki";
import { getHighlighter } from "@/components/code/code.resources.server";

export const getInlineCodeTheme = cache(async () => {
  const highlighter = await getHighlighter()
  const baseTheme = highlighter.getTheme('github-light');

  return {
    ...baseTheme,
    name: 'custom-github-light',
    colorReplacements: {
      '#d73a49': 'var(--cc-color-danger-400)',
    },
  }
});

/**
 * Builds a custom GitHub Dark theme variant with modified colors.
 */
export const getCodeTheme = cache(async (): Promise<ThemeRegistration> => {
  const highlighter = await getHighlighter()
  const baseTheme = highlighter.getTheme('github-dark-default');

  return {
    ...baseTheme,
    name: 'custom-github-dark',
    bg: "var(--cc-color-neutral-800)",
    settings: [
      {
        settings: {
          foreground: baseTheme.settings?.[0]?.settings?.foreground || 'var(--cc-color-neutral-300)',
          background: 'var(--cc-color-neutral-800)',
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
          foreground: 'var(--cc-color-neutral-300)',
          fontStyle: 'italic',
        },
      },
    ],
    colors: {
      ...baseTheme.colors,
      'editor.background': 'var(--cc-color-neutral-800)',
      comment: 'var(--cc-color-neutral-300)',
    },
    colorReplacements: {
      '#24292e': 'var(--cc-color-neutral-800)',
    },
  }
})
