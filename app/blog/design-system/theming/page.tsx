import Post from "@/components/post";
import Introduction from "./(blog_sections_new)/1_introduction"
import WhatWeAreBuilding from "./(blog_sections_new)/2_whatWeAreBuilding"
import Why from './(blog_sections_new)/3_why'
import Tokens from './(blog_sections_new)/4_tokens'
import Structure from './(blog_sections_new)/5_structure'
import Variants from './(blog_sections_new)/6_variants'
import Appearance from './(blog_sections_new)/7_appearance'
import Paint from './(blog_sections_new)/8_paint'

// import {
//     Introduction,
//     Why,
//     Components,
//     Concepts,
//     DarkMode,
//     DataAttributesAndVariants,
//     Resources,
//     Sidebar,
//     Summary,
//     Testing,
//     TokensGlobal,
//     TokensComponent
// } from "./(blog_sections)";
import PostBanner from "@/components/post/post.banner";


export default function ThemingPage() {

    return (
        <>
            <Post>
                <PostBanner
                    title="Building a Theming System for Your React Design System"
                    subtitle="How to expose flexible, accessible styling through CSS variables, data-attributes, and React hooks. The foundation you'll use for buttons, navigation, cards, and every other component in your system."
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
                {/* <Why />
                <Concepts />
                <TokensGlobal />
                <TokensComponent />
                <DataAttributesAndVariants /> */}
                {/* <DarkMode />
                <Components />
                <Testing /> */}
                {/* <Resources />
                <Summary /> */}
            </Post>
            {/* <Sidebar /> */}
        </>
    )
}