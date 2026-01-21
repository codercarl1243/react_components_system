import Heading from '@/components/heading'

export default function Hero() {

  return (
    <div className='width-bleed'>
      <Heading as={"h1"} id="hero-heading">
        Hey, I'm Carl
      </Heading>

      <p>
        On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, and <span className="fun-underline">lessons</span> from working with the web.
      </p>
    </div>
  )
}