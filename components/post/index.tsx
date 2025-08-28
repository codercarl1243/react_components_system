import React from "react"
import PostBanner from "./post.banner";
import { PostPropsType } from "./post.type";


export default function Post({ title, image, children }: PostPropsType) {

    return (
        <article className="post layout-wrapper">
            <PostBanner
                title={title}
                image={image}
            />
                {children}
        </article>
    )
}