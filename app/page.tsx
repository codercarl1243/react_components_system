import ContactForm from '@/components/contact_form';
import Hero from '@/components/homepage/hero';
import LatestPosts from '@/components/homepage/post.latest';
import { Block } from '@/components/primitives';
import Image from '@/components/image';

export default function Home() {

  return (
    <Block className='layout-wrapper homepage px-4 pb-8 flow-16'>
      <Hero />
      <LatestPosts />
      <Image alt="" src="/images/coffee_mug.webp" height={200} width={400} className={'homepage-banner'} />
      <ContactForm />
    </Block>
  )
}
