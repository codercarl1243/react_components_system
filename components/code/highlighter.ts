import { createHighlighter, type Highlighter, type ThemeRegistration } from 'shiki';

class ShikiSingleton {
    private static instance: ShikiSingleton | null = null;
    private highlighter: Highlighter | null = null;
    private customTheme: ThemeRegistration | null = null;
    private isInitializing = false;

    private constructor() {
        // Private constructor prevents direct instantiation
    }

    static getInstance(): ShikiSingleton {
        if (!ShikiSingleton.instance) {
            ShikiSingleton.instance = new ShikiSingleton();
        }
        return ShikiSingleton.instance;
    }

    async getHighlighter(): Promise<Highlighter> {
        if (this.highlighter) {
            return this.highlighter;
        }

        if (this.isInitializing) {
            while (this.isInitializing) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            if (this.highlighter) {
                return this.highlighter;
            }
        }

        this.isInitializing = true;

        try {
            this.highlighter = await createHighlighter({
                themes: ["github-dark"],
                langs: ["tsx", "ts", "css", "md"],
            });
            
            console.log('Shiki highlighter created successfully');
            return this.highlighter;
        } finally {
            this.isInitializing = false;
        }
    }

    async getCustomTheme(): Promise<ThemeRegistration> {
        if (this.customTheme) {
            return this.customTheme;
        }

        const highlighter = await this.getHighlighter();
        const baseTheme = highlighter.getTheme("github-dark");

        this.customTheme = {
            ...baseTheme,
            name: 'custom-github-dark',
            settings: [
                { 
                    settings: { 
                        foreground: baseTheme.settings?.[0]?.settings?.foreground || '#e1e4e8', 
                        background: '#1c1e24' 
                    } 
                },
                ...(baseTheme.settings || []).slice(1).filter((token) => {
                    if (!token.scope) return true;

                    const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
                    return !scopes.some((scope: string) =>
                        scope === "comment" ||
                        scope === "punctuation.definition.comment" ||
                        scope === "string.comment" ||
                        scope.includes("comment")
                    );
                }),
                {
                    scope: [
                        "comment",
                        "punctuation.definition.comment",
                        "string.comment",
                    ],
                    settings: {
                        foreground: "#9198a1",
                        fontStyle: "italic",
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
        };

        return this.customTheme;
    }

    dispose(): void {
        if (this.highlighter) {
            this.highlighter.dispose?.();
            this.highlighter = null;
        }
        this.customTheme = null;
        ShikiSingleton.instance = null;
    }
}

// Export convenience functions
export async function getHighlighterSingleton(): Promise<Highlighter> {
    return ShikiSingleton.getInstance().getHighlighter();
}

export async function getCustomGithubDark(): Promise<ThemeRegistration> {
    return ShikiSingleton.getInstance().getCustomTheme();
}

export function disposeHighlighter(): void {
    ShikiSingleton.getInstance().dispose();
}