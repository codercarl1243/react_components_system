import Heading from '@/components/heading'
import PostCard from '@/components/post/post.card'

/**
 * Renders the blog listing page.
 *
 * Displays a level-1 page heading and a banner section containing a list of hero PostCard components.
 * The banner currently contains static placeholder PostCard entries and includes a TODO to populate it
 * with recent posts (cards) dynamically.
 *
 * @returns The blog page JSX fragment.
 */
export default function BlogPage () {
  return (
        <>
            <Heading headingLevel={1}>Blogs</Heading>
            <div className="blog--page__banner">
                {/* TODO: Populate with recent posts (cards) **/}
                <ul className='post-card__list'>
                    <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                                            <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                                            <li>
                      <PostCard 
                      headingLevel={2}
                      variant="hero" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: '/images/blog/button-base.png', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                    
                </ul>
            </div>
            {/* <p>Welcome to my blog page</p>
        */}
        </>
  )
}
