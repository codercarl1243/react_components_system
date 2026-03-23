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
import Introduction from "./(blog_sections)/1_introduction";
import Spacing from "./(blog_sections)/2_spacing";
import Typography from "./(blog_sections)/3_typography";
import Breakpoints from "./(blog_sections)/4_breakpoints";
import Summary from "./(blog_sections)/5_summary";
import Resources from "./(blog_sections)/resources";

const TABLE_OF_CONTENTS = [
    { id: 'introduction', href: '#introduction', label: "Introduction" },
    { id: 'spacing', href: '#spacing', label: "Spacing" },
    { id: 'typography', href: '#typography', label: "Typography Scale" },
    { id: 'breakpoints', href: '#breakpoints', label: "Breakpoints" },
    { id: 'summary', href: '#summary', label: "Summary" },
    { id: 'resources', href: '#resources', label: "Code & Resources" },
] as const;

const postId = asPostId('design__utility_tokens_01');
export const metadata: Metadata = generateMetadataForPost(postId);

export default function UtilityTokensPage() {
    const { post, relatedPosts, author } = getBlogPostPageData(postId);

    return (
        <>
            <Post>
                <PostBanner post={post} />
                <Introduction />
                <Spacing />
                <Typography />
                <Breakpoints />
                <Summary />
                <Resources />
            </Post>
            <PostSideBar
                contents={TABLE_OF_CONTENTS}
                // relatedPosts={relatedPosts}
                author={author}
            />
        </>
    );
}
