import PostSideBar from "@/components/post/sidebar";
import { type RelatedPost } from "@/lib/blogPosts";

type TSideBarProps = { relatedPosts: RelatedPost[] }
export default function ButtonsSideBar({ relatedPosts }: TSideBarProps) {

    return (
        <PostSideBar
            contents={[
                { id: 'button-foundations', href: '#button-foundations', label: "Laying the Foundation" },
                { id: 'project-setup', href: '#project-setup', label: 'Project Setup' },
                { id: 'building-button', href: '#building-button', label: 'Building the Button' },
                { id: 'interaction-logic', href: '#interaction-logic', label: 'Interaction Logic' },
                { id: 'essential-features', href: '#essential-features', label: 'Essential Features' },
                { id: 'accessibility', href: '#accessibility', label: 'Accessibility Requirements' },
                { id: 'css-styling', href: '#css-styling', label: 'Styling' },
                { id: 'testing', href: '#testing', label: 'Testing' },
                { id: 'what-we-built', href: '#what-we-built', label: 'What We Built' },
                { id: 'whats-next', href: '#whats-next', label: "What's Next" },
                { id: 'resources', href: '#resources', label: "Resources" }
            ]}
            // Fillers
            relatedPosts={relatedPosts}
            author={{ avatarUrl: '/window.svg', name: "carl davidson" }}
        />
    )
}