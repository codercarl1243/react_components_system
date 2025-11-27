import { Inline } from "@/components/primitives";
import type { RowProps } from "../primitives/types";
import clsx from "clsx";
import { wrapTextChildren } from "@/lib/utils/react/wrapTextChildren";


export default function PostInfo({ children, className, ...props }: RowProps) {

    return (
        <p className={clsx("postinfo text-sm", className)} {...props}>
            {wrapTextChildren(children)}
        </p>
    )
}