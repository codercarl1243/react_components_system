import Heading from '@/components/heading'
import List from '@/components/list';
import PostCard from '@/components/post/post.card'
import { getBlogPostsSummaries } from '@/lib/blog/blog.data'

export default function BlogPage() {
  const blogPosts = getBlogPostsSummaries();

  return (
    <>
      <Heading as={"h1"}>Blogs</Heading>
        <List marker='none' className='post-card__list'>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <PostCard
              as={"h2"}
              variant="card"
              post={post}
            />
          </li>
        ))} 
      </List>
    </>
  )
}
