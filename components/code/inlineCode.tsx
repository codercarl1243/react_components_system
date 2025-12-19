import { getHighlighter, getLoadedLanguages } from "@/components/code/code.resources.server";
import { getInlineCodeTheme } from "@/components/code/code.theme.server";
import { InlineCodeProps, SupportedLangs } from "@/components/code/code.type";
import { highlightCustomTokens } from "@/components/code/code.utilities.server";

export default async function InlineCode({
    codeString,
    lang = 'tsx',
    noWrap = true,
    highlightTokens = [],
    options
}: InlineCodeProps) {

    const [highlighter, theme, loadedLanguages] = await Promise.all([
        getHighlighter(),
        getInlineCodeTheme(),
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

    let innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, '')
    innerHtml = highlightCustomTokens(innerHtml, highlightTokens, options);

    // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted in this context
    return (
        <code
            className={`shiki-inline shiki${noWrap ? " text-nowrap" : ""}`}
            dangerouslySetInnerHTML={{ __html: innerHtml }}
        />
    )
}