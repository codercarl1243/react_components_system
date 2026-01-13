import PostSideBar from "@/components/post/sidebar";
import { PostSideBarProps } from "@/components/post/sidebar/sidebar.type";
import { CODER_CARL } from "@/lib/blog/authors/authors";

export default function ThemingSideBar({ relatedPosts }: PostSideBarProps) {

    return (
        <PostSideBar
            contents={[
                { id: 'introduction', href: '#introduction', label: "Introduction" },
                { id: 'what-we-are-building', href: '#what-we-are-building', label: "What we're building" },
                { id: 'why', href: '#why', label: 'Why this approach' },
                { id: 'global-tokens', href: '#global-tokens', label: 'Global Tokens' },
                { id: 'structural-boundaries', href: '#structural-boundaries', label: 'Structural boundaries' },
                { id: 'variants', href: '#variants', label: 'Variants' },
                { id: 'appearance', href: '#appearance', label: 'Appearance mapping' },
                { id: 'paint', href: '#paint', label: 'Paint — explicit styling' },
                { id: 'putting-it-all-together', href: '#putting-it-all-together', label: 'Putting it all together' },
                { id: 'summary', href: '#summary', label: "Summary" },
                { id: 'resources', href: '#resources', label: "Code & Resources" }
            ]}
            // Fillers
            relatedPosts={relatedPosts}
            author={CODER_CARL}
        />
    )
}