import ContactForm from '@/components/contact_form';
import Hero from '@/components/homepage/hero';
import LatestPosts from '@/components/homepage/post.latest';
import { Stack } from '@/components/primitives';

export default function Home() {

  return (
    <Stack className='layout-wrapper homepage' align='center'>
      <Hero />
      <LatestPosts />
      <ContactForm />
    </Stack>
  )
}
