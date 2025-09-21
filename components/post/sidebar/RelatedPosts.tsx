import Heading from "@/components/heading";
import Link from "@/components/link";

type RelatedPostsProps = {
    posts: { title: string; href: string }[]
}

/**
 * Render a list of related posts with links.
 * 
 * @param posts - Array of related post entries with `{ href, title }`.
 * @returns The related posts section or `null` when there are no posts.
 */

export default function RelatedPosts({posts}: RelatedPostsProps) {

    if (posts.length === 0) return null;

    return (
        <section
            className="post-sidebar__related"
        >
            <Heading headingLevel={2} >Related Posts</Heading>
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