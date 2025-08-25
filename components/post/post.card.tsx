import Image from "next/image";
import { PostCardPropsType } from "./post.type";
import { JSX, useId } from "react";
import Link from "@/components/link";
import Heading from "@/components/heading";


export default function PostCard({ variant = "default", post, headingLevel = 3 }: PostCardPropsType) {

    const { image, title } = post;
    const id = useId();

    return (
        <div data-variant={variant}>
            <Image src={image.src} alt={image.alt ?? ""} height={300} width={400} />
            <Heading className="post-card__title" headingLevel={headingLevel} >
                {/* placeholder - change this when able. */}
                <Link href="#" aria-describedby={id}>{title}</Link>
            </Heading>
            <span aria-hidden="true" id={id}>read more</span>
        </div>
    )
}