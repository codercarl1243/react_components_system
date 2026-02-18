import Link from "@/components/link";
import { LinkProps } from "@/components/link/link.type";
import { getBlogPostById } from "@/lib/blog/blog.data";
import type { PostId } from "@/lib/blog/blog.types";
import { logWarning } from "@/lib/logging/log";

type BlogLinkProps = {
    postId: PostId | string;
} & LinkProps;

export default function BlogLink({ postId, children, ...props }: BlogLinkProps) {

    if (!postId) {
        logWarning(`no post id given to blogLink: ${children}`)
        return <>{children}</>
    }
    const post = getBlogPostById(postId);

    if (!post) {
        logWarning(`post id is not correct: ${postId}`)
        if (children) {
            return <>{children}</>
        }
        return null;
    }
    return <Link href={post.href} {...props}>{children ?? post.title}</Link>
}