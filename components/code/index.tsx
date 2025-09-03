import type { BundledLanguage } from 'shiki';
import { getCustomGithubDark, getHighlighterSingleton } from '@/components/code/highlighter';

interface Props {
    codeString: string
    lang?: "tsx" | "ts" | "css" | "md";
    inline?: boolean;
    layout?: "full" | "bleed" | "content";
    title?: string;
}

export default async function Code({
    codeString,
    lang = "tsx",
    inline = false,
    layout = "content",
    title
}: Props) {
    if (!codeString.trim()) {
        return null;
    }

    const highlighter = await getHighlighterSingleton();
    const customGithubDark = await getCustomGithubDark();

    const loadedLanguages = new Set(highlighter.getLoadedLanguages?.() ?? []);
    const safeLanguage = (loadedLanguages.has(lang) ? lang : 'plaintext') as BundledLanguage;

    const out = highlighter.codeToHtml(
        codeString,
        {
            lang: safeLanguage,
            theme: customGithubDark
        }
    );

    if (!inline) {
        return <div
            className={`shiki-wrapper width-${layout}`}
            {...(title && { 'aria-label': title, role: "region"  })}
            dangerouslySetInnerHTML={{ __html: out }}
        />
    }

    const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, "");

    return <code
        className={`shiki-inline shiki`}
        {...(title && { 'aria-label': title, role: "region" })}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
    />
}