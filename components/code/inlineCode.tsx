import { InlineCodeProps, SupportedLangs } from "./code.type";
import { getHighlighterSingleton, getInlineCodeTheme } from "./highlighter";

export default async function InlineCode({
    codeString,
    lang = 'tsx',
}: InlineCodeProps) {

    const highlighter = await getHighlighterSingleton()
    const loadedLanguages = new Set(highlighter.getLoadedLanguages?.() ?? [])
    const safeLanguage = (loadedLanguages.has(lang) ? lang : 'text') as SupportedLangs
    const inlineTheme = await getInlineCodeTheme();

    const out = highlighter.codeToHtml(
        codeString,
        {
            lang: safeLanguage,
            theme: inlineTheme
        }
    )

    const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, '')

    // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted in this context
    return (
        <code
            className={'shiki-inline shiki'}
            dangerouslySetInnerHTML={{ __html: innerHtml }}
        />
    )
}