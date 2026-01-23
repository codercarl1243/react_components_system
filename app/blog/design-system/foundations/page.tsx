/** Data */
import getBlogPostPageData from "@/lib/blog/blog.page-data";

/** Layout */
import Post from "@/components/post";
import PostBanner from "@/components/post/post.banner";
import PostSideBar from "@/components/post/sidebar";

/** Sections */
import Introduction from "./(blog_sections)/introduction";
import Section1 from './(blog_sections)/section1';
import Section2 from './(blog_sections)/section2';
import Section3 from './(blog_sections)/section3';
import Section4 from './(blog_sections)/section4';
import Section5 from './(blog_sections)/section5';
import Section6 from './(blog_sections)/section6';
import Section7 from './(blog_sections)/section7';
import WhatsNext from "./(blog_sections)/whatsNext";
import Resources from "./(blog_sections)/resources"

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

export default function FoundationsPage() {
    const { post, relatedPosts, author } = getBlogPostPageData("design__foundations_01");
    return (
        <>
            <Post>
                <PostBanner
                    post={post}
                />
                <Introduction />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
                <WhatsNext />
                <Resources />
            </Post>
            <PostSideBar
                contents={TABLE_OF_CONTENTS}
                relatedPosts={relatedPosts}
                author={author}
            />
        </>
    )
}