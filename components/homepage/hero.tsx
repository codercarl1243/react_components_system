import Heading from '@/components/heading'
import { Stack } from '@/components/primitives'

export default function Hero() {

  return (
    <>
       <Heading as={"h1"} id="hero-heading">
        Hey, I'm Carl
      </Heading>

      <p>On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, and <span className="fun-underline">lessons</span> from working with the web.</p>
    </>
  )
  return (
    <Stack
      as="section"
      id="hero"
      aria-labelledby="hero-heading"
      className="hero"
      gap={6}
    >
      <Heading as={"h1"} id="hero-heading">
        Hey, I'm Carl
      </Heading>

      <p>On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, and <span className="fun-underline">lessons</span> from working with the web.</p>
    </Stack>
  )
}