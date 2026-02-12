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
// import Introduction from "./(blog_sections)/1_introduction";
// import WhatWeAreBuilding from "./(blog_sections)/2_whatWeAreBuilding";
// import Why from './(blog_sections)/3_why';
// import Tokens from './(blog_sections)/4_tokens';
// import Structure from './(blog_sections)/5_structure';
// import Variants from './(blog_sections)/6_variants';
// import Appearance from './(blog_sections)/7_appearance';
// import Paint from './(blog_sections)/8_paint';
// import PuttingItAllTogether from './(blog_sections)/9_puttingItAllTogether';
// import Summary from './(blog_sections)/10_summary';
// import Resources from './(blog_sections)/resources';


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

const postId = asPostId('design__primitives_01');
export const metadata: Metadata = generateMetadataForPost(postId);

export default function ThemingPage() {

    const { post, relatedPosts, author } = getBlogPostPageData(postId);

    return (
        <>
            <Post>
                <PostBanner
                    post={post}
                />
                {/* <Introduction />
                <WhatWeAreBuilding />
                <Why />
                <Tokens />
                <Structure />
                <Variants />
                <Appearance />
                <Paint />
                <PuttingItAllTogether />
                <Summary />
                <Resources /> */}
            </Post>
            <PostSideBar
                contents={TABLE_OF_CONTENTS}
           // relatedPosts={relatedPosts}
                author={author}
            />
        </>
    )
}