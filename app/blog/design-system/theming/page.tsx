import Post from "@/components/post";
import {
    Components,
    Concepts,
    DarkMode,
    Introduction,
    DataAttributesAndVariants,
    Resources,
    Sidebar,
    Summary,
    Testing,
    Theme_hook,
    TokensGlobal,
    TokensComponent
} from "./(blog_sections)";
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
                <Concepts />
                <TokensGlobal />
                <TokensComponent />
                <DataAttributesAndVariants />
                <Theme_hook />
                <DarkMode />
                <Components />
                <Testing />
                <Resources />
                <Summary />
            </Post>
            <Sidebar />
        </>
    )
}