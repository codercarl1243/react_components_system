import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';

interface Props {
    codeString: string
    lang?: BundledLanguage;
    inline?: boolean;
}
const THEME = 'github-dark';
const THEME_STYLES = { backgroundColor: "#24292e", color: "#e1e4e8" };

export default async function Code({ 
    codeString, 
    lang = "tsx", 
    inline = false
 }: Props) {

    const out = await codeToHtml(codeString, {
        lang: lang,
        theme: THEME
    });

    if (!inline) {
        return <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: out }} />
    }

    const innerHtml = out.replace(/^.*?<code[^>]*>|<\/code>.*$/gs, "");

    return <code className={`shiki-inline shiki ${THEME}`} style={THEME_STYLES} dangerouslySetInnerHTML={{ __html: innerHtml }} />
}