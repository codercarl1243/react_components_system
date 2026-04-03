import Heading from '@/components/heading';
import { Inline } from '@/components/primitives';
import LinkButton from '@/components/link/linkButton';
import ReadTheBlogCTA from './readTheBlogCTA';
import { RiArrowRightFill } from '@remixicon/react';
import Icon from '../icon';

export default function Hero() {

  return (
    <section className='hero homepage__section relative flow-xxl'>
      
      <Heading as={"h1"} headingSize={2} id="hero-heading" className='mb-md' variant='neutral' variantAppearance='filled'>
        Hey, I'm Carl
      </Heading>
      <p>
        On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, <span className="fun-underline">lessons</span>, and the occasional bit of <span className="fun-underline">creative chaos</span> from working with the web.
      </p>

      <Inline className='hero-cta w-full' justify="end" align="center" gap="xl">
        <ReadTheBlogCTA />
        <LinkButton
          className="hero-cta--contact"
          href="/about#get-in-touch"
          variant="neutral"
          variantAppearance="filled"
          paint="all"
        >
          <span>Contact me</span>
          <Icon icon={RiArrowRightFill} size="sm" />
        </LinkButton>
      </Inline>
    </section>
  )
}