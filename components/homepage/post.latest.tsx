import Heading from "@/components/heading";
import { getMostRecentPosts } from "@/lib/blog/blog.data";
import { Stack } from "@/components/primitives";
import List from "@/components/list";
import PostCard from "../post/post.card";

export default function LatestPosts() {
  const posts = getMostRecentPosts(3);
  console.log("Posts", posts)

  const PostCards = posts.map((post) => (
    <li
      key={post.id + "homepageCard"}>
      <PostCard post={post} />
    </li>
  ))

  return (
    <Stack
      className="surface-frame frame-inset-2 p-2 px-4 homepage--latest-posts"
    >
      <Heading as="h2" className="center" headingSize={5}>Latest posts</Heading>
      <List
        as="ul"
        marker="none"
        className='latest-posts__list p-0'
      >
        {PostCards}
      </List>

    </Stack>
  )
}

