// import PostCard from "@/components/post/post.card";
import TabList from '@/components/tablist'
import Link from '@/components/link'
import Heading from '@/components/heading'

export default function BlogPage () {
  return (
        <>
            <Heading headingLevel={1}>Blogs</Heading>
            <div className="blog--page__banner">
                {/* TODO: Populate with recent posts (cards) **/}
                <ul>
                    <li>
                      <Link href="/blog/design-system/buttons">
                    Buttons - the base of every button
                    </Link>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            {/* <p>Welcome to my blog page</p>
        */}
        </>
  )
}
