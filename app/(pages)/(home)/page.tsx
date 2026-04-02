'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import Hero from '@/components/homepage/hero';
import LatestPosts from '@/components/homepage/post.latest';
import LatestProjects from '@/components/projects/projects.latest';
import { Block } from '@/components/primitives';
import Octagons from '@/components/octagons';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollTarget = (containerRef.current?.getBoundingClientRect().height || 1200);

  return (
    <Block ref={containerRef} className='layout-wrapper homepage px-md pb-lg flow-xl'>

        <Octagons scrollY={scrollY} scrollTarget={scrollTarget}/>

      <Hero />
      <LatestPosts />
      <LatestProjects />
    </Block>
  )
}
