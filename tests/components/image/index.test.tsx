/**
 * Tests for Enhanced Image component
 *
 * Testing library and framework:
 * - This suite is written for React Testing Library with either Vitest (preferred if present) or Jest.
 * - It uses vi/jest mocks for next/image and module alias "@/components/image/imageVariants".
 */

import React from 'react';

// Support both Vitest and Jest without new deps:
let describeFn: typeof describe;
let itFn: typeof it;
let expectFn: typeof expect;
let beforeEachFn: typeof beforeEach;
let afterEachFn: typeof afterEach;
let viOrJest: any;

try {
  // Vitest available
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const vitest = require('vitest') as typeof import('vitest');
  describeFn = vitest.describe;
  itFn = vitest.it;
  expectFn = vitest.expect;
  beforeEachFn = vitest.beforeEach;
  afterEachFn = vitest.afterEach;
  viOrJest = vitest.vi;
  // jest-dom for Vitest env if installed via @testing-library/jest-dom/vitest
  try { require('@testing-library/jest-dom/vitest'); } catch {}
} catch {
  // Fallback to Jest globals
  describeFn = describe;
  itFn = it;
  expectFn = expect;
  beforeEachFn = beforeEach;
  afterEachFn = afterEach;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viOrJest = (global as any).vi ?? (global as any).jest;
  try { require('@testing-library/jest-dom'); } catch {}
}

import { render, screen } from '@testing-library/react';

// Mock next/image to behave like a plain img so we can assert props easily.
viOrJest.mock('next/image', () => {
  // default export component that forwards props to a real <img>
  return {
    __esModule: true,
    default: (props: any) => <img data-testid="next-image" {...props} />,
  };
});

// Provide a controllable mock for imageVariants used by the component.
const mockVariants = {
  default: {
    width: 400,
    height: 300,
    sizes: '(max-width: 768px) 100vw, 400px',
    aspectRatio: '4 / 3',
    blurDataURL: 'data:image/png;base64,DEFAULT',
    quality: 75,
  },
  card: {
    width: 320,
    height: 200,
    sizes: '(max-width: 768px) 100vw, 320px',
    aspectRatio: '16 / 10',
    blurDataURL: 'data:image/png;base64,CARD',
    quality: 80,
  },
  hero: {
    width: 1920,
    height: 1080,
    sizes: '(max-width: 1200px) 100vw, 1920px',
    aspectRatio: '16 / 9',
    blurDataURL: 'data:image/png;base64,HERO',
    quality: 85,
  },
  featured: {
    width: 1280,
    height: 720,
    sizes: '(max-width: 1200px) 100vw, 1280px',
    aspectRatio: '16 / 9',
    blurDataURL: 'data:image/png;base64,FEATURED',
    quality: 88,
  },
  banner: {
    width: 2560,
    height: 720,
    sizes: '(max-width: 1400px) 100vw, 2560px',
    aspectRatio: '32 / 9',
    blurDataURL: 'data:image/png;base64,BANNER',
    quality: 90,
  },
};

viOrJest.mock('@/components/image/imageVariants', () => {
  return {
    __esModule: true,
    imageVariants: mockVariants,
  };
});

// Import the component under test AFTER mocks
// Try both common project structures to be robust across repos.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ImageComp: any = (() => {
  try {
    // Typical Next.js app alias import
    return require('@/components/image').default ?? require('@/components/image/index').default;
  } catch {
    try {
      // Fallbacks to common relative locations
      return require('src/components/image').default ?? require('src/components/image/index').default;
    } catch {
      try {
        return require('components/image').default ?? require('components/image/index').default;
      } catch {
        // Final fallback: direct path from project root if tests mirror structure
        return require('../../..//components/image').default ?? require('../../..//components/image/index').default;
      }
    }
  }
})();

