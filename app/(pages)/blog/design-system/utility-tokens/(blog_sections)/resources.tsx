import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";
import { Stack } from "@/components/primitives";
import InlineCode from "@/components/code/inlineCode";

export default function Resources() {
    return (
        <PostSection id="resources" className="flow-xl">
            <Stack>
                <AnchorHeading as="h2" id="resources-heading">Code &amp; Resources</AnchorHeading>
                <p className="italic">
                    This section documents constraints, tradeoffs, and reference material — it does not introduce new concepts.
                </p>
            </Stack>
            <Stack>
                <AnchorHeading as="h3" headingSize={4} id="resources-notes">Notes &amp; Tradeoffs</AnchorHeading>
                <List as="ol" spacing="loose" marker="lower-roman">
                    <li className="flow-md">
                           <p>
                             <strong>CSS custom properties cannot be used in media queries.</strong> This is a limitation of native CSS — media queries evaluate before the cascade, so custom properties have no value at that point.
                           </p>
                           <p>
                            While preprocessors such as <Link href="https://sass-lang.com/documentation/at-rules/css/#media">Sass</Link> and <Link href="https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media">PostCSS with postcss-custom-media</Link> allow variables in media queries by compiling them to static values at build time, this system uses native CSS, so breakpoint tokens must be consumed as raw values inside <InlineCode codeString="@media" lang="css" /> rules.
                           </p>
                    </li>
                    <li>
                            <strong><InlineCode codeString="clamp()" lang="css" /> fluid type requires care with accessibility.</strong> Fluid typography respects user font size preferences when the viewport-relative unit (<code>vw</code>)
                            is combined with a <code>rem</code> minimum. Using <code>px</code> minimums would break this —
                            always use <code>rem</code> for the min and max values in <code>clamp()</code>.
                    </li>
                    <li className="flow-md">
                        <p>
                            <strong>T-shirt size naming vs numeric naming.</strong>{" "}
                            The spacing scale uses t-shirt sizes (<code>sm</code>, <code>lg</code>) while the utility classes use
                            numbers (<code>.gap-md</code>, <code>.p-lg</code>). The numbers in utility classes are not pixel values
                            — they map to steps in the spacing scale. This can be confusing initially but becomes intuitive quickly.
                        </p>
                    </li>
                </List>
            </Stack>
            <Stack>
                <AnchorHeading as="h3" headingSize={4} id="resources-further-reading">Further Reading</AnchorHeading>
                <AnchorHeading as="h4" headingSize={5} id="resources-spacing-layout">Spacing &amp; Layout</AnchorHeading>
                <List as="ul" spacing="loose" marker="circle">
                    <li><Link href="https://every-layout.dev/">Every Layout</Link> — excellent treatment of spacing as a system concern</li>
                    <li><Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">MDN: CSS Custom Properties</Link></li>
                </List>
                <AnchorHeading as="h4" headingSize={5} id="resources-typography">Typography</AnchorHeading>
                <List as="ul" spacing="loose" marker="circle">
                    <li><Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp">MDN: clamp()</Link> — the function that powers fluid type</li>
                    <li><Link href="https://utopia.fyi/">Utopia</Link> — a tool for generating fluid type and space scales</li>
                    <li><Link href="https://webtypography.net/">The Elements of Typographic Style</Link> — the web adaptation of Bringhurst's classic</li>
                </List>
                <AnchorHeading as="h4" headingSize={5} id="resources-breakpoints">Breakpoints</AnchorHeading>
                <List as="ul" spacing="loose" marker="circle">
                    <li><Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries">MDN: Using media queries</Link></li>
                    <li><Link href="https://every-layout.dev/layouts/switcher/">Every Layout: The Switcher</Link> — an alternative to breakpoint-based layout switching</li>
                </List>
            </Stack>
            <Stack>
                <AnchorHeading as="h3" headingSize={4} id="resources-token-reference">Token Reference</AnchorHeading>
                <TabList
                    tabListName="utility_tokens_reference"
                    className="code__reference height-min"
                    defaultActiveTabId="spacing-tokens"
                    variant="accent"
                    orientation="horizontal"
                    tabs={[
                        {
                            id: 'spacing-tokens',
                            tabLabel: 'spacing.css',
                            panelContent: (
                                <Code
                                    lang="css"
                                    codeString={`:root {
    --spacing-xs:  0.25rem;  /*  4px */
    --spacing:     0.5rem;   /*  8px */
    --spacing-md:  0.75rem;  /* 12px */
    --spacing-lg:  1rem;     /* 16px */
    --spacing-xl:  1.5rem;   /* 24px */
    --spacing-xxl: 2rem;     /* 32px */
    --spacing-3xl: 4rem;     /* 64px */
}`}
                                />
                            )
                        },
                        {
                            id: 'typography-tokens',
                            tabLabel: 'typography.css',
                            panelContent: (
                                <Code
                                    lang="css"
                                    codeString={`:root {
    /* Font sizes */
    --font-size-xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
    --font-size-sm:   clamp(0.875rem, 0.8rem  + 0.375vw, 1rem);
    --font-size-base: clamp(1rem,     0.9rem  + 0.5vw,   1.125rem);
    --font-size-lg:   clamp(1.125rem, 1rem    + 0.625vw, 1.25rem);
    --font-size-xl:   clamp(1.25rem,  1rem    + 0.75vw,  1.5rem);
    --font-size-2xl:  clamp(1.4rem,   1rem    + 1vw,     1.875rem);
    --font-size-3xl:  clamp(1.75rem,  1.25rem + 1.375vw, 2.25rem);
    --font-size-4xl:  clamp(1.85rem,  1.25rem + 1.75vw,  3rem);
    --font-size-5xl:  clamp(1.9rem,   1.5rem  + 2.5vw,   3.75rem);
    --font-size-6xl:  clamp(2rem,     1.5rem  + 3.75vw,  4.5rem);

    /* Line heights */
    --line-height-tight:       1;
    --line-height-snug:        1.1;
    --line-height-normal:      1.2;
    --line-height-relaxed:     1.3;
    --line-height-loose:       1.4;
    --line-height-extra-loose: 1.5;
    --line-height-super-loose: 1.6;
}`}
                                />
                            )
                        },
                        {
                            id: 'breakpoints-tokens',
                            tabLabel: 'breakpoints.css',
                            panelContent: (
                                <Code
                                    lang="css"
                                    codeString={`:root {
    --bp-xs:         18.75rem;  /*  300px */
    --bp-sm:         35rem;     /*  560px */
    --bp-md:         48rem;     /*  768px */
    --bp-lg:         75rem;     /* 1200px */
    --bp-xl:         90rem;     /* 1440px */
    --bp-characters: 80ch;
}`}
                                />
                            )
                        }
                    ]}
                />
            </Stack>
        </PostSection>
    );
}
