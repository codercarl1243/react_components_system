import Post from "@/components/post";
import Introduction from "./(blog_sections_new)/1_introduction";
import WhatWeAreBuilding from "./(blog_sections_new)/2_whatWeAreBuilding";
import Why from './(blog_sections_new)/3_why';
import Tokens from './(blog_sections_new)/4_tokens';
import Structure from './(blog_sections_new)/5_structure';
import Variants from './(blog_sections_new)/6_variants';
import Appearance from './(blog_sections_new)/7_appearance';
import Paint from './(blog_sections_new)/8_paint';
import PuttingItAllTogether from './(blog_sections_new)/9_puttingItAllTogether';
import Summary from './(blog_sections_new)/10_summary';
import Resources from './(blog_sections_new)/resources';
import PostBanner from "@/components/post/post.banner";
import Sidebar from "./(blog_sections_new)/sidebar";

export default function ThemingPage() {

    return (
        <>
            <Post>
                <PostBanner
                    title="Building a Theming System"
                    subtitle="A Practical Implementation Guide"
                    headingId="theming-heading"
                    image={{
                        src: '/og-image.png',
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