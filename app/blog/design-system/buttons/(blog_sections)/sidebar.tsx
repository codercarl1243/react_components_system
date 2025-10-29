import PostSideBar from "@/components/post/sidebar";
import { type RelatedPost } from "@/lib/blogPosts";

type TSideBarProps = { relatedPosts: RelatedPost[] }
export default function ButtonsSideBar({ relatedPosts }: TSideBarProps) {

    return (
        <PostSideBar
            contents={[
                { id: 'introduction', href: '#introduction', label: "Introduction" },
                { id: 'project-setup', href: '#project-setup', label: 'Project Setup' },
                { id: 'component-and-types', href: '#component-and-types', label: 'Component & Types' },
                { id: 'interaction-logic', href: '#interaction-logic', label: 'Interaction Logic' },
                { id: 'loading-and-states', href: '#loading-and-states', label: 'Loading & States' },
                { id: 'accessibility', href: '#accessibility', label: 'Accessibility (WCAG)' },
                { id: 'css-and-theming', href: '#css-and-theming', label: 'CSS & Theming' },
                { id: 'testing', href: '#testing', label: 'Testing' },
                { id: 'summary', href: '#summary', label: 'Summary' },
                { id: 'whats-next', href: '#whats-next', label: "What's Next" },
                { id: 'resources', href: '#resources', label: "Code & Resources" }
            ]}
            // Fillers
            relatedPosts={relatedPosts}
            author={{ avatarUrl: '/window.svg', name: "carl davidson" }}
        />
    )
}