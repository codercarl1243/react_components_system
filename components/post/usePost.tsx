'use client';
import { useEffect, useState } from 'react';

export function usePost() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Find all anchor links in the TOC and extract their target IDs
    const tocContainer = document.querySelector('.post-sidebar__contents');
    if (!tocContainer) return;

    const tocLinks = tocContainer.querySelectorAll('a[href^="#"]');
    const contentIds = Array.from(tocLinks).map(link => {
      const href = link.getAttribute('href');
      return href ? href.substring(1) : '';
    }).filter(Boolean);
    if (!contentIds.length) return;
    
    setActiveId(contentIds[0]);

    const ratios = new Map<string, { ratio: number; top: number }>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          const ratio = e.isIntersecting ? e.intersectionRatio : 0;
          ratios.set(id, { ratio, top: e.boundingClientRect.top });
        }
        // Evaluate across all tracked sections
        let bestId = '';
        let best = { ratio: -1, top: Number.POSITIVE_INFINITY };
        for (const id of contentIds) {
          const curr = ratios.get(id) ?? { ratio: 0, top: Number.POSITIVE_INFINITY };
          if (curr.ratio > best.ratio || (Math.abs(curr.ratio - best.ratio) < 0.1 && curr.top < best.top)) {
            best = curr;
            bestId = id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      {
        // Trigger when 20% of the section is visible
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
        // Add some margin to trigger slightly before/after the exact boundary
        rootMargin: '-20px 0px -80% 0px'
      }
    );

    // Observe all sections
    contentIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return { activeId };
}