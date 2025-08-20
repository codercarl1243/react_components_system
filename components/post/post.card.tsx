import Image from "next/image";
import { PostCardPropsType } from "./post.type";


export default function PostCard({variant = "default", post}: PostCardPropsType){
    
    const {image, title} = post;

    return (
        <div data-variant={variant}>
              <Image src={image.src} alt={image.alt ?? ""} height={300} width={400} />
                <h1>{title}</h1>
                <a href=""></a>
        </div>
    )
}