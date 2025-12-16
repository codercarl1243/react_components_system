import Heading from "@/components/heading";
import { getMostRecentPosts } from "@/lib/blog/blog.data";
import { Stack } from "../primitives";
import List from "../list";


export default function LatestPosts(){
    const posts = getMostRecentPosts();

    return (
       <Stack className="homepage--latest-posts">
         <Heading as="h2">Latest posts</Heading>
        <List as="ul" marker="none" className='latest-posts__list'>
                {posts.map((post) => (
                  <Stack as="li" key={post.id} variant="accent" variantAppearance="outlined">
                    {post.title}
                  </Stack>
                ))} 
              </List>
       </Stack>
    )
}

