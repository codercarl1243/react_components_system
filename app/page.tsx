import ContactForm from '@/components/contact_form';
import Hero from '@/components/hero';
import LatestPosts from '@/components/post/post.latest';

export default function Home() {

  return (
    <div className='layout-wrapper flow-4'>
      <Hero />
      <LatestPosts />
      <ContactForm />
    </div>
  )
}
