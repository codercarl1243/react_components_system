
import Post from "@/components/post";
import { type Metadata } from "next";
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
import { generateMetadataForPost } from "@/lib/utils/generateMeta/post";
import { getRelatedPosts } from "@/lib/blog/blog.data";
import { asPostId } from "@/lib/blog/blog.utils";
import Buttons from './examples/buttons'
const postId = asPostId('design__button__01');

export const metadata: Metadata = generateMetadataForPost(postId);

export default function Page() {
    const relatedPosts = getRelatedPosts(postId);

    return (
        <>
            <Post>
                <Buttons />
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