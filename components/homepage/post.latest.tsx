import Heading from "@/components/heading";
import { getMostRecentPosts } from "@/lib/blog/blog.data";
import { Block } from "@/components/primitives";
import List from "@/components/list";
import PostCard from "@/components/post/post.card";

export default function LatestPosts() {
  const { posts, featuredPost } = getMostRecentPosts(3);

  return (
    <Block
      as="section"
      className="homepage__latest-posts homepage__section width-full"
    >
      <Heading as="h2" className="homepage__latest-posts__heading center mb-16" headingSize={2}>Latest posts</Heading>
      <div className="homepage__latest-posts__posts post-card__grid-container">
        <List as="ul" marker="none" className="post-card__grid p-0 flow-6">
          {featuredPost && <li key={featuredPost.id} className="latest-post latest-posts__featured" data-layout="large">
            <PostCard post={featuredPost} layout="large" />
          </li>}

          {posts.map(post => (
            <li key={post.id} className="latest-post latest-posts__item">
              <PostCard post={post} layout="default" />
            </li>
          ))}
        </List>
      </div>
    </Block>
  )
}

