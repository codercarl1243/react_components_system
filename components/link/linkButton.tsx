import Link from "@/components/link";
import { CTALinkProps } from "./link.type";
import clsx from "clsx";
import { Block } from "../primitives";


export default function ButtonLink({ className, ...props }: CTALinkProps) {

    return <Block
        as={Link}
        paint="all"
        variant="primary"
        variantAppearance="filled"
        className={
            clsx("link link__button block px-md py-sm surface-frame",
                className)}
        {...props} />
}