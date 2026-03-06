import { RiJavaFill } from "@remixicon/react";
import Link from "@/components/link";
import Icon from "@/components/icon";
import clsx from "clsx";

export default function BuyMeACoffeeCTA({ className }: { className?: string }) {

    return (
        <Link
            className={clsx("buyMeACoffee__Link w-fit px-8 py-2", className)}
            href="https://buymeacoffee.com/codercarl"
            rel="noopener noreferrer"
        >
            <Icon icon={RiJavaFill} />
            <span>Buy me a coffee</span>
        </Link>
    )
}