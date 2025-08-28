import { createHighlighter } from 'shiki';

export const highlighter = await createHighlighter({
    themes: ['github-dark'],
    langs: ["tsx", "ts", "css", "md"],
})

const baseTheme = highlighter.getTheme('github-dark');

// Custom theme extending github-dark
export const customGithubDark = {
    ...baseTheme,
    settings: [
        ...(baseTheme.settings || []).filter(token => {
            if (!token.scope) return true;

            const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];

            return !scopes.some((scope: string) =>
                scope === 'comment' ||
                scope === 'punctuation.definition.comment' ||
                scope === 'string.comment' ||
                scope.includes('comment')
            );
        }),
        {
            scope: [
                'comment',
                'punctuation.definition.comment',
                'string.comment'
            ],
            settings: {
                foreground: '#9198a1', // Better contrast for comments
                fontStyle: 'italic'
            }
        }
    ],
    colorReplacements: {
        '#24292e': '#1c1e24', // Replaces original dark background with a slightly different dark shade
    }
};