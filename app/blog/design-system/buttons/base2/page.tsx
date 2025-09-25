import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import Link from "@/components/link";
import List from "@/components/list";
import Post from "@/components/post";
import PostBanner from "@/components/post/post.banner";
import PostNavigation from "@/components/post/post.navigation";
import PostSection from "@/components/post/post.section";
import PostSideBar from "@/components/post/sidebar";
import { type Metadata } from "next";

export const metadata: Metadata = { title: 'Buttons · Design System' }

export default function ButtonsBasePage() {
    return (
        <>
            <Post>
                <PostSection id="the-button">
                    <PostBanner
                        title="The Button"
                        subtitle="Building a React Design System Foundation"
                        headingId="the-button-heading"
                        image={{
                            src: '/mountainRangeBanner_1200x400.png'
                        }}
                    />

                </PostSection>
                <PostSection id="what-were-building">
                    <Heading headingLevel={2} id="what-were-building-heading">What We&apos;re Building</Heading>
                    <p>
                        This is the first in a series where we&apos;re building a <span className="italic">comprehensive <span className="bold">Button</span> design system</span>.
                    </p>
                    <p>
                        We&apos;ll create a <FunHighlight>flexible</FunHighlight>, <FunHighlight>accessible</FunHighlight>, and <FunHighlight>composable</FunHighlight> button system in React that serves as the foundation for more complex components like toggles, switches, and button panels.
                    </p>
                    <p>By the end of this post, you&apos;ll have:</p>
                    <List>
                        <li>A type-safe, accessible base button component</li>
                        <li>A reusable hook for handling button interactions</li>
                        <li>CSS styling with built-in accessibility features</li>
                        <li>Multiple button variants (primary, secondary, accent)</li>
                        <li>Comprehensive test coverage</li>
                    </List>
                </PostSection>
                <PostSection id="project-setup">
                    <Heading headingLevel={2} id="project-setup-heading">Project Setup</Heading>

                    <Heading headingLevel={3} id="file-structure">File Structure</Heading>
                    <p>We&apos;ll follow a consistent pattern for organizing our components:</p>

                    <Code lang="md" copyEnabled={false} codeString={`components/
    └── button/
        ├── component.tsx              
        ├── hook.ts
        └── component.type.ts

    tests/                          
    └── components/
        ├── hook.test.tsx
        └── component.test.tsx

    styles/
    └── components/
        └── component.css`} />

                    <Heading headingLevel={3} id="dependencies">Dependencies</Heading>
                    <p>Install these additional packages:</p>
                    <List>
                        <li><Link href="https://www.npmjs.com/package/@remixicon/react">RemixIcons</Link> - Extensive free icon library</li>
                        <li><Link href="https://www.npmjs.com/package/clsx">clsx</Link> - Conditional class name utility</li>
                    </List>
                    <Code codeString={`npm install @remixicon/react clsx`} />

                </PostSection>
                <PostSection id="building-foundation">
                    <Heading headingLevel={2} id="building-foundation-heading">Building the Foundation</Heading>
                    <Heading headingLevel={3} id="starting-simple">Starting Simple</Heading>

                    <Heading headingLevel={3} id="typescript-support">Adding TypeScript Support</Heading>
                </PostSection>

                <PostSection id="essential-features">
                    <Heading headingLevel={2} id="essential-features-heading">Essential Button Features</Heading>
                </PostSection>


                <PostSection id="interaction-logic">
                    <Heading headingLevel={2} id="interaction-logic-heading">Interaction Logic</Heading>
                </PostSection>


                <PostSection id="accessible-styling">
                    <Heading headingLevel={2} id="accessible-styling-heading">CSS Styling</Heading>
                    <Heading headingLevel={3} id="accessibility-ux">Better Accessibility & UX</Heading>
                    <Heading headingLevel={3} id="reset-base-styles">Reset and Base Styles</Heading>
                    <Heading headingLevel={3} id="user-preferences">User Preferences</Heading>
                    <Heading headingLevel={3} id="variants">Adding Variants</Heading>
                </PostSection>

                <PostSection id="testing">
                    <Heading headingLevel={2} id="testing-heading">Testing</Heading>
                </PostSection>

                <PostSection id="what-we-built">
                    <Heading headingLevel={2} id="what-we-built-heading">What We Built</Heading>
                    <p>Our base button component now provides:</p>

                    <p><strong>Accessibility</strong></p>
                    <ul>
                        <li>WCAG AAA compliant target sizes (44x44px minimum)</li>
                        <li>Proper focus management and keyboard navigation</li>
                        <li>Screen reader support with <Code inline codeString="aria-busy" /></li>
                        <li>Respect for user motion preferences</li>
                    </ul>

                    <p><strong>Flexibility</strong></p>
                    <ul>
                        <li>CSS custom properties for easy theming</li>
                        <li>Multiple style variants (filled, outline)</li>
                        <li>Color variants (primary, secondary, accent)</li>
                        <li>Extensible for future component variants</li>
                    </ul>

                    <p><strong>Reliability</strong></p>
                    <ul>
                        <li>Comprehensive error handling</li>
                        <li>Type safety with TypeScript</li>
                        <li>Async operation support</li>
                        <li>Full test coverage</li>
                    </ul>

                    <p><strong>Developer Experience</strong></p>
                    <ul>
                        <li>Clean separation of logic and presentation</li>
                        <li>Reusable custom hook</li>
                        <li>Consistent API across all variants</li>
                    </ul>
                </PostSection>

                <PostSection id="whats-next">
                    <Heading headingLevel={2} id="whats-next-heading">What&apos;s Next</Heading>
                    <p>
                        In the next post, we&apos;ll extend this foundation to create toggle buttons and explore
                        setting up Storybook to document our growing design system.
                    </p>
                    <p>
                        The patterns we&apos;ve established here will serve as the foundation for more complex
                        components like button groups, tab lists, and interactive panels.
                    </p>
                    <PostNavigation 
                    previous={{
                        href: "/blog/design-system/buttons/sliders",
                        title: "Slider Buttons"
                    }}
                    next={{
                        href: "/blog/design-system/buttons/sliders",
                        title: "Slider Buttons"
                    }} />


                </PostSection>

            </Post>
            <PostSideBar
                contents={[
                    { id: 'what-were-building', href: '#what-were-building', label: "What We're Building" },
                    { id: 'project-setup', href: '#project-setup', label: 'Project Setup' },
                    { id: 'building-foundation', href: '#building-foundation', label: 'Building the Foundation' },
                    { id: 'essential-features', href: '#essential-features', label: 'Essential Button Features' },
                    { id: 'interaction-logic', href: '#interaction-logic', label: 'Interaction Logic' },
                    { id: 'accessible-styling', href: '#accessible-styling', label: 'CSS Styling' },
                    { id: 'testing', href: '#testing', label: 'Testing' },
                    { id: 'what-we-built', href: '#what-we-built', label: 'What We Built' },
                    { id: 'whats-next', href: '#whats-next', label: "What's Next" }
                ]}
            />

        </>
    )
}