/* 
  Test framework note:
  - This test file is compatible with both Vitest and Jest (describe/it/expect).
  - The repository's configured runner (Vitest or Jest) should pick this up automatically.
*/

type Variant = {
  width: number;
  height: number;
  sizes: string;
  aspectRatio: number;
  blurDataURL: string;
  quality: number;
};

type VariantKey =
  | "logo"
  | "rectangleLogo"
  | "card"
  | "featured"
  | "default"
  | "hero"
  | "banner"
  | "general";

/**
 * Import path:
 * We try a couple of common module paths.
 * Update the path below if your project exports imageVariants elsewhere.
 */
let imageVariants: Record<VariantKey, Variant>;
try {
  // Most likely location (e.g., src/components/image/imageVariants.ts exporting imageVariants)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  imageVariants = require("@/components/image/imageVariants").imageVariants;
} catch {
  try {
    // Alternate filename pattern
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    imageVariants = require("@/components/image/image.variants").imageVariants;
  } catch {
    // Fallback: the file under test may be colocated with type import
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    imageVariants = require("@/components/image").imageVariants;
  }
}

const EXPECTED_KEYS: VariantKey[] = [
  "logo",
  "rectangleLogo",
  "card",
  "featured",
  "default",
  "hero",
  "banner",
  "general",
];

const EXPECTED: Record<VariantKey, Variant> = {
  logo: {
    width: 100,
    height: 100,
    sizes: "(max-width: 640px) 80px, 100px",
    aspectRatio: 1,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
    quality: 95,
  },
  rectangleLogo: {
    width: 400,
    height: 100,
    sizes: "(max-width: 640px) 300px, (max-width: 768px) 350px, 400px",
    aspectRatio: 4,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
    quality: 95,
  },
  card: {
    width: 400,
    height: 300,
    sizes:
      "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px",
    aspectRatio: 4 / 3,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
    quality: 80,
  },
  featured: {
    width: 1440,
    height: 810,
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, (max-width: 1440px) 80vw, 1440px",
    aspectRatio: 16 / 9,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI4MTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
    quality: 90,
  },
  default: {
    width: 1200,
    height: 800,
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1200px) 80vw, 1200px",
    aspectRatio: 1.5,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
    quality: 85,
  },
  hero: {
    width: 1920,
    height: 1080,
    sizes: "(max-width: 768px) 100vw, (max-width: 1440px) 95vw, 1920px",
    aspectRatio: 16 / 9,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=",
    quality: 90,
  },
  banner: {
    width: 1200,
    height: 400,
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1200px) 85vw, 1200px",
    aspectRatio: 3,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
    quality: 88,
  },
  general: {
    width: 1080,
    height: 1080,
    sizes:
      "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1200px) 50vw, 540px",
    aspectRatio: 1,
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=",
    quality: 85,
  },
};

const TOL = 1e-6;

describe("imageVariants configuration", () => {
  it("includes all expected variant keys and no extras", () => {
    const keys = Object.keys(imageVariants).sort();
    expect(keys).toEqual([...EXPECTED_KEYS].sort());
  });

  it("matches static snapshot for regression safety", () => {
    expect(imageVariants).toMatchSnapshot();
  });

  it("has the correct shape and types for every variant", () => {
    for (const key of EXPECTED_KEYS) {
      const v = (imageVariants as any)[key];
      expect(v).toBeDefined();
      expect(typeof v.width).toBe("number");
      expect(typeof v.height).toBe("number");
      expect(typeof v.sizes).toBe("string");
      expect(typeof v.aspectRatio).toBe("number");
      expect(typeof v.blurDataURL).toBe("string");
      expect(typeof v.quality).toBe("number");

      // No unexpected keys in each variant
      const variantKeys = Object.keys(v).sort();
      expect(variantKeys).toEqual(
        ["width", "height", "sizes", "aspectRatio", "blurDataURL", "quality"].sort()
      );

      // Quality within sane bounds
      expect(v.quality).toBeGreaterThanOrEqual(1);
      expect(v.quality).toBeLessThanOrEqual(100);

      // aspectRatio approximately equals width / height
      const ratio = v.width / v.height;
      expect(Math.abs(v.aspectRatio - ratio)).toBeLessThanOrEqual(TOL);

      // blurDataURL must be an SVG data URI with base64 payload
      expect(v.blurDataURL.startsWith("data:image/svg+xml;base64,")).toBe(true);
      const base64 = v.blurDataURL.replace("data:image/svg+xml;base64,", "");
      // Buffer is available in Node test environments (Jest/Vitest)
      const decoded = Buffer.from(base64, "base64").toString("utf8");
      expect(decoded).toContain("<svg");
      expect(decoded).toContain("</svg>");
    }
  });

  it("keeps exact sizes strings (to avoid layout regressions)", () => {
    for (const key of EXPECTED_KEYS) {
      expect(imageVariants[key].sizes).toBe(EXPECTED[key].sizes);
    }
  });

  it("uses exact numeric values for width, height, aspectRatio, and quality", () => {
    for (const key of EXPECTED_KEYS) {
      const v = imageVariants[key];
      const e = EXPECTED[key];
      expect(v.width).toBe(e.width);
      expect(v.height).toBe(e.height);
      expect(v.quality).toBe(e.quality);
      // numeric equality for aspect ratios that were authored as numbers/expressions
      expect(Math.abs(v.aspectRatio - e.aspectRatio)).toBeLessThanOrEqual(TOL);
    }
  });

  it("uses correct data URIs (prefix match) for each variant", () => {
    for (const key of EXPECTED_KEYS) {
      expect(imageVariants[key].blurDataURL.startsWith("data:image/svg+xml;base64,")).toBe(true);
    }
  });
});