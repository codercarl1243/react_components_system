
// import PostCard from "@/components/post/post.card";
import TabList from "@/components/tablist";
import Link from "@/components/link";

export default function BlogPage() {

    return (
        <>
            <div className="blog--page__banner">
                {/* TODO: Populate with recent posts (cards) **/}
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <h1>Blogs</h1>
            <p>Welcome to my blog page</p>
            <TabList
                defaultActiveTabId="panel1"
                orientation="horizontal"
                tabs={[
                    {
                        id: "panel1",
                        tabLabel: "coding",
                        panelContent: (
                            <Link href="/categories/coding">
                                show all of the posts to do with coding
                            </Link>
                        )
                    },
                    {
                        id: "panel2", // Fixed: was "panel1" 
                        tabLabel: "accessibility",
                        panelContent: (
                            <Link href="/categories/accessibility"> {/* Fixed URL */}
                                show all of the posts to do with accessibility
                            </Link>
                        )
                    },
                    {
                        id: "panel3", // Fixed: was "panel1"
                        tabLabel: "design-system",
                        panelContent: (
                            <Link href="/categories/design-systems"> {/* Fixed URL */}
                                show all of the posts to do with design systems
                            </Link>
                        )
                    }
                ]}
            />
        </>
    )
}
