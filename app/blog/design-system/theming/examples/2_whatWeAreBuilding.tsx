import Button from "@/components/button";
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
} from "@remixicon/react";

export default function TokenFlowDiagram() {
  return (
    <Stack
      as="figure"
      gap={6}
      align="stretch"
      className="theming-diagram surface-frame"
      variant="info"
      variantAppearance="tonal"
      paint="border"
    >
      {/* Theme */}
      <Stack
        gap={4}
        className="theming-diagram-box surface-frame"
        variant="primary"
        variantAppearance="tonal"
        paint="all"
      >
        <Row as="strong" gap={2}>
          <Icon icon={RiPaletteFill} />
          Theme Tokens
          <Link href="https://github.com/codercarl1243/react_components_system/tree/main/styles/tokens">
            (tokens)
          </Link>
        </Row>

        <Code
          copyEnabled={false}
          lang="css"
          codeString={`--surface: var(--color-neutral-100);
--text-on-surface: var(--color-neutral-900);
--link-color: var(--color-primary-400);`}
        />
      </Stack>

      <Icon icon={RiArrowDownLongFill} className="mx-auto" />

      {/* Variant */}
      <Stack
        gap={4}
        className="theming-diagram-box surface-frame"
        variant="secondary"
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
          codeString={`--variant-bg: var(--color-primary-400);
--variant-fg: var(--color-neutral-100);
--variant-border: var(--color-primary-600);
--variant-surface: var(--color-primary-100);`}
        />
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
          codeString={`--background-color: var(--variant-bg);
--foreground-color: var(--variant-fg);
--border-color: var(--variant-border);`}
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
        Tokens flow downward through the system. Theme defines the environment,
        variants add meaning, appearances map treatment, paint applies styling,
        and components simply consume the result.
      </figcaption>
    </Stack>
  );
}
