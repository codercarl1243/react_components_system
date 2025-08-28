import type { BundledLanguage } from 'shiki';
import {customGithubDark, highlighter} from '@/components/code/highligher';

interface Props {
    codeString: string
    lang?: BundledLanguage;
    inline?: boolean;
    dataWidth?: "full" | "default"
}

export default async function Code({ 
    codeString, 
    lang = "tsx", 
    inline = false,
    dataWidth = "default"
 }: Props) {

    const out = highlighter.codeToHtml(codeString, {
        lang: lang,
        theme: customGithubDark
    });

    if (!inline) {
        return <div data-width={dataWidth} className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: out }} />
    }

    const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, "");

    return <code data-width={dataWidth} className={`shiki-inline shiki`} dangerouslySetInnerHTML={{ __html: innerHtml }} />
}