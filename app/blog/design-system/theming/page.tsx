import Post from "@/components/post";
import { Components, Concepts, DarkMode, Introduction, DataAttributesAndVariants, Resources, Sidebar, Summary, Testing, Theme_hook, TokensGlobal, TokensComponent } from "./(blog_sections)";


export default function ThemingPage() {

    return (
        <>
            <Post>
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