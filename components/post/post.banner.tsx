import Image from "next/image";
import { PostBannerPropsType } from "./post.type";
import Heading from "@/components/heading";


export default function PostBanner({ title, image }: PostBannerPropsType) {

    return (
        <div className="post__banner">

            {image?.src ? (
                <Image src={image.src} alt={image.alt ?? ""} height={400} width={1200} />
            )
                : null}
            <Heading headingLevel={1}>{title}</Heading>
        </div>
    )
}