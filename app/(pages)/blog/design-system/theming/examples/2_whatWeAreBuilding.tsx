import Code from "@/components/code";
import Icon from "@/components/icon";
import Link from "@/components/link";
import { Row, Stack } from "@/components/primitives";
import {
  RiArrowDownLongFill,
  RiPaletteFill,
  RiCodeSSlashFill,
  RiPaintBrushFill,
  RiCheckboxCircleFill,
  RiContrastFill,
} from "@remixicon/react";

export default function TokenFlowDiagram() {
  return (
    <Stack
      as="figure"
      gap={6}
      align="stretch"
      className="theming-diagram surface-frame text-sm"
      variant="info"
      variantAppearance="tonal"
      paint="border"
    >
      {/* Global */}
      <Stack
        gap={4}
        className="theming-diagram-box surface-frame"
        variant="primary"
        variantAppearance="tonal"
        paint="all"
      >
        <Row as="strong" gap={2}>
          <Icon icon={RiPaletteFill} />
          Global Tokens
          <Link href="https://github.com/codercarl1243/react_components_system/tree/main/app/styles/tokens">
            (tokens)
          </Link>
        </Row>

        <Code
          copyEnabled={false}
          lang="css"
          codeString={`:root {
  /* Neutrals */
  --color-neutral-100: hsl(0, 0%, 100%);
  --color-neutral-400: hsl(0, 0%, 46%);
  --color-neutral-900: hsl(0, 0%, 0%);

  /* Semantic color scales */
  --color-primary-100: hsl(203, 31%, 90%);
  --color-primary-400: hsl(212, 75%, 40%);
  --color-primary-600: hsl(212, 76%, 28%);

  --color-danger-400: hsl(0, 87%, 49%);
  --color-success-400: hsl(143, 56%, 34%);
  
  /* ...additional color scales follow same pattern */
}`}
        />
      </Stack>

      <Icon icon={RiArrowDownLongFill} className="mx-auto" />

      <Stack className="surface-frame p-8 frame-inset-8" variant="secondary" variantAppearance="tonal" paint={"all"} style={{ borderStyle: "dashed" }}>
        <p className="center text-sm italic">
          Parallel consumers of global tokens
        </p>
        {/* Theme */}
        <Stack
          gap={4}
          className="theming-diagram-box surface-frame"
          variant="neutral"
          variantAppearance="tonal"
          paint="all"
        >
          <Row as="strong" gap={2}>
            <Icon icon={RiContrastFill} />
            Theme Tokens
            <Link href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/tokens/theme.css">
              (theme.css)
            </Link>
          </Row>

          <Code
            copyEnabled={false}
            lang="css"
            codeString={`/* Light theme */
:root:has([data-theme="light"]) {
  --surface: var(--color-neutral-100);
  --text-on-surface: var(--color-neutral-900);
}
/* Repeat for dark theme */

/* Global defaults */
body {
    background-color: var(--surface);
    color: var(--text-on-surface);
}`}
          />
        </Stack>
        {/* Variant */}
        <Stack
          gap={4}
          className="theming-diagram-box surface-frame"
          variant="neutral"
          variantAppearance="tonal"
          paint="all"
        >
          <Row as="strong" gap={2}>
            <Icon icon={RiCodeSSlashFill} />
            Variant Tokens
            <Link href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/design-system/variants.css">
              (variants.css)
            </Link>
          </Row>
          <Code
            copyEnabled={false}
            lang="css"
            codeString={`[data-variant="primary"] {
  --variant-bg: var(--color-primary-400);
  --variant-fg: var(--color-neutral-100);
  --variant-border: var(--color-primary-600);
}`}
          />
        </Stack>
      </Stack>

      <Icon icon={RiArrowDownLongFill} className="mx-auto" />

      {/* Appearance */}
      <Stack
        gap={4}
        className="theming-diagram-box surface-frame"
        variant="accent"
        variantAppearance="tonal"
        paint="all"
      >
        <Row as="strong" gap={2}>
          <Icon icon={RiPaintBrushFill} />
          Appearance Mappings
          <Link href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/design-system/appearance.css">
            (appearance.css)
          </Link>
        </Row>

        <Code
          copyEnabled={false}
          lang="css"
          codeString={`[data-appearance="filled"] {
  --background-color: var(--variant-bg);
  --foreground-color: var(--variant-fg);
  --border-color: var(--variant-border);
}`}
        />
      </Stack>

      <Icon icon={RiArrowDownLongFill} className="mx-auto" />

      {/* Paint */}
      <Stack
        gap={4}
        className="theming-diagram-box surface-frame"
        variant="warning"
        variantAppearance="tonal"
        paint="all"
      >
        <Row as="strong" gap={2}>
          <Icon icon={RiCheckboxCircleFill} />
          Paint (Application)
          <Link href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/design-system/paint.css">
            (paint.css)
          </Link>
        </Row>

        <Code
          copyEnabled={false}
          lang="css"
          codeString={`[data-paint~="background"] {
  background-color: var(--background-color);
}

[data-paint~="foreground"] {
  color: var(--foreground-color);
}`}
        />
      </Stack>
      <figcaption className="italic text-sm">
        Global tokens feed both Theme and Variant. 
        Theme establishes the visual baseline.
        Variants define meaning, appearances map treatment, and paint applies styling.
      </figcaption>
    </Stack>
  );
}
