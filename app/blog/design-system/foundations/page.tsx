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
import Section1 from './(blog_sections)/2_stylingIsNot';
import Section2 from './(blog_sections)/3_theme';
import Section3 from './(blog_sections)/4_variants';
import Section4 from './(blog_sections)/5_appearances';
import Section5 from './(blog_sections)/6_paint';
import Section6 from './(blog_sections)/7_appearance_and_paint';
import Section7 from './(blog_sections)/8_The_Payoff';
import WhatsNext from "./(blog_sections)/whatsNext";
import Resources from "./(blog_sections)/resources"

const TABLE_OF_CONTENTS = [
    { id: 'introduction', href: '#introduction', label: "Introduction" },
    { id: 'styling-is-not-a-single-concern', href: '#styling-is-not-a-single-concern', label: 'Styling Is Not One Thing' },
    { id: 'theme', href: '#theme', label: 'Theme (Environment)' },
    { id: 'variants', href: '#variants', label: 'Variants (Meaning)' },
    { id: 'appearances', href: '#appearances', label: 'Appearances (Treatment)' },
    { id: 'paint', href: '#paint', label: 'Paint (Application)' },
    { id: 'appearance-and-paint', href: '#appearance-and-paint', label: 'Pairing Appearance and Paint' },
    { id: 'the-payoff', href: '#the-payoff', label: 'The Payoff' },
    { id: 'whats-next', href: '#whats-next', label: "What's Next" },
    { id: 'resources', href: '#resources', label: "Code & Resources" }
] as const;

const postId = asPostId('design__foundations_01');
export const metadata: Metadata = generateMetadataForPost(postId);

export default function FoundationsPage() {
    const { post, relatedPosts, author } = getBlogPostPageData(postId);
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