import Image from '@/components/image'
import Heading from '@/components/heading'

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero content-wrapper flow-4 text-center"
    >
      <Image
        src="/images/heroImage.webp"
        alt="Carl smiling because today is another awesome day!"
        variant="hero"
        className="hero__image-wrapper"
      />

      <div className="hero__content flow-8">
        <Heading headingLevel={1} id="hero-heading" className="hero__content--heading">
          Hey, I&apos;m Carl
        </Heading>

        <div className="hero__content--subtitle text-lg flow-4">
          <p>I like to build things that help people use the web better.</p>
          <p>On this site I share my <span className="fun-underline">process</span>, <span className="fun-underline">tools</span>, and <span className="fun-underline">lessons</span> from working with the web.</p>
        </div>
      </div>
    </section>
  )
}