
import PostCard from "@/components/post/post.card";
import TabList from "@/components/tablist";
import Link from "next/link";

export default function BlogPage() {

    return (
        <>
            <div className="blog--page__banner">
                <PostCard data-variant={"hero"} post={undefined} />
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
            <TabList defaultActiveTabId="panel1" orientation="horizontal">
                <TabList.Panel label={"coding"} id={"panel1"}>

                <Link href="/categories/coding">show all of the posts to do with coding</Link>
                </TabList.Panel>
                <TabList.Panel label={"accessibility"} id={"panel1"}>
                <Link href="/categories/coding">show all of the posts to do with accessibility</Link>

                </TabList.Panel>
                <TabList.Panel label={"design-system"} id={"panel1"}>
                <Link href="/categories/coding">show all of the posts to do with design systems</Link>

                </TabList.Panel>
            </TabList>
        </>
    )
}
