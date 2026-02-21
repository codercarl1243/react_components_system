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
import WhatIsAPrimitive from "./(blog_sections)/2_whatIsAPrimitive";
import WhyNotJustHTML from './(blog_sections)/3_whyNotJustUseHTML';
import MinimizingSurfaceArea from './(blog_sections)/4_MinimizingSurfaceArea';
import DesigningAPrimitive from './(blog_sections)/5_designingAPrimitive';
import Composing from './(blog_sections)/6_composing';
import ProblemsThatPrimtivesSolve from './(blog_sections)/7_problemsThatPrimitivesSolve';
import WhenNotToUseAPrimitive from './(blog_sections)/8_WhenToNotUseAPrimitive';
import Summary from './(blog_sections)/9_summary';
// import Appearance from './(blog_sections)/7_appearance';
// import Paint from './(blog_sections)/8_paint';
// import PuttingItAllTogether from './(blog_sections)/9_puttingItAllTogether';
// import Resources from './(blog_sections)/resources';


const TABLE_OF_CONTENTS = [
    { id: 'introduction', href: '#introduction', label: "Introduction" },
    { id: 'what-is-a-primitive', href: '#what-is-a-primitive', label: "What is a Primitive?" },
    { id: 'why-not-just-use-html', href: '#why-not-just-use-html', label: 'Why not just use HTML?' },
    { id: 'minimizing-surface-area', href: '#minimizing-surface-area', label: 'Minimizing surface area' },
    { id: 'designing-a-primitive', href: '#designing-a-primitive', label: 'Designing a Primitive' },
    { id: 'composing', href: '#composing', label: 'Composing' },
    { id: 'problems-that-primitives-solve', href: '#problems-that-primitives-solve', label: 'Problems that Primitives solve' },
    { id: 'when-not-to-use-a-primitive', href: '#when-not-to-use-a-primitive', label: ' When to not use a Primitive' },
    { id: 'summary', href: '#summary', label: "Summary" },
    // { id: 'appearance', href: '#appearance', label: 'Appearance mapping' },
    // { id: 'paint', href: '#paint', label: 'Paint — explicit styling' },
    // { id: 'putting-it-all-together', href: '#putting-it-all-together', label: 'Putting it all together' },
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
                <Introduction />
                <WhatIsAPrimitive />
                <WhyNotJustHTML />
                <MinimizingSurfaceArea />
                <DesigningAPrimitive />
                <Composing />
                <ProblemsThatPrimtivesSolve />
                <WhenNotToUseAPrimitive />
                <Summary />
                {/* 
                <Tokens />
                <Structure />
                <Variants />
                <Appearance />
                <Paint />
                <PuttingItAllTogether />
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