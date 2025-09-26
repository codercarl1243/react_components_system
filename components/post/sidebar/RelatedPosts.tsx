import Heading from "@/components/heading";
import List from "@/components/list";
import NavigationCard from "@/components/post/navigation/navigation.card";
import { type RelatedPosts as RelatedPostsType } from "@/components/post/sidebar/sidebar.type";

/**
 * Render a list of related posts with links.
 * 
 * @param posts - Array of related post entries with `{ href, title }`.
 * @returns The related posts section or `null` when there are no posts.
 */

type RelatedPostsProps = {posts: RelatedPostsType}

export default function RelatedPosts({posts}: RelatedPostsProps) {

    if (!posts?.length) return null;

    return (
        <section
            className="post-sidebar__related"
            aria-labelledby="related-posts-heading"
        >
            <Heading headingLevel={2} id="related-posts-heading">Related Posts</Heading>
            <List role="list" className="post-sidebar__related__list">
                {posts.map((post, idx) => (
                    <li key={post.href + idx}>
                        <NavigationCard href={post.href} heading={post.title} />
                    </li>
                ))}
            </List>
        </section>
    )
}