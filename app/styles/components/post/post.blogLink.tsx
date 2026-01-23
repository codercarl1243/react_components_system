import Link from "@/components/link";
import { getBlogPostById } from "@/lib/blog/blog.data";
import type { PostId } from "@/lib/blog/blog.types";
import { logWarning } from "@/lib/logging/log";

type BlogLinkProps = {
    id: PostId | string;
};

export default function BlogLink({ id }: BlogLinkProps) {
    const post = getBlogPostById(id);

    if (!post) {
        logWarning(`post id is not correct: ${id}`)
        return null;
    }
    return <Link href={post.href}>{post.title}</Link>
}