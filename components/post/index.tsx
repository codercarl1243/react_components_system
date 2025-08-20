import React from "react"
import PostBanner from "./post.banner";
import { PostPropsType } from "./post.type";


export default function Post({ title, image, children }: PostPropsType) {

    return (
        <div className="post">
            <PostBanner
                title={title}
                image={image}
            />
            <div>
                {children}
            </div>
        </div>
    )
}