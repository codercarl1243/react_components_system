import { ComponentProps } from "react";

type TableOfContentsItem = {
    id: string;
    href: string;
    label: string;
};

type PostSideBarProps = {
    contents?: TableOfContentsItem[]
    relatedPosts?: { href: string; title: string }[];
    author?: { name: string; avatarUrl?: string; bio?: string };
} & ComponentProps<'div'>;

export default function PostSideBar({
    contents = [],
    relatedPosts = [],
    author,
    children,
    ...props
}: PostSideBarProps) {
    const hasContents = contents.length > 0;
    const hasRelated = relatedPosts.length > 0;
    const hasExtras = author || children;

    if (!hasContents && !hasRelated && !hasExtras) return null;

    return (
        <aside className="post-sidebar" {...props}>
            {/* Table of contents */}
            {hasContents && (
                <nav className="post-sidebar__contents">
                    <h2>Contents</h2>
                    <ul>
                        {contents.map(item => {
                            return <li key={item.id}><a href={item.href}>{item.label}</a></li>

                        })}
                    </ul>
                </nav>
            )}
            {/* Related posts */}
            {hasRelated && (
                <section
                    className="post-sidebar__related"
                >
                    <h2>Related Posts</h2>
                    <ul>
                        {relatedPosts.map((post) => (
                            <li key={post.href}>
                                <a href={post.href}>{post.title}</a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {/* Author info */}
            {author && (
                <section
                    className="post-sidebar__author"
                >
                    <h2>About the Author</h2>
                    <div className="author">
                        {author.avatarUrl && (
                            <img
                                src={author.avatarUrl}
                                alt={`Avatar of ${author.name}`}
                                className="author__avatar"
                                loading="lazy"
                            />
                        )}

                        <dl className="author__info">
                            <div>
                                <dt className="author__term sr-only">Name</dt>
                                <dd className="author__name">{author.name}</dd>
                            </div>

                            {author.bio && (
                                <div>
                                    <dt className="author__term sr-only">Bio</dt>
                                    <dd className="author__bio">{author.bio}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </section>
            )}
            {children}
        </aside>
    )
}