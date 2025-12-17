import PostSideBar from "@/components/post/sidebar";
import { PostSideBarProps } from "@/components/post/sidebar/sidebar.type";
import { CODER_CARL } from "@/lib/blog/authors/authors";

export default function ButtonsSideBar({ relatedPosts }: PostSideBarProps) {

    return (
        <PostSideBar
            contents={[
                { id: 'introduction-theming', href: '#introduction-theming', label: "Introduction" },
                { id: 'why-theming', href: '#why-theming', label: 'Why' },
                { id: 'core-concepts-theming', href: '#core-concepts-theming', label: 'Core Concepts' },
                { id: 'global-tokens-theming', href: '#global-tokens-theming', label: 'Global Tokens' },
                { id: 'variant-tokens-theming', href: '#variant-tokens-theming', label: 'Variant Tokens' },
                { id: 'component-tokens-theming', href: '#component-tokens-theming', label: 'Component Tokens' },
                { id: 'appearance-tokens-theming', href: '#appearance-tokens-theming', label: 'Appearance Tokens' },
                { id: 'bringing-it-all-together-theming', href: '#bringing-it-all-together-theming', label: 'Bringing it all together' },
                { id: 'advanced-topics-theming', href: '#advanced-topics-theming', label: 'Advanced Topics' },
                { id: 'whats-next', href: '#whats-next', label: "What's Next" },
                { id: 'resources', href: '#resources', label: "Code & Resources" }
            ]}
            // Fillers
            relatedPosts={relatedPosts}
            author={CODER_CARL}
        />
    )
}