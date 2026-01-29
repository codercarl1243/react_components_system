/** Data */
import getBlogPostPageData from "@/lib/blog/blog.page-data";
import { generateMetadataForPost } from "@/lib/utils/generateMeta";
import { asPostId } from "@/lib/blog/blog.utils";
import { type Metadata } from "next";

/** Layout */
import Post from "@/components/post";
import PostBanner from "@/components/post/post.banner";
import PostSideBar from "@/components/post/sidebar";

/** Sections */
import {
    Introduction,
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


// TODO: complete this
const TABLE_OF_CONTENTS = [
    // { id: 'introduction', href: '#introduction', label: "Introduction" },
    // { id: 'what-we-are-building', href: '#what-we-are-building', label: "What we're building" },
    // { id: 'why', href: '#why', label: 'Why this approach' },
    // { id: 'global-tokens', href: '#global-tokens', label: 'Global Tokens' },
    // { id: 'structural-boundaries', href: '#structural-boundaries', label: 'Structural boundaries' },
    // { id: 'variants', href: '#variants', label: 'Variants' },
    // { id: 'appearance', href: '#appearance', label: 'Appearance mapping' },
    // { id: 'paint', href: '#paint', label: 'Paint — explicit styling' },
    // { id: 'putting-it-all-together', href: '#putting-it-all-together', label: 'Putting it all together' },
    // { id: 'summary', href: '#summary', label: "Summary" },
    // { id: 'resources', href: '#resources', label: "Code & Resources" }
] as const;

const postId = asPostId('design__button__01');

export const metadata: Metadata = generateMetadataForPost(postId);

export default function Page() {
    const { post, relatedPosts, author } = getBlogPostPageData(postId);
    <PostBanner
        post={post}
    />
    return (
        <>
            <Post>

                <Introduction />
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
            <PostSideBar
                contents={TABLE_OF_CONTENTS}
                relatedPosts={relatedPosts}
                author={author}
            />
        </>
    )
}