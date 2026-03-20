import ContactForm from '@/components/contact_form';
import Hero from '@/components/homepage/hero';
import LatestPosts from '@/components/homepage/post.latest';
import LatestProjects from '@/components/projects/projects.latest';
import { Block } from '@/components/primitives';
import Image from '@/components/image';

export default function Home() {

  return (
    <Block className='layout-wrapper homepage px-md pb-lg flow-xl'>
      <Hero />
      <LatestPosts />
      <LatestProjects />
    </Block>
  )
}
