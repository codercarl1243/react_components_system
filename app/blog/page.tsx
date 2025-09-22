import Heading from '@/components/heading'
import PostCard from '@/components/post/post.card'

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
                      variant="featured" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="card" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="card" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="card" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="card" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                        <li>
                      <PostCard 
                      headingLevel={2}
                      variant="card" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                                            <li>
                      <PostCard 
                      headingLevel={2}
                      variant="card" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
                          alt: 'A collection of buttons showing different states and styles'}, 
                        slug: 'design-system/buttons'}}
                      />
                    </li>
                                                            <li>
                      <PostCard 
                      headingLevel={2}
                      variant="card" 
                      post={{
                        title: 'Buttons - the base of every button', 
                        image: {
                          src: 'globe.svg', 
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
