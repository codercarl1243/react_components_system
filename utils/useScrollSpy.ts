'use client';
import { useEffect, useState } from 'react';

const DEFAULT_THRESHOLD = [0, 0.25, 0.5, 0.65, 1];
const DEFAULT_ROOT_MARGIN = '-20% 0px -40% 0px' as const;

type UseScrollSpyOptions = {
  ids: string[];
};
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
export function useScrollSpy({
  ids
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
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
      {threshold: DEFAULT_THRESHOLD, rootMargin: DEFAULT_ROOT_MARGIN }
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
  }, [ids]);

  return { activeId };
}