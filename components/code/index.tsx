import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'
import DOMPurify from 'isomorphic-dompurify'

interface Props {
    codeString: string
    lang?: BundledLanguage;
    inline?: boolean;
}
export default async function Code({ codeString, lang = "tsx", inline = false }: Props) {
    
    const out = await codeToHtml(codeString, {
        lang: lang,
        theme: 'github-dark'
    });

    const safeHtml = DOMPurify.sanitize(out);

    if (!inline) {
        return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
    }

    return <span dangerouslySetInnerHTML={{ __html: safeHtml }} />
}