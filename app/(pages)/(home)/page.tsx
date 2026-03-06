import ContactForm from '@/components/contact_form';
import Hero from '@/components/homepage/hero';
import LatestPosts from '@/components/homepage/post.latest';
import LatestProjects from '@/components/projects/projects.latest';
import { Block } from '@/components/primitives';
import Image from '@/components/image';

export default function Home() {

  return (
    <Block className='layout-wrapper homepage px-4 pb-8 flow-8'>
      <Hero />
      <LatestPosts />
      {/* <Image alt="" src="/images/coffee_mug.webp" height={200} width={400} className={'homepage-banner'} /> */}
      <LatestProjects />
      {/* <section className="homepage__section">
      </section> */}
    </Block>
  )
}
