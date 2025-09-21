import Heading from "@/components/heading";
import Link from "@/components/link";
import { type RelatedPosts } from "@/components/post/sidebar/sidebar.type";

/**
 * Render a list of related posts with links.
 * 
 * @param posts - Array of related post entries with `{ href, title }`.
 * @returns The related posts section or `null` when there are no posts.
 */

type RelatedPostsProps = {posts: RelatedPosts}

export default function RelatedPosts({posts}: RelatedPostsProps) {

    if (!posts?.length) return null;

    return (
        <section
            className="post-sidebar__related"
            aria-labelledby="related-posts-heading"
        >
            <Heading headingLevel={2} id="related-posts-heading">Related Posts</Heading>
            <ul>
                {posts.map((post) => (
                    <li key={post.href}>
                        <Link href={post.href}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}