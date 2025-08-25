import NextLink from "next/link";
import React from "react";
import Icon from "../icon";
import { RiExternalLinkLine } from "@remixicon/react";


export default function Link({ children, href, ...props }: React.ComponentProps<"a">) {
    if (!href) return <>{children}</>;
    const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//");

    if (isExternal) {
        return (
            <a href={href} rel="noopener noreferrer" {...props}>{children}<Icon color={'currentColor'} icon={RiExternalLinkLine} size={"sm"} /></a>
        )
    }
    return (
        <NextLink href={href} {...props}>{children}</NextLink>
    )
}