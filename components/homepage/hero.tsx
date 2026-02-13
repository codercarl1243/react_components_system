import BubbleButton from '@/components/button/bubbleButton'
import Heading from '@/components/heading'

export default function Hero() {

  return (
    <div className='width-full'>
      <Heading as={"h1"} id="hero-heading" className='mb-4' variant='neutral' variantAppearance='filled'>
        Hey, I'm Carl
      </Heading>
      <p className='mb-16'>
        On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, <span className="fun-underline">lessons</span>, and the occasional bit of <span className="fun-underline">creative chaos</span> from working with the web.
      </p>
      <BubbleButton />
    </div>
  )
}