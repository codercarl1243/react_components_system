import Heading from "@/components/heading";
import Image from '@/components/image'
import Link from "@/components/link";
import { SidebarAuthorProps } from "@/components/post/sidebar/sidebar.type";

export default function SidebarAuthor({ author }: SidebarAuthorProps) {

    return (
 <section className="post-sidebar__author" aria-labelledby="post-sidebar-author-heading">
            <Heading as={"h2"} id="post-sidebar-author-heading" className="sr-only">
                About the Author
            </Heading>
            <Link className="author" href="/about">
                {author.avatarUrl && (
                    <Image
                        src={author.avatarUrl}
                        alt={`avatar of ${author.name}`}
                        className="author__avatar"
                        variant="logo"
                    />
                )}
                <p className="author__name">{author.name}</p>
            </Link>
        </section>
    )
}