import Post from "@/components/post";
import { Components, Concepts, DarkMode, Introduction, Provider, Resources, Sidebar, Summary, Testing, Theme_hook, Tokens, Variants } from "./(blog_sections)";


export default function ThemingPage() {

    return (
        <>
            <Post>
                <Introduction />
                <Concepts />
                <Tokens />
                <Variants />
                <Provider />
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