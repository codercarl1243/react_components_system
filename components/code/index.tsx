import type { BundledLanguage } from 'shiki';
import { customGithubDark, highlighter } from '@/components/code/highlighter';

interface Props {
    codeString: string
    lang?: "tsx" | "ts" | "css" | "md";
    inline?: boolean;
    dataWidth?: "full" | "default"
}

export default async function Code({
    codeString,
    lang = "tsx",
    inline = false,
    dataWidth = "default"
}: Props) {

    const loaded = new Set(highlighter.getLoadedLanguages?.() ?? []);
    const safeLang = (loaded.has(lang) ? lang : 'plaintext') as BundledLanguage;

    const out = highlighter.codeToHtml(
        codeString,
        {
            lang: safeLang,
            theme: customGithubDark
        }
    );

    if (!inline) {
        return <div data-width={dataWidth} className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: out }} />
    }

    const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, "");

    return <code data-width={dataWidth} className={`shiki-inline shiki`} dangerouslySetInnerHTML={{ __html: innerHtml }} />
}