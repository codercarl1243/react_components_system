import Heading from '@/components/heading'
import Octagons from '@/components/octagons'

export default function Hero() {

  return (
    <section className='width-full hero homepage__section relative'>
      <Octagons />
      <Heading as={"h1"} id="hero-heading" className='mb-4' variant='neutral' variantAppearance='filled'>
        Hey, I'm Carl
      </Heading>
      <p className='mb-16'>
        On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, <span className="fun-underline">lessons</span>, and the occasional bit of <span className="fun-underline">creative chaos</span> from working with the web.
      </p>

    </section>
  )
}