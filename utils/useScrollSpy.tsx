'use client';
import { useEffect, useState } from 'react';

type UseScrollSpyOptions = {
  ids: string[];
  threshold?: number[];
  rootMargin?: string;
};

export function useScrollSpy({
  ids,
  threshold = [0, 0.25, 0.5, 0.75, 1.0],
  rootMargin = '0px 0px -60% 0px',
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) return;

    const ratios = new Map<string, { ratio: number; top: number }>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target.id, {
            ratio: e.isIntersecting ? e.intersectionRatio : 0,
            top: e.boundingClientRect.top,
          });
        }

        let bestId: string | null = null;
        let best = { ratio: -1, top: Number.POSITIVE_INFINITY };

        for (const id of ids) {
          const curr = ratios.get(id) ?? { ratio: 0, top: Number.POSITIVE_INFINITY };
          if (
            curr.ratio > best.ratio ||
            (Math.abs(curr.ratio - best.ratio) < 0.1 && curr.top < best.top)
          ) {
            best = curr;
            bestId = id;
          }
        }

        if (bestId) setActiveId(bestId);
      },
      { threshold, rootMargin }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Initialize based on scroll position at mount
    const firstVisible = ids.find((id) => {
      const el = document.getElementById(id);
      return el && el.getBoundingClientRect().top >= 0;
    });
    if (firstVisible) setActiveId(firstVisible);

    return () => observer.disconnect();
  }, [ids, threshold, rootMargin]);

  return { activeId };
}