describeFn('components/image/Image (Enhanced Image)', () => {
  beforeEachFn(() => {
    // reset modules not strictly necessary because we mock at top-level
  });
  afterEachFn(() => {
    // cleanup handled by testing library
  });

  itFn('renders with default variant when none provided', () => {
    render(<ImageComp src="/img.jpg" alt="Default variant" />);

    const el = screen.getByTestId('next-image');
    expectFn(el).toBeInTheDocument();
    // className includes base 'image' and no variant modifier when not provided
    expectFn(el).toHaveClass('image');
    expectFn(el.className.includes('image--')).toBe(false);

    // width/height/sizes come from default variant
    expectFn(el.getAttribute('width')).toBe(String(mockVariants.default.width));
    expectFn(el.getAttribute('height')).toBe(String(mockVariants.default.height));
    expectFn(el.getAttribute('sizes')).toBe(mockVariants.default.sizes);

    // placeholder defaults to 'blur'
    expectFn(el.getAttribute('placeholder')).toBe('blur');

    // blurDataURL falls back to variant value
    expectFn(el.getAttribute('blurdataurl')).toBe(mockVariants.default.blurDataURL);

    // quality falls back to variant default
    expectFn(el.getAttribute('quality')).toBe(String(mockVariants.default.quality));

    // style merges aspectRatio from variant
    expectFn(el).toHaveStyle({ aspectRatio: mockVariants.default.aspectRatio });
  });

  itFn('applies variant-specific classes and props', () => {
    render(<ImageComp variant="card" src="/card.jpg" alt="Card variant" className="extra" />);

    const el = screen.getByTestId('next-image');
    expectFn(el).toHaveClass('image');
    expectFn(el).toHaveClass('image--card');
    expectFn(el).toHaveClass('extra');

    expectFn(el.getAttribute('width')).toBe(String(mockVariants.card.width));
    expectFn(el.getAttribute('height')).toBe(String(mockVariants.card.height));
    expectFn(el.getAttribute('sizes')).toBe(mockVariants.card.sizes);
    expectFn(el).toHaveStyle({ aspectRatio: mockVariants.card.aspectRatio });
    expectFn(el.getAttribute('blurdataurl')).toBe(mockVariants.card.blurDataURL);
    expectFn(el.getAttribute('quality')).toBe(String(mockVariants.card.quality));
  });

  itFn('gives priority by default for hero/banner/featured variants', () => {
    render(<ImageComp variant="hero" src="/hero.jpg" alt="Hero image" />);
    const hero = screen.getByTestId('next-image');
    expectFn(hero.getAttribute('priority')).toBe('true');

    render(<ImageComp variant="featured" src="/featured.jpg" alt="Featured image" />);
    const featured = screen.getAllByTestId('next-image')[1];
    expectFn(featured.getAttribute('priority')).toBe('true');

    render(<ImageComp variant="banner" src="/banner.jpg" alt="Banner image" />);
    const banner = screen.getAllByTestId('next-image')[2];
    expectFn(banner.getAttribute('priority')).toBe('true');
  });

  itFn('does not set priority by default for non-hero/banner/featured variants', () => {
    render(<ImageComp variant="card" src="/card.jpg" alt="Card" />);
    const el = screen.getByTestId('next-image');
    // undefined attributes return null
    expectFn(el.getAttribute('priority') === null || el.getAttribute('priority') === 'false').toBe(true);
  });

  itFn('allows explicit priority override via props', () => {
    // Force off for hero (default would be true)
    render(<ImageComp variant="hero" priority={false} src="/h.jpg" alt="Hero override" />);
    const off = screen.getByTestId('next-image');
    expectFn(off.getAttribute('priority')).toBe('false');

    // Force on for non-priority variant
    render(<ImageComp variant="card" priority src="/c.jpg" alt="Card override" />);
    const on = screen.getAllByTestId('next-image')[1];
    expectFn(on.getAttribute('priority')).toBe('true');
  });

  itFn('uses placeholder="blur" by default but respects explicit placeholder prop', () => {
    render(<ImageComp src="/a.jpg" alt="A" />);
    const def = screen.getByTestId('next-image');
    expectFn(def.getAttribute('placeholder')).toBe('blur');

    render(<ImageComp src="/b.jpg" alt="B" placeholder="empty" />);
    const explicit = screen.getAllByTestId('next-image')[1];
    expectFn(explicit.getAttribute('placeholder')).toBe('empty');
  });

  itFn('falls back to variant blurDataURL but allows override', () => {
    render(<ImageComp variant="card" src="/x.jpg" alt="X" />);
    const fallback = screen.getByTestId('next-image');
    expectFn(fallback.getAttribute('blurdataurl')).toBe(mockVariants.card.blurDataURL);

    render(<ImageComp variant="card" src="/y.jpg" alt="Y" blurDataURL="data:override" />);
    const override = screen.getAllByTestId('next-image')[1];
    expectFn(override.getAttribute('blurdataurl')).toBe('data:override');
  });

  itFn('uses variant quality by default but allows quality override', () => {
    render(<ImageComp variant="card" src="/q.jpg" alt="Q" />);
    const def = screen.getByTestId('next-image');
    expectFn(def.getAttribute('quality')).toBe(String(mockVariants.card.quality));

    render(<ImageComp variant="card" src="/q2.jpg" alt="Q2" quality={95} />);
    const override = screen.getAllByTestId('next-image')[1];
    expectFn(override.getAttribute('quality')).toBe('95');
  });

  itFn('merges style with aspectRatio and preserves user styles', () => {
    render(<ImageComp src="/m.jpg" alt="Merge" style={{ objectFit: 'cover', borderRadius: '8px' }} />);
    const el = screen.getByTestId('next-image');
    expectFn(el).toHaveStyle({ aspectRatio: mockVariants.default.aspectRatio });
    expectFn(el).toHaveStyle({ objectFit: 'cover' as any });
    expectFn(el).toHaveStyle({ borderRadius: '8px' });
  });

  itFn('prop precedence: explicit props override variant-derived width/height/sizes', () => {
    render(
      <ImageComp
        variant="card"
        src="/p.jpg"
        alt="Precedence"
        width={111}
        height={222}
        sizes="(max-width: 600px) 100vw, 111px"
      />
    );
    const el = screen.getByTestId('next-image');
    expectFn(el.getAttribute('width')).toBe('111');
    expectFn(el.getAttribute('height')).toBe('222');
    expectFn(el.getAttribute('sizes')).toBe('(max-width: 600px) 100vw, 111px');
  });

  itFn('prop precedence: explicit className is appended after base and variant class', () => {
    render(<ImageComp variant="card" src="/cls.jpg" alt="Classes" className="custom-class" />);
    const el = screen.getByTestId('next-image');
    expectFn(el).toHaveClass('image');
    expectFn(el).toHaveClass('image--card');
    expectFn(el).toHaveClass('custom-class');
  });
});