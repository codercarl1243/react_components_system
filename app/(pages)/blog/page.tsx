import FunHighlight from '@/components/decorations/FunHighlight';
import Heading from '@/components/heading'
import List from '@/components/list';
import PostCard from '@/components/post/post.card'
import { getBlogPostsSummaries } from '@/lib/blog/blog.data'
import BlogLink from '@/components/post/post.blogLink';
import Post from '@/components/post';
import PostSection from '@/components/post/post.section';
import Image from '@/components/image';

// function chunk<T>(arr: T[], size: number) {
//   const result: T[][] = [];
//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }
//   return result;
// }


export default function BlogPage() {
  const blogPosts = getBlogPostsSummaries();
  const formattedPosts = blogPosts.map(
    (post, index) => {
      const layout = index % 4 === 0 ? "large" : "default";

      return (
        <li key={post.id + index} data-layout={layout} className='content-grid__item'>
          <PostCard
            post={post}
            layout={layout}
          />
        </li>
      )
    }
  );

  // const groups = chunk(formattedPosts, 4);

  return (
    <Post>
      <PostSection>
        <Image className="width-full" alt={'A yellow brick road leads from a ruined foreground — collapsed stone blocks, a skull, and broken UI components, toward a thriving city on a hill in the distance. A metaphor for building a design system from the ground up.'} src={'/images/blogs/main-image.webp'} variant='hero' height={400} width={1200}/>
        <Heading as={"h1"}>Blogs</Heading>
        <p>Design systems don't usually break all at once. They decay.</p>
        <p>Over time, styling stops feeling intentional and starts feeling fragile.</p>
        <p>If this sounds familiar, the problem is rarely tooling. It's architecture.</p>
        <p>On this site, I explore how <FunHighlight>design tokens</FunHighlight>, <FunHighlight>primitives</FunHighlight> and a small set of definitive <span className="fun-underline">boundaries</span> come together to form a composable styling system.</p>
      </PostSection>

      <PostSection>
        <Heading as="h2">Choose your adventure</Heading>
        <List as="ul" marker='none' spacing='loose'>
          <li><BlogLink postId="design__theming_01">Theming & Extensible Design Systems</BlogLink></li>
          <li><BlogLink postId="design__primitives_01">Primitives & Styling Boundaries</BlogLink></li>
          <li>Essential Components for everyday sites:
            <List as="ul" marker='circle' spacing='loose' className='mt-8'>
              <li>Button <span className="italic text-sm">(coming soon)</span></li>
              <li>Link <span className="italic text-sm">(coming soon)</span></li>
              <li>Image <span className="italic text-sm">(coming soon)</span></li>

            </List>
          </li>
        </List>
      </PostSection>
      <PostSection>

        <Heading as="h2">All Posts</Heading>
        {/* <p>Below you'll find all posts in this series.
        Filter or sort them by topic depending on what you're looking for:</p> */}
        <div className='content-grid__container'>

        <List as="ul" marker="none" className='content-grid'>
          {formattedPosts}
        </List>
        </div>
      </PostSection>
    </Post>
  )
}
