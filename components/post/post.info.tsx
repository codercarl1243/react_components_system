import type { RowProps } from "@/components/primitives/types";
import clsx from "clsx";
import { Block } from "@/components/primitives";


export default function PostInfo({ className, ...props }: RowProps) {

    return <Block as="p" className={clsx("postinfo text-sm", className)} {...props} />
}