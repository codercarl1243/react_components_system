import ContactForm from '@/components/contact_form';
import Hero from '@/components/homepage/hero';
import LatestPosts from '@/components/homepage/post.latest';
import { Block, Row } from '@/components/primitives';

export default function Home() {

  return (
    <Block className='layout-wrapper homepage pb-8 flow-16'>
      <Hero />
      <LatestPosts />
      <ContactForm />
    </Block>
  )
}
