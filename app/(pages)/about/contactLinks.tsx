"use client";

import Icon from "@/components/icon";
import { Block } from "@/components/primitives";
import { RiMailSendLine, RiGithubFill, RiLinkedinLine, RiDiscordLine, RiCheckFill } from "@remixicon/react";
import Link from "@/components/link";
import { useEffect, useState } from "react";
import { logError } from "@/lib/logging/log";

export default function ContactLinks() {

    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText("coder_carl")
            setCopied(true)
        } catch (err) {
            logError("error copying content to clipboard", err)
        }
    }
    useEffect(() => {
        if (!copied) return

        const id = setTimeout(() => setCopied(false), 1250)
        return () => clearTimeout(id)
    }, [copied])

    return (
        <Block
            as="ul"
            variant="neutral"
            variantAppearance="filled"
            paint="all"
            className="about-contact__contact-links surface-frame p-8">
            <li>
                <Link className="contact-link" href="mailto:codercarl1243@gmail.com" showExternalIcon={false}>
                    <Icon className="contact-link__icon" icon={RiMailSendLine} /><span>Email</span>
                </Link>
            </li>
            <li>
                <Link className="contact-link" href="https://github.com/codercarl1243" showExternalIcon={false}>
                    <Icon className="contact-link__icon" icon={RiGithubFill} /><span>Github</span>
                </Link>
            </li>
            <li>
                <Link className="contact-link" href="https://www.linkedin.com/in/carl-davidson/" showExternalIcon={false}>
                    <Icon className="contact-link__icon" icon={RiLinkedinLine} /><span>LinkedIn</span>
                </Link>
            </li>
            <li>
                <button
                    type="button"
                    className="contact-link"
                    onClick={copyToClipboard}
                    aria-label="Copy Discord username"
                >
                    <Icon className="contact-link__icon" icon={RiDiscordLine} />
                    <span>coder_carl</span>
                    <span 
                    className="contact-link__state-message" 
                    aria-live="polite"
                    data-display={copied}
                    >{copied ? "Copied!" : ""}</span>
                </button>
            </li>
        </Block>
    )
}