import type { RowProps } from "../primitives/types";
import clsx from "clsx";
import { wrapChildrenTextWithSiblings } from "@/lib/utils/react/wrapChildrenTextWithSiblings";


export default function PostInfo({ children, className, ...props }: RowProps) {

    return (
        <p className={clsx("postinfo text-sm", className)} {...props}>
            {wrapChildrenTextWithSiblings(children)}
        </p>
    )
}