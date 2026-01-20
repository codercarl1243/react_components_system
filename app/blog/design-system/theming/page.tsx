import Post from "@/components/post";
import Introduction from "./(blog_sections)/1_introduction";
import WhatWeAreBuilding from "./(blog_sections)/2_whatWeAreBuilding";
import Why from './(blog_sections)/3_why';
import Tokens from './(blog_sections)/4_tokens';
import Structure from './(blog_sections)/5_structure';
import Variants from './(blog_sections)/6_variants';
import Appearance from './(blog_sections)/7_appearance';
import Paint from './(blog_sections)/8_paint';
import PuttingItAllTogether from './(blog_sections)/9_puttingItAllTogether';
import Summary from './(blog_sections)/10_summary';
import Resources from './(blog_sections)/resources';
import PostBanner from "@/components/post/post.banner";
import Sidebar from "./(blog_sections)/sidebar";

export default function ThemingPage() {

    return (
        <>
            <Post>
                <PostBanner
                    title="Building a Theming System"
                    subtitle="A Practical Implementation Guide"
                    headingId="theming-heading"
                    image={{
                        src: '/images/blogs/design-system/theming/main-image.webp',
                        alt: ""
                    }}
                />
                <Introduction />
                <WhatWeAreBuilding />
                <Why />
                <Tokens />
                <Structure />
                <Variants />
                <Appearance />
                <Paint />
                <PuttingItAllTogether />
                <Summary />
                <Resources />
            </Post>
            <Sidebar />
        </>
    )
}