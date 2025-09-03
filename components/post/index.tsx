"use client";
import clsx from "clsx";
import type { PostPropsType } from "./post.type";
import { CodeHighlighterProvider } from "@/components/code/context";

export default function Post({ children, className, ...props }: PostPropsType) {

    return (
        <CodeHighlighterProvider>
            <article className={clsx("post", className)} {...props}>
                {children}
            </article>
        </CodeHighlighterProvider>
    )
}