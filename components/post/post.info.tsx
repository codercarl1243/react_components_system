import type { BlockProps } from "@/components/primitives/types";
import clsx from "clsx";
import { Block } from "@/components/primitives";


export default function PostInfo({ className, paint, variant, variantAppearance, ...props }: BlockProps) {

    return <Block as="p"
        paint={paint ?? "all"}
        variant={variant ?? "neutral"}
        variantAppearance={variantAppearance ?? "tonal"}
        className={clsx("postinfo text-sm surface-frame p-4", className)} {...props} />
}