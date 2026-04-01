import Heading from '@/components/heading';
import Octagons from '@/components/octagons';
import { Inline } from '@/components/primitives';
import CTALink from '../link/ctalink';
import ReadTheBlogCTA from './readTheBlogCTA';

export default function Hero() {

  return (
    <section className='hero homepage__section relative flow-xxl'>
      <Octagons />
      <Heading as={"h1"} headingSize={2} id="hero-heading" className='mb-md' variant='neutral' variantAppearance='filled'>
        Hey, I'm Carl
      </Heading>
      <p className='mb-smxl'>
        On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, <span className="fun-underline">lessons</span>, and the occasional bit of <span className="fun-underline">creative chaos</span> from working with the web.
      </p>

      <Inline className='w-full px-md' justify='between'>
        <ReadTheBlogCTA />
        <CTALink href="/about" variantAppearance='outlined' >About me</CTALink>
      </Inline>
    </section>
  )
}