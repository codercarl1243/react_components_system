import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import BlogLink from "@/components/post/post.blogLink";
import PostSection from "@/components/post/post.section";
import { Stack } from "@/components/primitives";
import Tablist from "@/components/tablist";


export default function Resources() {


    return (
        <PostSection id="resources" className="flow-8">
            <Stack>
                <AnchorHeading as={"h2"} id="resources-heading">Code & Resources</AnchorHeading>
                <p className="italic">
                    This section documents constraints, tradeoffs, and reference material — it does not introduce new concepts.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Class Naming & Utility Class Conflicts</Heading>
                <p>
                    Class names used in this post (e.g. <InlineCode codeString="stack-align-center" lang="css" />, <InlineCode codeString="inline-justify-between" lang="css" />) are chosen for readability.
                </p>
                <p>
                    In projects that use Tailwind, Bootstrap, or a home-grown utility system, these may clash. A namespace prefix such as <InlineCode codeString="ds-" lang="css" /> or your system's name is worth considering to keep design system classes isolated.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Typescript notes</Heading>
                <p>
                    The shared <InlineCode codeString="PrimitiveProps" /> type uses <InlineCode codeString="Omit" lang="ts" /> to remove any existing <InlineCode codeString="as" /> prop from <InlineCode codeString="ComponentProps<T>" lang="ts" />.
                    This prevents duplicate or conflicting polymorphic definitions when composing custom element types.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Further Reading</Heading>
                <p>
                    <strong>Layout & Primitives</strong>
                </p>
                <List as="ul">
                    <li>
                        <Link href="https://every-layout.dev/">Every Layout - Heydon Pickering & Andy Bell</Link> — the Stack and Inline patterns in this post are directly inspired by this work.
                    </li>
                    <li>
                        <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout">MDN: CSS Grid Layout</Link>
                    </li>
                    <li>
                        <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout">MDN: CSS Flexible Box Layout</Link>

                    </li>
                </List>
                <p>
                    <strong>Design Systems</strong>
                </p>
                <List as="ul">
                    <li>
                        <Link href="https://www.radix-ui.com/primitives">Radix Primitives</Link> — a well-known example of a primitive-based component system.
                    </li>
                    <li>
                        <Link href="https://paste.twilio.design/">Paste by Twilio</Link> — another system with a strong primitive layer.
                    </li>
                </List>
            </Stack>


            <Stack>
                <Heading as="h3" headingSize={4}>Primitives (Reference)</Heading>
                <p>
                    Reference implementation of the Primitives discussed in the post.
                </p>
                <Heading as="h4" headingSize={6}>Types</Heading>
                <Code
                    codeString={`import { ElementType, ComponentProps } from "react";
                    
/*
    Block defines the containment surface.
    All higher-order Primitives compose from Block.

    Each primitive exposes alignment and distribution
    values appropriate to its layout mode.
*/

type PrimitiveProps<T extends ElementType = "div"> = {
    as?: T;
} & Omit<ComponentProps<T>, "as">;
 
type BlockProps<T extends ElementType = "div"> =
    PrimitiveProps<T>;
  
type StackProps<T extends ElementType = "div"> =
BlockProps<T> & {
    gap?: Gap;
    align?: GridAlignment;
    justify?: GridJustify;
};

type InlineProps<T extends ElementType = "div"> =
BlockProps<T> & {
    gap?: Gap
    align?: FlexAlignment;
    justify?: FlexJustify;
    wrap?: boolean; // true = wrap (default), false = nowrap
}`}
                />
                <Heading as="h4" headingSize={6}>Components</Heading>
                <p><strong>block.tsx</strong></p>
                <p>
                    The <InlineCode codeString="block" lang="tsx" /> className connects the component to the paint system. Without it, <InlineCode codeString="data-paint" lang="tsx" /> attributes would have no CSS target to apply styles to. See <BlogLink postId="design__theming_01">Theming Foundations</BlogLink> for how the paint layer works.
                </p>
                <Code
                    title="block.tsx"
                    codeString={`import type { BlockProps } from "@/components/primitives/types";
import { clsx } from "clsx";

function Block<T extends ElementType = "div">({
    as,
    ...rest
}: BlockProps<T>) {

    const Component = as || "div";

    return <Component  className={clsx("block", className)} {...rest} />;`}
                />
                <Tablist
                    tabListName="primitives_code_reference_stack"
                    className="code__reference height-min"
                    variant="accent"
                    orientation="horizontal"
                    tabs={[
                        {
                            id: "primitives-resources-stack",
                            tabLabel: "stack.tsx",
                            panelContent: (
                                <Code
                                    codeString={`import { clsx } from "clsx";
import { Block } from "@/components/primitives/block";
import type { StackProps, BlockProps } from "@/components/primitives/types";

export function Stack<T extends ElementType = "div">({
  gap = 4,
  align = "baseline",
  className,
  ...blockProps
}: StackProps<T>) {

  const classes = clsx(
    "stack",
    \`gap-row-\${gap}\`,
    \`stack-align-\${align}\`,
    className
  );

  return (
    <Block
      className={classes}
      {...blockProps as BlockProps<T>}
    />
  );
}`}
                                />
                            )
                        },
                        {
                            id: "primitives-resources-stackcss",
                            tabLabel: "stack.css",
                            panelContent: (
                                <Code
                                    codeString={`.stack {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: minmax(0, 1fr);
  align-items: var(--stack-alignment);
  min-width: 0;
}

.stack-align-start    { --stack-alignment: start; }
.stack-align-center   { --stack-alignment: center; }
.stack-align-end      { --stack-alignment: end; }
.stack-align-stretch  { --stack-alignment: stretch; }
.stack-align-baseline { --stack-alignment: baseline; }`}
                                    lang="css"
                                />
                            )
                        }
                    ]}
                />

                <Tablist
                    tabListName="primitives_code_reference_inline"
                    className="code__reference height-min"
                    variant="accent"
                    orientation="horizontal"
                    tabs={[
                        {
                            id: "primitives-resources-inline",
                            tabLabel: "inline.tsx",
                            panelContent: (
                                <Code
                                    codeString={`import { clsx } from "clsx";
import { Block } from "@/components/primitives/block";
import type { InlineProps, BlockProps } from "@/components/primitives/types";

export function Inline<T extends ElementType = "div">({
  gap = 4,
  align = "center",
  justify = "start",
  wrap = true,
  className,
  ...blockProps
}: InlineProps<T>) {

  const classes = clsx(
    "inline",
    \`gap-\${gap}\`,
    \`inline-align-\${align}\`,
    \`inline-justify-\${justify}\`,
    wrap ? "inline-wrap" : "inline-nowrap",
    className
  );

  return (
    <Block
      className={classes}
      {...blockProps as BlockProps<T>}
    />
  );
}`}
                                />
                            )
                        },
                        {
                            id: "primitives-resources-inlinecss",
                            tabLabel: "inline.css",
                            panelContent: (
                                <Code
                                    codeString={`.inline {
  display: inline-flex;
  align-items: var(--inline-alignment);
  justify-content: var(--inline-justify);
  min-width: 0;
}

.inline-wrap   { flex-wrap: wrap; }
.inline-nowrap { flex-wrap: nowrap; }

.inline-align-start    { --inline-alignment: flex-start; }
.inline-align-center   { --inline-alignment: center; }
.inline-align-end      { --inline-alignment: flex-end; }
.inline-align-stretch  { --inline-alignment: stretch; }
.inline-align-baseline { --inline-alignment: baseline; }

.inline-justify-start   { --inline-justify: flex-start; }
.inline-justify-center  { --inline-justify: center; }
.inline-justify-end     { --inline-justify: flex-end; }
.inline-justify-between { --inline-justify: space-between; }
.inline-justify-around  { --inline-justify: space-around; }`}
                                    lang="css"
                                />
                            )
                        }
                    ]}
                />
            </Stack>
        </PostSection>

    )
}