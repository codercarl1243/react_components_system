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
  rootMargin = '0px 0px -50% 0px',
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
          if (curr.ratio > best.ratio) {
            best = curr;
            bestId = id;
          } else if (Math.abs(curr.ratio - best.ratio) < 0.1) {
            const observationLine = window.innerHeight * 0.4;
            if (Math.abs(curr.top - observationLine) < Math.abs(best.top - observationLine)) {
              best = curr;
              bestId = id;
            }
          }
        }

        if (bestId && bestId !== activeId) {
          setActiveId(bestId);
        }
      },
      { threshold, rootMargin }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    if (!activeId) {
      const firstVisible = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight
            ? { id, top: rect.top }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => a!.top - b!.top)[0];

      if (firstVisible) setActiveId(firstVisible.id);
    }

    return () => observer.disconnect();
  }, [ids, threshold, rootMargin]);

  return { activeId };
}