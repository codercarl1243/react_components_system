import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Icon from "@/components/icon";
import Figure from "@/components/image/figure";
import Picture from "@/components/image/picture";
import TextWithImage from "@/components/image/textWithImage";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { RiContrastLine, RiKeyboardLine, RiBrainLine, RiShieldCheckLine } from "@remixicon/react";
import Link from "@/components/link";
import InlineCode from "@/components/code/inlineCode";

export default function Section6() {

    return (
        <PostSection id="accessibility">
            <AnchorHeading id="accessibility-heading" headingLevel={2}>Accessibility Requirements</AnchorHeading>
            <div className="flow-4">
                <AnchorHeading headingLevel={3}>WCAG principles in practice</AnchorHeading>
                <Picture
                    sources={[{ media: '(max-width: 560px)', srcSet: '/images/pour_circles_grid_600x600.webp' }]}
                    src="/images/pour_circles.webp"
                    alt="Four WCAG principles: Perceivable, Operable, Understandable, and Robust, each represented by an icon in a blue circle"
                />
                <p>Our Button component addresses key accessibility requirements across all four WCAG principles:</p>
                <List variant="none" spacing="loose">
                    <li>
                        <p>
                            <span className="bold"><Icon icon={RiContrastLine} /> Perceivable:</span> Sufficient contrast (4.5:1) and readable text at 200% zoom.
                        </p>
                        <p className="italic text-sm neutral-600">WCAG: 1.4.3, 1.4.11, 1.4.1, 1.4.4</p>
                    </li>
                    <li>
                        <p>
                            <span className="bold"><Icon icon={RiKeyboardLine} /> Operable:</span> Fully keyboard accessible with clear focus states and appropriate target sizes.
                        </p>
                        <p className="italic text-sm neutral-600">WCAG: 2.1.1, 2.4.7, 2.5.5</p>
                    </li>
                    <li>
                        <p>
                            <span className="bold"><Icon icon={RiBrainLine} /> Understandable:</span> Descriptive labels and predictable button behavior.
                        </p>
                        <p className="italic text-sm neutral-600">WCAG: 3.3.2, 3.2.2</p>
                    </li>
                    <li>
                        <p>
                            <span className="bold"><Icon icon={RiShieldCheckLine} /> Robust:</span> Proper semantic HTML and ARIA support for assistive technologies.
                        </p>
                        <p className="italic text-sm neutral-600">WCAG: 4.1.2, 4.1.3</p>
                    </li>
                </List>
                <PostNote>
                    For a complete reference of these criteria, see the <Link href="https://www.w3.org/WAI/WCAG21/quickref/">WCAG 2.1 Quick Reference</Link>.
                </PostNote>
            </div>


            <div className="flow-4">
                <AnchorHeading headingLevel={3}>Designing beyond WCAG</AnchorHeading>
                <p>
                    WCAG&apos;s four principles give us the foundation, but meeting the minimum isn&apos;t the goal. As developers, our job is to design buttons that feel <span className="fun-underline">consistent</span>, <span className="fun-underline">predictable</span>, and <span className="fun-underline">inclusive</span> in real-world situations.
                </p>
                <List variant="circle" spacing="loose">
                    <li>

                        <p>
                            <span className="bold">Margin and Spacing:</span> WCAG addresses target size but does not specifically require spacing between targets.
                        </p>
                        <Figure
                            src="/images/button_margin_spacing_example.webp"
                            alt="Two sets of buttons: on the left, cramped buttons placed too close together; on the right, the same buttons with clear spacing between them, showing comfortable, accessible tap targets."
                            caption="Comparison of cramped and comfortably spaced buttons. Adequate spacing reduces accidental taps and improves usability for all users, especially those with motor impairments."
                            width={560}
                            height={165}
                            style={{ aspectRatio: "3.4", marginInline: "auto" }}
                        />
                        <p>
                            Users with motor disabilities — whether permanent or situational — benefit from space between interactive elements. Proper spacing reduces accidental taps and improves comfort on both desktop and touch devices.
                        </p>
                    </li>
                    <li>
                        <span className="bold">Disabled and loading states:</span> WCAG's contrast requirements have an exception for disabled elements. But disabled buttons should still contrast enough that the intended purpose remains clear.
                    </li>
                    <li>
                        <p>
                            <span className="bold">The aria-disabled decision:</span> We use <InlineCode codeString="aria-disabled" /> instead of the native <InlineCode codeString="disabled" /> attribute.
                        </p>
                        <p>This ensures that the button remains in the accessibility tree, preserves discoverability, and maintains tab order.</p>
                    </li>
                    <li className="flow-4">
                        <p>
                            <span className="bold">Stable sizing:</span> We enforce minimum sizes with WCAG AAA compliance in mind:
                        </p>
                        <Code lang="css" codeString={`min-width: 44px;
min-height: 44px;`} copyEnabled={false} />
                        <TextWithImage
                            src={'/images/button_ss.webp'}
                            alt="Button component showing the position of an icon and spinner"
                            width={300}
                            height={125}
                        >
                            <p>We also ensure button dimensions remain stable during state changes, preventing layout shifts that can disorient users. This is achieved through CSS Grid and deliberately reserved columns.</p>
                        </TextWithImage>
                        <p>
                            The grid layout prevents visual shifts when icons or spinners appear. That consistency helps users with cognitive disabilities stay oriented and reduces accidental clicks on moving targets.
                        </p>
                    </li>

                </List>
                <PostNote>
                    <p><span className="bold">Why <InlineCode codeString="aria-disabled" /> instead of <InlineCode codeString="disabled" />?</span></p>
                    <List variant="none">
                        <li><InlineCode codeString="disabled" /> removes the element from the accessibility tree and tab order.</li>
                        <li><InlineCode codeString="aria-disabled" /> keeps the button focusable, ensuring it remains discoverable.</li>
                    </List>
                    <p>
                        We pair this with click prevention in JavaScript — stopping propagation and default behavior to simulate a <span className="italic">“true”</span> disabled button while staying accessible.
                    </p>
                </PostNote>
            </div>


            <div className="flow-4">
                <AnchorHeading headingLevel={4}>Assistive Technology isn&apos;t everything</AnchorHeading>
                <p>Screen readers and other assistive tech is definitely powerful and does level the field to some degree, but they don't solve all problems:</p>
                {/* add icons to these dot points */}
                <List variant="circle" spacing="tight">
                    <li>Not all users with disabilities use screen readers</li>
                    <li>Visual feedback is critical for many users</li>
                    <li>Users benefit from predictable, stable UIs</li>
                </List>

                <p>Our button addresses these concerns as much as possible, we ensure:</p>
                {/* UPDATE for tick marks */}
                <List variant="circle" spacing="tight">
                    <li>Semantic HTML and ARIA for screen readers</li>
                    <li>Visual state changes for sighted users</li>
                    <li>Stable layouts for cognitive accessibility</li>
                    <li>Large targets and spacing for motor accessibility</li>
                </List>
            </div>


            <div className="flow-4">
                <AnchorHeading headingLevel={4}>Further Reading</AnchorHeading>
                <p>For a dive into accessible button patterns:</p>
                <List variant="none" spacing="tight">
                    <li><Link href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role">MDN: Button Accessibility</Link></li>
                    <li><Link href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">W3C ARIA Authoring Practices: Button</Link></li>
                    <li><Link href="https://adrianroselli.com/2021/01/multi-function-button.html">Adrian Roselli: Multi-Function Button</Link> - an in-depth article on creating a button with multiple states. This uses plain HTML, JS, & CSS.
                    </li>
                    <li><Link href="https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/">Kitty Giraudel: a comparison of aria-disabled and disabled</Link> - how the use of either is not explicitly wrong.</li>
                </List>
                <p className="bold">Design Systems: Buttons</p>
                <List  variant="none" spacing="tight">
                    <li><Link href="https://m3.material.io/components/buttons/overview">Material Design</Link></li>
                    <li><Link href="https://developer.apple.com/design/human-interface-guidelines/buttons">Apple Human Interface Guidelines</Link></li>
                    <li><Link href="https://atlassian.design/components/button/examples">Atlassian</Link></li>
                    <li><Link href="https://storybook.designsystemet.no/?path=/docs/komponenter-button--docs">Designsystemet</Link></li>
                    <li><Link href="https://design-system.agriculture.gov.au/components/button/accessibility">Department of Agriculture (Australia)</Link></li>
                </List>
                <PostNote>
                    <p>
                        In these linked design systems You will see many different ways to try and include as many users as possible.
                    </p>
                    <p>
                        No one solution is perfect, but these systems are designed to ensure that any users on their websites have a consistent experience across their respective applications.
                    </p>
                </PostNote>
            </div>
        </PostSection>
    )
}