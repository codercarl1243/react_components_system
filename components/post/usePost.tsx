'use client';
import { useEffect, useState } from 'react';

/**
 * Tracks which in-page section (from the post table of contents) is currently active.
 *
 * Observes sections referenced by anchors inside the `.post-sidebar__contents` TOC and updates
 * `activeId` to the id of the most prominently visible section. Visibility is determined via an
 * IntersectionObserver; when multiple sections intersect, the hook prefers the one with the higher
 * intersection ratio and, for near-equal ratios, the section that appears higher on the page.
 *
 * The observer is created on mount and disconnected on unmount.
 *
 * @returns An object containing `activeId` — the current active section id (empty string if none).
 */
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

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that's actually intersecting
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and position to get the most prominent section
          const mostVisible = visibleEntries.reduce((prev, current) => {
            // Prefer sections that are more visible (higher intersection ratio)
            if (current.intersectionRatio > prev.intersectionRatio) {
              return current;
            }
            // If intersection ratios are similar, prefer the one higher up on the page
            if (Math.abs(current.intersectionRatio - prev.intersectionRatio) < 0.1) {
              return current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev;
            }
            return prev;
          });
          
          setActiveId(mostVisible.target.id);
        }
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

  return {activeId};
}