import type { BundledLanguage } from 'shiki';
import {customGithubDark, highlighter} from '@/components/code/highligher';

interface Props {
    codeString: string
    lang?: BundledLanguage;
    inline?: boolean;
}

export default async function Code({ 
    codeString, 
    lang = "tsx", 
    inline = false
 }: Props) {

    const out = highlighter.codeToHtml(codeString, {
        lang: lang,
        theme: customGithubDark
    });

    if (!inline) {
        return <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: out }} />
    }

    const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, "");

    return <code className={`shiki-inline shiki`} dangerouslySetInnerHTML={{ __html: innerHtml }} />
}