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
            <Stack gap={"lg"}>
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
                    <li className="flow-md">
                        <span className="block bold">Fluid typography</span>
                        <List as="ul" marker="circle">
                            <li>
                                <strong className="fun-underline">The minimum value must be set in rem</strong>, not px. If someone increases their default font size, px values won't scale with it. rem values will.
                            </li>
                            <li className="flow-md">
                                <p>
                                    <strong>Fluid typography can cause sites to fail WCAG</strong> SC 1.4.4 which requires that the type can be scaled upwards of 200% when zoomed in.
                                </p>
                                <p>
                                    See <Link href="https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/">Addressing Accessibility Concerns With Using Fluid Type — Maxwell Barvian</Link> for a thorough treatment of the issue.
                                </p>
                            </li>
                        </List>

                    </li>
                    <li className="flow-md">
                        <p>
                            <strong>T-shirt size naming over numeric values.</strong>{" "}
                            This system uses t-shirt sizing (sm, md, lg) so token names and utility classes share the same language ( <InlineCode codeString=".gap-lg" lang="css" /> and <InlineCode codeString="--spacing-lg" lang="css" /> are clearly the same step in that scale. ).
                        </p>
                        <p>
                            Whichever convention you choose, commit to it early — mixing naming systems creates exactly the inconsistency tokens are meant to prevent.
                        </p>
                    </li>
                </List>
            </Stack>
            <Stack>
                <AnchorHeading as="h3" headingSize={4} id="resources-further-reading">Further Reading</AnchorHeading>
                <Stack>
                    <AnchorHeading as="h4" headingSize={5} id="resources-spacing-layout">Spacing &amp; Layout</AnchorHeading>
                    <List as="ul" spacing="loose" marker="circle">
                        <li>
                            <Link href="https://every-layout.dev/">Every Layout - Heydon Pickering & Andy Bell</Link> — excellent treatment of spacing as a system concern.
                        </li>
                        <li>
                            <Link href="https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62">Space in Design Systems — Nathan Curtis</Link> — a deep exploration of spacing concepts including inset, stack, and inline.
                        </li>
                        <li>
                            <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">MDN: CSS Custom Properties</Link>
                        </li>
                    </List>
                </Stack>
                <Stack>
                    <AnchorHeading as="h4" headingSize={5} id="resources-typography">Typography</AnchorHeading>
                    <List as="ul" spacing="loose" marker="circle">
                        <li>
                            <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp">MDN: clamp()</Link> — the function that powers fluid type
                        </li>
                        <li>
                            <Link href="https://utopia.fyi/">Utopia — Trys Mudford & James Gilyead</Link> — a tool for generating fluid type and space scales
                        </li>
                        <li>
                            <Link href="https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/">Addressing Accessibility Concerns With Using Fluid Type — Maxwell Barvian</Link> — a thorough look at how <InlineCode codeString="clamp()" lang="css" /> and viewport units interact with WCAG SC 1.4.4
                        </li>
                        <li>
                            <Link href="https://www.w3.org/WAI/WCAG21/quickref/">WCAG 2.1 Quick Reference guide</Link> — a concise overview of success criteria
                        </li>
                    </List>
                </Stack>
                <Stack>
                    <AnchorHeading as="h4" headingSize={5} id="resources-css-reset">CSS Reset</AnchorHeading>
                    <p>
                        The global baseline defined in this post assumes browser defaults have already been normalised. Without a reset, default browser styles for <span className="italic">margins</span>, <span className="italic">padding</span>, and <span className="italic">font rendering</span> will interfere with the token layer.
                    </p>
                    <List as="ul">
                        <li>
                            <Link href="https://piccalil.li/blog/a-more-modern-css-reset/">Andy Bell's modern reset</Link> — a great starting point for any app
                        </li>
                        <li>
                            <Link href="https://www.joshwcomeau.com/css/custom-css-reset/">Josh Comeau's CSS reset</Link> — goes in depth with clear explanations for each rule
                        </li>
                    </List>
                </Stack>
                <AnchorHeading as="h4" headingSize={5} id="resources-breakpoints">Breakpoints</AnchorHeading>
                <List as="ul" spacing="loose" marker="circle">
                    <li>
                        <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries">MDN: Using media queries</Link>
                    </li>
                    <li>
                        <Link href="https://every-layout.dev/layouts/switcher/">Every Layout: The Switcher</Link> — an alternative to breakpoint-based layout switching
                    </li>
                    <li>
                        <Link href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/layout/wrapper.css">codercarl.dev layout wrapper</Link> — a real-world example combining breakpoint tokens, <InlineCode codeString="clamp()" lang="css" />, and named grid lines
                    </li>
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
    --spacing-sm:  0.5rem;   /*  8px */
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
    --font-size-xxl:  clamp(1.4rem,   1rem    + 1vw,     1.875rem);
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
