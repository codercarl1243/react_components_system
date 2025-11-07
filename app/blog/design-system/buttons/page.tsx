
import Post from "@/components/post";
import { type Metadata } from "next";
import { getRelatedPosts } from "@/lib/blogPosts";
import {
    Foundation,
    Setup,
    BuildingTheButton,
    InteractionLogic,
    EssentialFeatures,
    Accessibility,
    Css,
    Testing,
    Outro,
    WhatsNext,
    NavigationFooter,
    Resources,
    Sidebar,
} from './(blog_sections)';
import { asPostId } from "@/components/post/post.type";
import { generateMetadataForPost } from "@/lib/utils/generateMeta/post";

const postId = asPostId('design__button__01');

export const metadata: Metadata = generateMetadataForPost(postId);

export default function Page() {
    const relatedPosts = getRelatedPosts(postId);

    return (
        <>
            <Post>
                <Foundation />
                <Setup />
                <BuildingTheButton />
                <InteractionLogic />
                <EssentialFeatures />
                <Accessibility />
                <Css />
                <Testing />
                <Outro />
                <WhatsNext />
                <Resources />
                <NavigationFooter />
            </Post >
            <Sidebar relatedPosts={relatedPosts} />
        </>
    )
}