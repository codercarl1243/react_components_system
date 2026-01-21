import Heading from "@/components/heading";
import { getMostRecentPosts } from "@/lib/blog/blog.data";
import { Block, Stack } from "@/components/primitives";
import List from "@/components/list";
import PostCard from "@/components/post/post.card";
import { logInfo } from "@/lib/logging/log";

export default function LatestPosts() {
  const { posts, featuredPost } = getMostRecentPosts(3);
  logInfo("posts", { data: { ...posts } })
  logInfo("featured post", { data: { ...featuredPost } })

  return (
    <Block
      className="homepage--latest-posts width-bleed"
    >
      <Heading as="h2" className="center" headingSize={5}>Latest posts</Heading>
        <List as="ul" marker="none" className="latest-posts__grid">
          <li className="latest-post latest-posts__featured">
            <PostCard post={featuredPost} />
          </li>

          {posts.map(post => (
            <li key={post.id} className="latest-post latest-posts__item">
              <PostCard post={post} />
            </li>
          ))}
        </List>
    </Block>
  )
}

