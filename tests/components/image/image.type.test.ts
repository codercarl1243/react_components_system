// Tests for image type definitions
// Framework note:
// - If using Vitest, `expectTypeOf` checks will run (no runtime import side-effects).
// - Regardless of runner (Jest/Vitest), compile-time checks using `satisfies` and typed assignments
//   ensure the type contracts remain stable. Any type regressions will cause TS compile errors.

import type { ExpectStatic } from 'vitest';
let expectTypeOf: ExpectStatic['expectTypeOf'] | undefined = undefined;
try {
  // Optional import; will only work if Vitest is present in this repo.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  expectTypeOf = require('vitest').expectTypeOf as ExpectStatic['expectTypeOf'];
} catch { /* ignore if Vitest isn't used */ }

// Import types only to avoid runtime dependency on next/image
// Adjust the import path below if your source file lives elsewhere.

import type {
  TImage,
  TImageVariants,
  ImageVariant,
  ImageVariantConfig,
  TNextImageProps,
} from '../../../src/components/image/image.type'; // <- update if source path differs

// Helper type utilities for compile-time assertions (work in any runner)

type Assert<T extends true> = T;
type Extends<A, B> = [A] extends [B] ? true : false;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

// 1) ImageVariant union: verify allowed literal values

type _ImageVariant_has_logo = Assert<Extends<'logo', ImageVariant>>;
type _ImageVariant_has_rectangleLogo = Assert<Extends<'rectangleLogo', ImageVariant>>;
type _ImageVariant_has_card = Assert<Extends<'card', ImageVariant>>;
type _ImageVariant_has_featured = Assert<Extends<'featured', ImageVariant>>;
type _ImageVariant_has_default = Assert<Extends<'default', ImageVariant>>;
type _ImageVariant_has_hero = Assert<Extends<'hero', ImageVariant>>;
type _ImageVariant_has_banner = Assert<Extends<'banner', ImageVariant>>;
type _ImageVariant_has_general = Assert<Extends<'general', ImageVariant>>;

// Negative check: unknown variant should not be assignable
// @ts-expect-error "square" is not a valid ImageVariant
const _badVariant: ImageVariant = 'square';

// 2) ImageVariantConfig shape: required keys and types
type _Config_has_width = Assert<Equal<number, ImageVariantConfig['width']>>;
type _Config_has_height = Assert<Equal<number, ImageVariantConfig['height']>>;
type _Config_has_sizes = Assert<Equal<string, ImageVariantConfig['sizes']>>;
type _Config_has_aspectRatio = Assert<Equal<number, ImageVariantConfig['aspectRatio']>>;
type _Config_has_blurDataURL = Assert<Equal<string, ImageVariantConfig['blurDataURL']>>;
type _Config_has_quality = Assert<Equal<number, ImageVariantConfig['quality']>>;

// Compile-time object must satisfy ImageVariantConfig
const _exampleConfig = {
  width: 1200,
  height: 800,
  sizes: '(max-width: 800px) 100vw, 800px',
  aspectRatio: 1.5,
  blurDataURL: 'data:image/png;base64,iVBORw0...',
  quality: 85,
} satisfies ImageVariantConfig;

// 3) TImageVariants requires a key for each ImageVariant, with ImageVariantConfig values
const _variants: TImageVariants = {
  logo: _exampleConfig,
  rectangleLogo: _exampleConfig,
  card: _exampleConfig,
  featured: _exampleConfig,
  default: _exampleConfig,
  hero: _exampleConfig,
  banner: _exampleConfig,
  general: _exampleConfig,
};

// Missing key should fail
// @ts-expect-error missing key 'general'
const _missingVariants: TImageVariants = {
  logo: _exampleConfig,
  rectangleLogo: _exampleConfig,
  card: _exampleConfig,
  featured: _exampleConfig,
  default: _exampleConfig,
  hero: _exampleConfig,
  banner: _exampleConfig,
};

// Wrong value shape should fail
// @ts-expect-error quality must be number
const _badVariants: TImageVariants = {
  logo: { ..._exampleConfig, quality: '90' },
  rectangleLogo: _exampleConfig,
  card: _exampleConfig,
  featured: _exampleConfig,
  default: _exampleConfig,
  hero: _exampleConfig,
  banner: _exampleConfig,
  general: _exampleConfig,
};

// 4) TImage props: `alt` required and overrides NextImage's `alt`; `variant` optional
// Create a minimal valid TImage (using a generic NextImage-like props requirement)
const minimalImageOk: TImage = {
  // Depending on Next.js version, src can be string or StaticImport; use string which is allowed in most versions
  src: '/img/example.png',
  width: 100,
  height: 100,
  alt: 'example',
  // variant is optional:
  // variant: 'card',
};

// alt is required in TImage
// @ts-expect-error alt is required
const missingAlt: TImage = {
  src: '/img/example.png',
  width: 100,
  height: 100,
};

// variant must be one of ImageVariant
// @ts-expect-error invalid variant literal
const badVariantInTImage: TImage = {
  src: '/img/example.png',
  width: 100,
  height: 100,
  alt: 'ok',
  variant: 'square',
};

// alt must be a string
// @ts-expect-error alt must be string
const badAltInTImage: TImage = {
  src: '/img/example.png',
  width: 100,
  height: 100,
  alt: 123,
};

// If Vitest is available, add some type-level expectations using expectTypeOf for extra safety
if (expectTypeOf) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const expectTO = expectTypeOf;
  // ImageVariant is a string literal union
  expectTO<'logo'>().toMatchTypeOf<ImageVariant>();
  // Config property types
  expectTO<ImageVariantConfig['quality']>().toEqualTypeOf<number>();
  // TImageVariants value type
  expectTO<_variants['logo']>().toMatchTypeOf<ImageVariantConfig>();
  // TImage alt must be string
  expectTO<TImage['alt']>().toEqualTypeOf<string>();
}