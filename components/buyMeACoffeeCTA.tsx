import { RiHandHeartLine, RiJavaFill } from "@remixicon/react";
import Link from "@/components/link";
import type { LinkProps } from "@/components/link/link.type";
import Icon from "@/components/icon";
import clsx from "clsx";

export default function BuyMeACoffeeCTA({ className, ...props }: LinkProps ) {

    return (
        <Link
            className={clsx("buyMeACoffee__Link contact-link--external contact-link", className)}
            href="https://buymeacoffee.com/codercarl"
            rel="noopener noreferrer"
            {...props}
        >
            <Icon className="contact-link__icon" icon={RiHandHeartLine} />
            <span>Buy me a coffee</span>
        </Link>
    )
}