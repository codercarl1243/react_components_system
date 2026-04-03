'use client';
import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Hero from '@/components/homepage/hero';
import LatestPosts from '@/components/homepage/post.latest';
import LatestProjects from '@/components/projects/projects.latest';
import { Block } from '@/components/primitives';
import Octagons from '@/components/octagons';

interface ScrollValues {
  target: number;       // total page height
  windowHeight: number; // viewport height
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const octagonsRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [scrollMaxValue, setScrollMaxValue] = useState<number>(1200);

  useEffect(function establishDOMSizing() {
    const windowHeight = window.innerHeight;
    setScrollMaxValue(windowHeight);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);

  const padding = 120;

  const thumbY = useTransform(scrollY, [0, scrollMaxValue + padding], [(padding * 1.25), scrollMaxValue - (padding * 0.25)]);
  const rotateForwards = useTransform(scrollY, [0, scrollMaxValue], [0, 720]);
  const rotateBackwards = useTransform(scrollY, [0, scrollMaxValue], [0, -360]);

  return (
    <Block ref={containerRef} className='layout-wrapper homepage px-md pb-lg flow-xl'>
      <Octagons
        ref={octagonsRef}
        thumbY={thumbY}
        rotateForwards={rotateForwards}
        rotateBackwards={rotateBackwards} />
      <Hero />
      <LatestPosts />
      <LatestProjects />
    </Block>
  )
}
