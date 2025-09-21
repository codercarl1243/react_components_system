import Heading from "@/components/heading";
import Image from 'next/image'
import type { Author } from '@/components/post/sidebar/sidebar.type';

type SidebarAuthorProps = {
    author: Author
}

export default function SidebarAuthor({ author }: SidebarAuthorProps) {

    return (
        <section className="post-sidebar__author" aria-labelledby="post-sidebar-author-heading">
            <Heading headingLevel={2} id="post-sidebar-author-heading">About the Author</Heading>
            <div className="author">
                {author.avatarUrl && (
                    <Image
                        src={author.avatarUrl}
                        alt=""
                        className="author__avatar"
                        loading="lazy"
                        width={100}
                        height={100}
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
    )
}