import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'

interface Props {
    codeString: string
    lang?: BundledLanguage;
    inline?: boolean;
}
export default async function Code({ codeString, lang = "tsx", inline = false }: Props) {
    const out = await codeToHtml(codeString, {
        lang: lang,
        theme: 'github-dark'
    })

    if (!inline) {
        return <div dangerouslySetInnerHTML={{ __html: out }} />
    }

    return <span dangerouslySetInnerHTML={{ __html: out }} />
}