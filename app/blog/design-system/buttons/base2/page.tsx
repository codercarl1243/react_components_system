import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import Link from "@/components/link";
import List from "@/components/list";
import Post from "@/components/post";
import PostBanner from "@/components/post/post.banner";
import PostNavigation from "@/components/post/navigation";
import PostSection from "@/components/post/post.section";
import PostSideBar from "@/components/post/sidebar";
import { type Metadata } from "next";
import { RiAccessibilityLine, RiBrainLine, RiContrastLine, RiErrorWarningLine, RiFlaskLine, RiKeyboardLine, RiShieldCheckLine } from "@remixicon/react";
import PostNote from "@/components/post/post.note";
import TabList from "@/components/tablist";
import Icon from "@/components/icon";
import { getRelatedPosts } from "@/lib/blogPosts";
import AnchorHeading from "@/components/heading/anchorHeading";
import Figure from "@/components/image/figure";
import TextWithImage from "@/components/textWithImage";

export const metadata: Metadata = { title: 'Buttons · Design System' }

export default function ButtonsBasePage() {
    const relatedPosts = getRelatedPosts('design__button__01');

    return (
        <>
            <Post>
                <PostSection id="button-foundations">
                    <PostBanner
                        title="The Button"
                        subtitle="Building a React Design System Foundation"
                        headingId="the-button-heading"
                        image={{
                            src: '/images/mountainRangeBanner_1200x400.png'
                        }}
                    />
                    <Heading headingLevel={2} id="foundation-heading">Laying the Foundation</Heading>
                    <p>
                        Buttons are the most re-used components in any interface — and the easiest to get wrong.
                        In this first post of the design system series, we&apos;re building a button that balances <FunHighlight>functionality</FunHighlight>, <FunHighlight>accessibility</FunHighlight>, and <FunHighlight>developer trust</FunHighlight>.
                    </p>
                    <p>
                        This isn&apos;t just another styled button. It&apos;s a <FunHighlight>system</FunHighlight> — one that scales gracefully, communicates state clearly, and behaves predictably under real-world conditions. Built in React, this component forms the foundation for more advanced elements like toggles, switches, and interactive panels.
                    </p>

                    <p>By the end of this post, you&apos;ll understand how to design a button system that is:</p>
                    <List>
                        <li>Type-safe and accessible by default</li>
                        <li>Backed by a reusable hook for interaction logic</li>
                        <li>Styled with built-in accessibility and state awareness</li>
                        <li>Fully tested to ensure reliability</li>
                    </List>
                </PostSection>
                <PostSection id="project-setup">
                    <AnchorHeading headingLevel={2} id="project-setup-heading">Project Setup</AnchorHeading>

                    <AnchorHeading headingLevel={3} id="file-structure">File Structure</AnchorHeading>
                    <p>
                        A well-defined folder structure makes components easier to reason about and maintain.
                        For our Button, we&apos;ll follow a consistent pattern that keeps logic, types, and styles clearly separated:
                    </p>

                    <Code lang="md" copyEnabled={false} codeString={`components/
    └── button/
        ├── button.tsx              
        ├── useButton.ts
        └── button.type.ts

    tests/                          
    └── components/
        ├── useButton.test.tsx
        └── Button.test.tsx

    styles/
    └── components/
        └── button.css`} />
                    <p>
                        This structure encourages <FunHighlight>encapsulation</FunHighlight> — everything related to a component lives together —
                        while maintaining a clean boundary between <span className="italic">presentation</span>, <span className="italic">logic</span>, and <span className="italic">types</span>.
                        It also makes testing and refactoring predictable as your design system grows.
                    </p>

                    <AnchorHeading headingLevel={3} id="dependencies">Dependencies</AnchorHeading>
                    <p> We&apos;ll use a couple of small, focused packages to support the component:</p>
                    <List variant="none" spacing="tight">
                        <li><Link className="bold" href="https://www.npmjs.com/package/@remixicon/react">RemixIcons</Link> for an extensive and free icon library</li>
                        <li><Link className="bold" href="https://www.npmjs.com/package/clsx">CLSX</Link> for clean, conditional class name handling</li>
                    </List>
                    <Code lang="bash" codeString={`npm install @remixicon/react clsx`} />
                    <PostNote className="italic">
                        <p>We&apos;ll also use<Link className="bold" href="https://jestjs.io/docs/getting-started">Jest</Link> later in this post to run tests and verify behavior.</p>
                    </PostNote>

                </PostSection>

                <PostSection id="building-foundation">
                    <AnchorHeading headingLevel={2} id="building-foundation-heading">
                        Building the Foundation
                    </AnchorHeading>
                    <AnchorHeading headingLevel={3} id="starting-simple">
                        Starting Simple: The Component
                    </AnchorHeading>
                    <p>Every design system needs a reliable base component to build from. </p>

                    <p>
                        The goal here isn&apos;t to design every possible button — it&apos;s to define a solid foundation that future variants can build on without rewriting the essentials.
                    </p>

                    <List variant="circle" spacing="normal">
                        <li>Manages synchronous and asynchronous click events</li>
                        <li>Communicates loading and disabled states</li>
                        <li>Preserves accessibility and focus behavior</li>
                        <li>Forwards refs safely</li>
                        <li>Prevents unintended interaction during inactive states</li>
                    </List>

                    <PostNote>
                        <p>
                            Button behavior is handled through a dedicated <Code codeString="useButton" inline copyEnabled={false} /> hook.
                            This keeps our component lean and allows logic to be reused across other interactive elements like toggles or switches.
                        </p>
                    </PostNote>
                    <p className="bold">Here&apos;s our base implementation:</p>
                    <Code codeString={`'use client'

import clsx from 'clsx'
import { BaseButtonProps, MouseEventType } from '@/components/button/button.type'
import useButton from '@/components/button/useButton'
import Spinner from '@/components/spinner'
import Icon from '@/components/icon'

export default function Button({
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  icon,
  className,
  children,
  ref,
  ...props
}: BaseButtonProps) {
  const { handleClick } = useButton()

  function onClickHandler(event: MouseEventType) {
    if (isLoading || disabled) {
      event.stopPropagation()
      event.preventDefault()
      return
    }
    void handleClick(onClick)(event)
  }

  return (
    <button
      {...props}
      className={clsx(className, { 'button-w-icon': icon }, 'button')}
      onClick={onClickHandler}
      aria-disabled={isLoading || disabled}
      data-loading={isLoading}
      ref={ref}
      type={type}
      data-testid="base-button"
    >
      {icon && <Icon icon={icon} />}
      <span className="button__content">{children}</span>
      {isLoading && <Spinner />}
    </button>
  )
}`} />
                    <AnchorHeading headingLevel={4}>Key Decisions</AnchorHeading>
                    <List variant="circle" spacing="normal">
                        <li>
                            <Code codeString={`clsx(className, 'button')`} inline copyEnabled={false} /> - Combines user-provided
                            classes with our base class for flexible, predictable styling.
                        </li>
                        <li>
                            <Code codeString={`isLoading || disabled`} inline copyEnabled={false} /> - Prevents clicks and ensures
                            consistent state management.
                        </li>
                        <li>
                            <Code codeString="event.preventDefault()" inline copyEnabled={false} /> and <Code codeString="event.stopPropagation()" inline copyEnabled={false} /> — Block interaction entirely when the button is inactive, maintaining UX consistency.
                        </li>
                        <li>
                            <p>
                                <Code codeString={`ref`} inline copyEnabled={false} /> - React 19 allows refs to be passed as regular props without <Code codeString={`forwardRef`} inline copyEnabled={false} />
                            </p>
                            <p className="italic text-sm neutral-600">
                                See: <Link href="https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop">React 19 release notes</Link>
                            </p>
                        </li>
                        <li>
                            <Code codeString={`data-loading`} inline copyEnabled={false} /> - Provides a hook for styling and animation control.
                        </li>
                        <li>
                            <Code codeString={`aria-disabled`} inline copyEnabled={false} /> - Keeps the button in the accessibility
                            tree and maintains keyboard discoverability. We'll explain this more indepth in the accessibility section.
                        </li>
                    </List>

                    <AnchorHeading headingLevel={3} id="typescript-support">
                        Adding TypeScript Support
                    </AnchorHeading>
                    <p>
                        TypeScript helps ensure our component remains predictable and extensible. The type definitions below create a contract between the UI and its behavior — protecting both consumers and contributors.
                    </p>
                    <List variant="circle" spacing="normal">
                        <li>Support both synchronous and asynchronous click handlers</li>
                        <li>Extends native button props safely</li>
                        <li>Allow custom data attributes for styling</li>
                        <li>Properly types mouse events</li>
                    </List>
                    <Code codeString={`import type { ComponentPropsWithRef, MouseEvent } from 'react'
import { IconProps } from '@/components/icon/icon.type';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler = (event: MouseEventType) => void | Promise<void>;

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    icon?: IconProps['icon'];
    'data-style'?: 'outlined' | 'filled';
    'data-variant'?: 'primary' | 'secondary' | 'accent';
    onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>;`} />
                    <AnchorHeading headingLevel={4}>
                        Types Breakdown
                    </AnchorHeading>
                    <List variant="circle" spacing="normal">
                        <li>
                            <Code codeString={`MouseEventType`} inline copyEnabled={false} /> -  Alias for cleaner references throughout the component.
                        </li>
                        <li>
                            <Code codeString={`ButtonClickHandler`} inline copyEnabled={false} /> - This type further communicates that we are not returning anything which is consistent with React patterns.
                        </li>
                        <li>
                            <Code codeString={`Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>`} inline copyEnabled={false} /> - Inherits all native button props (e.g. <Code inline copyEnabled={false} codeString="className" /> and <Code inline copyEnabled={false} codeString="aria-*" />) while replacing <Code codeString="onClick" inline copyEnabled={false} />, and <Code codeString="disabled" inline copyEnabled={false} /> with our typed versions.
                        </li>
                    </List>
                </PostSection>

                <PostSection id="interaction-logic">
                    {/* GENERATE IMAGE FOR HERE */}
                    <AnchorHeading headingLevel={2} id="interaction-logic-heading">Interaction Logic</AnchorHeading>
                    <p>Our button needs to handle both <span className="fun-underline">synchronous</span> and <span className="fun-underline">asynchronous</span> click handlers gracefully.</p>
                    <p> We extract this logic into a custom hook for several reasons:</p>
                    <List>
                        {/* <li>Reusability - Other components (like <Link>toggle buttons</Link>) will need the same logic</li> */}
                        <li><span className="bold">Reusability</span> - Other components (like toggle buttons) will need the same logic</li>
                        <li><span className="bold">Testability</span> - Isolated logic is easier to test</li>
                        <li><span className="bold">Separation of concerns</span> - Component handles rendering, hook handles behavior</li>
                        <li><span className="bold">Error handling</span> - Centralized error logging for debugging</li>
                    </List>
                    <p className="bold">The hook needs to:</p>
                    <List ordered>
                        <li>Accept any click handler (sync or async)</li>
                        <li>Catch and log errors without breaking the UI</li>
                        <li>Handle promise rejections properly</li>
                        <li>Return the result for testing purposes</li>
                    </List>
                    <p>Here's the complete implementation:</p>
                    <Code codeString={`import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';
import log from '@/lib/Logging';

export default function useButton() {
    const handleClick = (userHandler?: ButtonClickHandler) =>
        (event: MouseEventType) => {
            if (!userHandler) return

            try {
            const result = userHandler(event)

            // Log all button clicks for analytics/debugging
            if (process.env.NODE_ENV !== 'production') {
               // Add your custom logging solution here
            }
            if (isThenable(result)) {
                /**
                 * Attach error logging to unhandled promise rejections.
                 * Uses void to indicate we're intentionally not awaiting this promise.
                 * 
                 * Note: This only catches rejections that the user handler did NOT catch.
                 * If the user handler has its own try/catch, this won't fire or do anything.
                 */
                void Promise.resolve(result).catch((err) => {
                    // Add your custom logging solution here
                })
            }
            } catch (err) {
            /**
             * Catch synchronous errors thrown during handler execution.
             * Log the error for debugging, then re-throw so the error still
             * propagates (breaks execution, shows in console, etc.)
             */
            // Add your custom logging solution here
            throw err
            }
        }

    return { handleClick }
}`} />
                    <PostNote>
                        The hook uses a utility function <Code codeString="isThenable" inline copyEnabled={false} /> to check if the result is a Promise-like object. This ensures we handle both native Promises and custom thenables correctly.

                        <Code codeString="function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  )
}"/>
                    </PostNote>
                    <AnchorHeading headingLevel={3}>Why this approach</AnchorHeading>
                    <List variant="circle" spacing="loose">
                        <li>
                            <p>
                                <span className="bold">Curried function</span> - <Code codeString="handleClick(onClick)(event)" inline copyEnabled={false} /> allows us to configure the handler once and reuse it.</p>
                        </li>
                        <li>
                            <p>
                                <span className="bold">Duck typing for Promises</span> - We use a helper function that checks for a <Code codeString=".then" inline copyEnabled={false} /> method rather than using <Code codeString="instanceof Promise" inline copyEnabled={false} /> because the handler might return a <span className="italic">Promise-like</span> object.
                            </p>
                            <p>
                                This is a little bit more verbose and not as pretty but 2 extra lines ensures we don&apos;t miss the edges.

                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="bold">The <Code codeString="void" inline copyEnabled={false} /> operator</span> - Signals we're intentionally not awaiting the Promise (prevents ESLint "floating promise" warnings).
                            </p>
                            <p>
                                We use <Code codeString="Promise.resolve().catch()" inline copyEnabled={false} /> to log unhandled rejections. If the user's handler already has error handling, our logging never runs.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="bold">Centralized logging</span> - Errors are logged consistently across all buttons. This is one of the main reasons we extract this logic into a hook rather than handling it in each component.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="bold">Re-throw synchronous errors</span> - By re-throwing with <Code inline codeString="throw err" copyEnabled={false} />, we allow React error boundaries to catch and handle errors. This prevents the UI from breaking silently.
                                <span className="bold">Async errors</span> are logged but not re-thrown since this occurs <FunHighlight>after the promise rejects.</FunHighlight>
                            </p>
                        </li>
                    </List>
                    <PostNote>
                        <p>
                            <span className="bold">Why doesn't the hook await?</span> We use a fire-and-forget pattern with <Code codeString="void Promise.resolve().catch()" inline copyEnabled={false} /> to log unhandled errors without forcing the button handler to be async.
                        </p>
                        <p>
                            This keeps the component API simple while ensuring errors don't disappear silently. The Promise continues executing, but we've attached logging to catch any rejections that weren't already handled.
                        </p>
                        <Figure
                            alt={"Button error handling flow diagram"}
                            src={'/images/handleClick_flow.png'}
                            caption={
                                <>
                                    The onClick handler ensures that we log both synchronous errors <span className="bold italic">(caught and re-thrown immediately)</span> and asynchronous errors <span className="bold italic">(logged via attached <Code codeString=".catch()" copyEnabled={false} inline /> handler when Promise rejects later)</span>.
                                </>}
                        />
                    </PostNote>

                </PostSection>
                <PostSection id="essential-features">
                    {/* IMAGE IDEA: Illustration of a button with spinner + disabled state side-by-side */}
                    <AnchorHeading id="essential-features-heading" headingLevel={2}>
                        Essential Features
                    </AnchorHeading>
                    <AnchorHeading headingLevel={3}>
                        Loading States
                    </AnchorHeading>
                    <p>Buttons often trigger asynchronous actions — saving data, submitting forms, or making API calls. A good design system must <FunHighlight>communicate progress clearly</FunHighlight> to the user while preventing accidental re-triggers.</p>
                    <p className="bold">Our implementation is simple and composable:</p>
                    <Code codeString="{isLoading && <Spinner />}" copyEnabled={false} />
                    <p> The <Code codeString="Spinner" inline copyEnabled={false} /> appears alongside the button label without shifting layout, maintaining predictable spacing. We also expose a <Code codeString="data-loading" inline copyEnabled={false} /> attribute so CSS can respond directly to loading state:</p>
                    <Code
                        lang="css"
                        copyEnabled={false}
                        codeString={`&[data-loading="true"] {
  position: relative;
  cursor: wait;
}`} />
                    <PostNote>
                        <p>
                            Using <Code codeString="cursor: wait" inline copyEnabled={false} /> gives users instant feedback while
                            asynchronous work completes. This small visual cue prevents unnecessary frustration.
                        </p>
                    </PostNote>
                    <AnchorHeading headingLevel={3}>Preventing Duplicate Actions</AnchorHeading>
                    {/* IMAGE IDEA: Diagram showing click blocked by disabled/loading branch */}
                    <p>Async operations can take time, and users often click again if nothing happens immediately. Our button prevents duplicate submissions with a combination of logic and semantics:</p>
                    <List ordered>
                        <li>
                            Checking <Code codeString="isLoading || disabled" copyEnabled={false} inline /> before executing the handler
                        </li>
                        <li>
                            Stopping events in their tracks with <Code codeString="event.preventDefault()" copyEnabled={false} inline /> and <Code codeString="event.stopPropagation()" copyEnabled={false} inline />. <span className="italic">A disabled button should not trigger any action.</span>
                        </li>
                        <li>
                            Applying <Code lang="css" codeString="cursor: wait" copyEnabled={false} inline /> for visual feedback
                        </li>
                        <li>
                            Using <Code codeString="aria-disabled" copyEnabled={false} inline /> to communicate the state to assistive technology
                        </li>
                    </List>


                    <AnchorHeading headingLevel={3}>Integration with Forms</AnchorHeading>
                    <p>
                        By default, our button sets <Code codeString={`type="button"`} copyEnabled={false} inline />. This follows best practices and avoids accidental form submissions when multiple buttons exist.
                    </p>
                    <p className="bold">This default type ensures that we:</p>
                    <List>
                        <li>Prevent unintentional form submissions</li>
                        <li>Force developers to explicitly opt-in to submit behavior</li>
                        <li>Reduce side effects in complex form layouts</li>
                    </List>
                    <p>
                        When you need to submit a form, simply opt in explicitly:
                    </p>

                    <Code
                        copyEnabled={false}
                        codeString={`<Button type="submit" onClick={handleSubmit}>
  Save Changes
</Button>`}
                    />
                </PostSection>




                <PostSection id="accessibility">
                    <AnchorHeading id="accessibility-heading" headingLevel={2}>Accessibility Requirements</AnchorHeading>
                    <AnchorHeading headingLevel={3}>WCAG principles in practice</AnchorHeading>
                    {/* GENERATE IMAGE FOR HERE */}
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
                            <p className="italic text-sm neutral-600">WCAG: 2.1.1, 2.4.7, 2.5.5, 2.5.3</p>
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


                    <AnchorHeading headingLevel={3}>Designing beyond WCAG</AnchorHeading>
                    <p>WCAG is a great starting point, but it&apos;s not the finish line.</p>
                    {/* GENERATE IMAGE FOR HERE */}
                    <p>As developers, our role is to make accessibility practical by designing buttons that feel consistent, predictable, and inclusive for everyone:</p>
                    <List variant="none" spacing="normal">
                        <li>
                            <p>
                                <span className="bold">Margin and Spacing:</span> WCAG addresses target size but does not specifically require spacing between targets.
                            </p>
                            <p>
                                Users with motor disabilities (permanent or situationally temporary) benefit from space between interactive elements.
                            </p>
                        </li>
                        <li>
                            <span className="bold">Disabled and loading states:</span> WCAG's contrast requirements have an exception for disabled elements. But disabled buttons should still contrast enough that the intended purpose remains clear.
                        </li>
                        <li>
                            <p>
                                <span className="bold">The aria-disabled decision:</span> We use <Code codeString="aria-disabled" inline copyEnabled={false} /> instead of the native <Code codeString="disabled" inline copyEnabled={false} /> attribute.
                            </p>
                            <p>This ensures that the button <span className="fun-underline">remains in the accessibility tree</span>, <span className="fun-underline">preserves discoverability</span>, and <span className="fun-underline">maintains tab order</span>.</p>
                        </li>
                        <li className="flow-4">
                            <p>
                                <span className="bold">Stable sizing:</span> We enforce minimum sizes with WCAG AAA compliance in mind:
                            </p>
                            <Code lang="css" codeString={`min-width: 44px;
min-height: 44px;`} copyEnabled={false} />
                            <TextWithImage imageSrc={'/images/button_ss.png'} imageAlt="Button component showing the position of an icon and spinner">
                                <p>We also ensure button dimensions remain stable during state changes, preventing layout shifts that can disorient users. This is achieved through CSS Grid and deliberately reserved columns.</p>
                            </TextWithImage>
                            <p>
                                The grid layout prevents visual shifts when icons or spinners appear. That consistency helps users with cognitive disabilities stay oriented and reduces accidental clicks on moving targets.
                            </p>
                        </li>

                    </List>
                    <PostNote>
                        <p><span className="bold">Why <Code inline codeString="aria-disabled" copyEnabled={false} /> instead of <Code inline codeString="disabled" copyEnabled={false} />?</span></p>
                        <List>
                            <li><Code inline codeString="disabled" copyEnabled={false} /> removes the element from the accessibility tree and tab order.</li>
                            <li><Code inline codeString="aria-disabled" copyEnabled={false} /> keeps the button focusable, ensuring it remains discoverable.</li>
                        </List>
                        <p>
                            We pair this with click prevention in JavaScript — stopping propagation and default behavior to simulate a <span className="italic">“true”</span> disabled button while staying accessible.
                        </p>
                    </PostNote>

                    <AnchorHeading headingLevel={4}>Assistive Technology isn&apos;t everything</AnchorHeading>
                    <p>Screen readers and other assistive tech is definitely powerful and does level the field to some degree, but they don't solve all problems:</p>
                    {/* add icons to these dot points */}
                    <List>
                        <li>Not all users with disabilities use screen readers</li>
                        <li>Visual feedback is critical for many users</li>
                        <li>Users with cognitive disabilities benefit from predictable, stable UIs</li>
                        <li>Users with Motor disabilities benefit from well-spaced, consistently-sized targets</li>
                    </List>

                    <p>Our button addresses these concerns as much as possible, we ensure:</p>
                    {/* UPDATE for tick marks */}
                    <List>
                        <li>Semantic HTML and ARIA for screen readers</li>
                        <li>Visual state changes for sighted users</li>
                        <li>Stable layouts for cognitive accessibility</li>
                        <li>Large targets and spacing for motor accessibility</li>
                    </List>


                    <AnchorHeading headingLevel={4}>Further Reading</AnchorHeading>
                    <p>For a dive into accessible button patterns:</p>
                    <List>
                        <li><Link href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role">MDN: Button Accessibility</Link></li>
                        <li><Link href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">W3C ARIA Authoring Practices: Button</Link></li>
                        <li><Link href="https://adrianroselli.com/2021/01/multi-function-button.html">Adrian Roselli: Multi-Function Button</Link>
                            <div>
                                in depth article on creating a button with multiple states. This uses plain HTML, JS, & CSS.
                            </div>
                        </li>
                        <li><Link href="https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/">Kitty Giraudel: a comparison of aria-disabled and disabled</Link> and how the use of either is not explicitly wrong</li>
                    </List>
                    <p className="bold">Design Systems: Buttons</p>
                    <List>
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
                </PostSection>


                <PostSection id="css-styling">
                    <AnchorHeading headingLevel={2} id="css-styling-heading">CSS Styling</AnchorHeading>
                    <p>
                        Our CSS isn&apos;t just decorative — it enforces <FunHighlight>layout stability</FunHighlight>, <FunHighlight>WCAG compliance</FunHighlight>, and <FunHighlight>customizability</FunHighlight>.
                        We&apos;ll look at three layers: resets, custom properties, and variants.
                    </p>
                    <AnchorHeading headingLevel={3} id="css-reset-base-styles">Reset and Base Styles</AnchorHeading>
                    <p>
                        We start by resetting browser defaults for consistent cross-browser rendering, then re-apply
                        only what we need: borders, outline, and box model. This gives us a neutral baseline for theming.
                    </p>
                    <Code lang="css" codeString={`.button {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border: var(--border-thin);
  border-radius: var(--radius-md);
  outline: 0;
}`} copyEnabled={false} />
                    <AnchorHeading headingLevel={3} id="css-custom-properties">Custom Properties for Theming</AnchorHeading>
                    <p>
                        The button uses CSS custom properties instead of hardcoded values, allowing design tokens
                        and color variants to cascade naturally through your design system.
                    </p>

                    <Code lang="css" codeString={`.button[data-variant="primary"] {
  --button-secondary-color: var(--color-primary-400);
  --button-accent-color: var(--color-primary-600);
}`} copyEnabled={false} />
                    <AnchorHeading headingLevel={3} id="css-button-states">Button States</AnchorHeading>
                    <AnchorHeading headingLevel={4} id="css-interactions">Interaction states</AnchorHeading>
                    <p>
                        <Code inline copyEnabled={false} codeString=":hover" />, <Code inline copyEnabled={false} codeString=":focus" />, and <Code inline copyEnabled={false} codeString=":active" /> states communicate affordance. We use outline and subtle transforms <span className="fun-underline">instead of color alone</span> — ensuring <span className="bold">contrast</span> and <span className="bold">motion</span> respect user preferences.
                    </p>
                    <AnchorHeading headingLevel={4} id="css-disabled">Disabled & Loading States</AnchorHeading>
                    <p>
                        Disabled buttons use <Code inline copyEnabled={false} codeString="aria-disabled" /> and custom visual styles that
                        remain discoverable. The <Code inline copyEnabled={false} codeString="cursor: not-allowed" /> communicates the state
                        without removing interactivity from assistive technology.
                    </p>
                    <AnchorHeading headingLevel={3} id="css-touch-devices">Touch Device Optimization</AnchorHeading>
                    <p>
                        Larger touch targets (44x44px) and increased padding are applied on devices with coarse pointers.
                        This directly supports WCAG AAA and improves usability on mobile.
                    </p>
                    <AnchorHeading headingLevel={3} id="css-user-preferences">Respecting User Preferences</AnchorHeading>
                    <p>
                        We disable transitions and animations when <Code inline codeString="prefers-reduced-motion" /> is detected.
                        <span className="fun-underline">Accessibility is baked in — not added later</span>.
                    </p>
                </PostSection>


                <PostSection id="testing">
                    <AnchorHeading headingLevel={2} id="testing-heading">Testing</AnchorHeading>
                    <p>
                        A design system component is only as good as its guarantees. Our test suite verifies behavior across sync and async handlers, accessibility attributes, and real DOM interaction.
                    </p>
                    <AnchorHeading headingLevel={3} id="testing-setup">Set up</AnchorHeading>
                    <AnchorHeading headingLevel={3} id="testing-component">The Component</AnchorHeading>
                    <p>
                        The Button tests confirm rendering, event handling, and accessible state management:
                    </p>
                    <Code lang="ts" codeString={`test('prevents click handler when disabled', () => {
  const handleClick = jest.fn()
  render(<Button disabled onClick={handleClick}>Click</Button>)
  fireEvent.click(screen.getByTestId('base-button'))
  expect(handleClick).not.toHaveBeenCalled()
})`} />

                    <List>
                        <li>Confirms <Code inline codeString="aria-disabled" /> and <Code inline codeString="data-loading" /> work as expected</li>
                        <li>Ensures buttons never trigger parent handlers when inactive</li>
                        <li>Prevents accidental form submissions with <Code inline codeString="type='button'" /></li>
                    </List>

                    <AnchorHeading headingLevel={3} id="testing-hook">The Hook</AnchorHeading>
                    <p>
                        The <Code inline codeString="useButton" /> tests go deeper — they validate that both synchronous and asynchronous click handlers log and rethrow errors correctly.
                    </p>

                    <Code lang="ts" codeString={`test('attaches logging to unhandled async errors', async () => {
  const error = new Error('Async Error')
  const mockHandler = jest.fn().mockRejectedValue(error)
  const clickHandler = handleClick(mockHandler)
  clickHandler({} as ReactMouseEvent<HTMLButtonElement>)
  await new Promise(r => setTimeout(r, 0))
  expect(mockLog).toHaveBeenCalledWith('Unhandled async error', error, 'error', expect.anything())
})`} />
                    <p>
                        This pattern ensures <FunHighlight>no button interaction fails silently</FunHighlight>,
                        which makes debugging production and development environments far safer.
                    </p>
                </PostSection>

                <PostSection id="what-we-built">
                    <AnchorHeading headingLevel={2} id="what-we-built-heading">What We Built</AnchorHeading>
                    {/* GENERATE IMAGE FOR HERE */}

                    <p>
                        By combining type safety, clear accessibility semantics, and a robust test suite, this button is more than a component — it&apos;s a contract.
                        Every developer who uses it can trust that it behaves predictably, communicates clearly, and fails gracefully.
                    </p>
                    <p>Our base button component now provides:</p>

                    <AnchorHeading headingLevel={3} id="what-we-built__core" icon={RiErrorWarningLine} >
                        Core Features
                    </AnchorHeading>
                    <List aria-labelledby="what-we-built__core">
                        <li>Type-safe component with TypeScript</li>
                        <li>Clean separation of logic and presentation</li>
                        <li>Reusable custom hook for interactions</li>
                        <li>CSS custom properties for easy theming</li>
                        <li>Multiple style variants (filled, outline)</li>
                        <li>Color variants (primary, secondary, accent)</li>
                        <li>Comprehensive error handling</li>
                        <li>Async operation support</li>
                        <li>Full test coverage</li>
                    </List>

                    <AnchorHeading headingLevel={3} id="what-we-built__accessibility" icon={RiAccessibilityLine}>
                        Accessibility Checklist
                    </AnchorHeading>
                    <p>Our button implementation meets these accessibility standards:</p>
                    <List aria-labelledby="what-we-built__accessibility">
                        <li>AAA target size (44x44px minimum)</li>
                        <li>No reliance on color alone for meaning</li>
                        <li>Proper focus management and keyboard navigation</li>
                        <li>Properly disabled state communicated</li>
                        <li>Touch-friendly margins for motor accessibility</li>
                    </List>


                    <AnchorHeading headingLevel={3} id="what-we-built__DX" icon={RiFlaskLine}>Developer Experience</AnchorHeading>
                    <List aria-labelledby="what-we-built__DX">
                        <li>Clean separation of logic and presentation</li>
                        <li>Consistent API across all variants</li>
                        <li>Comprehensive error handling</li>
                        <li>Type safety with TypeScript</li>
                        <li>Full test coverage</li>
                    </List>

                </PostSection>

                <PostSection id="whats-next">
                    <AnchorHeading headingLevel={2} id="whats-next-heading">What&apos;s Next</AnchorHeading>
                    <p>
                        In the next post, we&apos;ll extend this foundation to create toggle buttons and explore
                        setting up Storybook to document our growing design system.
                    </p>
                    <p>
                        The patterns we&apos;ve established here will serve as the foundation for more complex
                        components like button groups, tab lists, and interactive panels.
                    </p>
                </PostSection>
                <PostSection id="resources">
                    <AnchorHeading headingLevel={2} id="resources-heading">Resources</AnchorHeading>
                    <AnchorHeading headingLevel={3}>Complete Code Reference</AnchorHeading>
                    <TabList
                        className="code__reference"
                        defaultActiveTabId="code_button"
                        data-variant="accent"
                        orientation="horizontal"
                        tabs={[
                            {
                                id: 'code_button',
                                tabLabel: 'button.tsx',
                                panelContent: (
                                    <Code codeString={`'use client'

import clsx from 'clsx'
import type { BaseButtonProps, MouseEventType } from '@/components/button/button.type'
import useButton from '@/components/button/useButton'
import Spinner from '@/components/spinner'
import Icon from '@/components/icon'

export default function Button({
    className,
    children,
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false,
    ref,
    icon,
    ...props
}: BaseButtonProps) {
    const { handleClick } = useButton()

    function onClickHandler(event: MouseEventType) {
        if (isLoading || disabled) {
            event.stopPropagation()
            event.preventDefault()
            return;
        }
        void handleClick(onClick)(event)
    }

    return (
        <button
            {...props}
            className={clsx(className, {'button-w-icon': icon}, 'button')}
            onClick={onClickHandler}
            aria-disabled={isLoading || disabled}
            data-loading={isLoading}
            ref={ref}
            type={type}
            data-testid="base-button"
        >
            {icon && <Icon icon={icon}/>}
            <span className='button__content'>{children}</span>
            {isLoading && <Spinner />}
        </button>
    )}
`} />
                                )
                            },
                            {
                                id: 'code_hook',
                                tabLabel: 'useButton.tsx',
                                panelContent: (
                                    <Code codeString={`import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';
import isThenable from '@/lib/isThenable';
import log from '@/lib/Logging';

export default function useButton() {
  const handleClick = (userHandler?: ButtonClickHandler) =>
    (event: MouseEventType) => {
      if (!userHandler) return

      try {
        const result = userHandler(event)

        if (process.env.NODE_ENV !== 'production') {
          // Custom Logging solution here
        }
        if (isThenable(result)) {
          void Promise.resolve(result).catch((err) => {
           // Custom Logging solution here
          })
        }
      } catch (err) {
       // Custom Logging solution here
        throw err
      }
    }

    return { handleClick }
}`} />
                                )
                            },
                            {
                                id: 'code_type',
                                tabLabel: 'button.type.ts',
                                panelContent: (
                                    <Code lang="ts" codeString={`import type { ComponentPropsWithRef, MouseEvent } from 'react'
import { IconProps } from '@/components/icon/icon.type';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler = (event: MouseEventType) => void | Promise<void>;

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    icon?: IconProps['icon'];
    'data-style'?: 'outlined' | 'filled';
    'data-variant'?: 'primary' | 'secondary' | 'accent';
    onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>;`} />
                                )
                            },
                            {
                                id: 'code_css',
                                tabLabel: 'button.css',
                                panelContent: (
                                    <Code lang="css" codeString={`.button {
    /* Layout properties */
    --button-font-size: 1rem;
    --button-margin: calc(var(--spacing) * 2);
    --button-padding-y: calc(var(--spacing) * 2);
    --button-padding-x: var(--spacing);
    --button-icon-width: 24px;
    --button-spinner-width: 24px;
    /* WCAG Target Size Requirements */
    /* AA: 24px x 24px minimum, AAA: 44px x 44px minimum */
    min-width: 44px;
    min-height: 44px;

    /* Layout - reserve space for icon and spinner to prevent layout shift*/
    display: grid;
    grid-template-columns: var(--button-icon-width) fit-content(100%) var(--button-spinner-width);
    gap: var(--spacing);
    align-items: center;
    white-space: nowrap;

    /* text | spinner */
    & .button__content {
        grid-column: 2;
    }

    & .spinner {
        grid-column: 3;
        justify-self: center;
    }
    /* icon | text | spinner */
    &.button-w-icon  .icon {
            grid-column: 1;
            justify-self: center;
    }

    margin: var(--button-margin);
    padding: var(--button-padding-y) var(--button-padding-x);

    /* Reset browser defaults */
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: var(--border-thin);
    border-radius: var(--radius-md);
    outline: 0;
    box-shadow: none;

    /* Apply color properties (All Colors and variants defined below) */
    background-color: var(--button-bg-color, transparent);
    color: var(--button-color, currentColor);
    border-color: var(--button-border-color, currentColor);
    box-shadow: var(--button-shadow, none);
    outline-color: var(--button-outline-color, currentColor);
    outline-offset: var(--button-outline-offset);

    /* Typography */
    font: inherit;
    font-size: var(--button-font-size);
    line-height: 1.25;
    text-align: center;
    vertical-align: middle;

    /* Smooth transitions */
    transition: background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    outline 0.2s ease,
    box-shadow 0.2s ease;

    /* Interactive states - UX communication through outlines and transforms */
    &:hover {
        outline: 1px solid var(--button-outline-color, currentColor);
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    }

    &:focus-visible {
        outline: 2px solid var(--button-outline-color, currentColor);
        outline-offset: var(--button-outline-offset);
        box-shadow: none;
    }

    &:active {
        outline: 1px dotted var(--button-outline-color, currentColor);
        transform: translateY(1px);
    }

    /* The button can't be disabled using this base button but other packages might add disabled to the button on the DOM. We should maintain consistent styling */
    &:disabled,
    &[aria-disabled="true"] {
        --button-bg-color: var(--color-neutral-200);
        --button-color: var(--color-neutral-800);
        --button-border-color: var(--color-neutral-400);
        cursor: not-allowed;

        &:hover,
        &:active {
            outline: none;
            box-shadow: none;
            transform: none;
        }

        &:focus-visible {
            --button-outline-color: var(--color-neutral-600);
        }
    }

    &[data-loading="true"] {
        cursor: wait;

        &:hover:not(:focus-visible) {
            outline: none;
            box-shadow: none;
            transform: none;
        }
    }
}

/* Only actual button elements get pointer cursor */
button.button {
    cursor: pointer;
}

/* Touch device optimization */
@media screen and (any-pointer: coarse) {
    .button {
        --button-margin: 12px;
        --button-padding-y: 12px;
        --button-padding-x: 20px;
    }
}

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
    .button {
        transition: none !important;
        animation: none !important;
    }
}

/* Filled style - solid background with contrasting text */
.button[data-style="filled"] {
    --button-color: var(--button-primary-color);
    --button-bg-color: var(--button-secondary-color);
    --button-border-color: var(--button-accent-color);
    --button-outline-color: var(--button-accent-color);
}

/* Outline style - transparent background with colored border/text */
.button[data-style="outlined"] {
    --button-color: var(--button-secondary-color);
    --button-bg-color: var(--button-primary-color);
    --button-border-color: var(--button-accent-color);
    --button-outline-color: var(--button-accent-color);
}

/* Color Variants */
.button {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-neutral-800);
    --button-accent-color: var(--color-neutral-600);
}

.button[data-variant="primary"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-primary-400);
    --button-accent-color: var(--color-primary-600);
}

.button[data-variant="secondary"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-secondary-400);
    --button-accent-color: var(--color-secondary-600);

}

.button[data-variant="accent"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-accent-400);
    --button-accent-color: var(--color-accent-600);
}`} />
                                )
                            },
                            {
                                id: 'isThenable',
                                tabLabel: 'isThenable.ts',
                                panelContent: (
                                    <Code lang="ts" codeString={`export default function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  )
}`} />
                                )
                            },
                            {
                                id: 'button_test',
                                tabLabel: 'Button.test.tsx',
                                panelContent: (
                                    <Code codeString={`import Button from '@/components/button'
import { Ri24HoursFill } from '@remixicon/react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('Button', () => {
  test('renders with children', () => {
    render(<Button>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveTextContent('click me')
  })

  test('renders with icon when icon prop is provided', () => {
    render(<Button icon={Ri24HoursFill}>click me</Button>)
    const button = screen.getByTestId('base-button')
    expect(button).toHaveClass('button-w-icon')
    expect(button).toHaveTextContent('click me')
  })

  test('renders spinner when isLoading prop is true', () => {
    render(<Button isLoading>click me</Button>)
    const button = screen.getByTestId('base-button')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(button.querySelector('[data-testid="spinner"]')).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('prevents click handler when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('prevents click handler when isLoading is true', () => {
    const handleClick = jest.fn()
    render(<Button isLoading onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('stops propagation when disabled', () => {
    const handleParentClick = jest.fn()
    render(
      <div onClick={handleParentClick}>
        <Button disabled onClick={jest.fn()}>click me</Button>
      </div>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleParentClick).not.toHaveBeenCalled()
  })

  test('stops propagation when loading', () => {
    const handleParentClick = jest.fn()
    render(
      <div onClick={handleParentClick}>
        <Button isLoading onClick={jest.fn()}>click me</Button>
      </div>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleParentClick).not.toHaveBeenCalled()
  })

  test('sets type to button by default to prevent form submission', () => {
    render(<Button>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('type', 'button')
  })

  test('allows type to be overridden to submit', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault())
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">submit</Button>
      </form>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  test('prevents form submission when disabled', () => {
    const handleSubmit = jest.fn()
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit" disabled>submit</Button>
      </form>
    )
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  test('forwards ref to the HTML button element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref} id="ref_test">click me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveAttribute('id', 'ref_test')
  })

  test('sets aria-disabled when disabled', () => {
    render(<Button disabled>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('aria-disabled', 'true')
  })

  test('sets aria-disabled when loading', () => {
    render(<Button isLoading>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('aria-disabled', 'true')
  })

  test('sets data-loading attribute when loading', () => {
    render(<Button isLoading>click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('data-loading', 'true')
  })

  test('applies data-style prop', () => {
    render(<Button data-style="filled">click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('data-style', 'filled')
  })

  test('applies data-variant prop', () => {
    render(<Button data-variant="primary">click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveAttribute('data-variant', 'primary')
  })

  test('applies custom className', () => {
    render(<Button className="custom-class">click me</Button>)
    expect(screen.getByTestId('base-button')).toHaveClass('custom-class', 'button')
  })

  test('activates button with Enter key', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>click me</Button>)
    const button = screen.getByTestId('base-button')
    button.focus()
    expect(button).toHaveFocus()
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    expect(handleClick).toHaveBeenCalled()
  })

  test('handles async click handlers', async () => {
    const handleClick = jest.fn().mockResolvedValue(undefined)
    render(<Button onClick={handleClick}>click me</Button>)
    fireEvent.click(screen.getByTestId('base-button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
    await expect(handleClick.mock.results[0].value).resolves.toBeUndefined()
  })
})`} />
                                )
                            },
                            {
                                id: 'useButton_test',
                                tabLabel: 'useButton.test.tsx',
                                panelContent: (
                                    <Code codeString={`import useButton from '@/components/button/useButton'
import { renderHook } from '@testing-library/react'
import { MouseEvent as ReactMouseEvent } from 'react'
import log from '@/lib/Logging';
import withNodeEnv from '@/tests/helpers/withNodeEnv';

jest.mock('../../lib/Logging.ts');

const mockLog = log as jest.MockedFunction<typeof log>

let handleClick: ReturnType<typeof useButton>['handleClick']

describe('useButton', () => {

    beforeEach(() => {
    jest.clearAllMocks()
    const { result } = renderHook(() => useButton())
    handleClick = result.current.handleClick
    })

    describe('handleClick', () => {
    test('accepts a curried function with the Event as the prop', () => {
        const mockUserHandler = jest.fn()
        const mockEvent = {} as ReactMouseEvent<HTMLButtonElement>
        handleClick(mockUserHandler)(mockEvent)

        expect(mockUserHandler).toHaveBeenCalledWith(mockEvent)
    })

    test('returns early when no handler is provided', () => {
        const clickHandler = handleClick(undefined)
        const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

        expect(result).toBeUndefined()
        expect(mockLog).not.toHaveBeenCalled()
    })

    test('does not return a value for sync functions', () => {
        const mockHandler = jest.fn()
        const clickHandler = handleClick(mockHandler)

        const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(result).toBeUndefined()
    })

    test('does not return a value for async/promise functions', () => {
        const mockHandler = jest.fn<Promise<void>, [ReactMouseEvent<HTMLButtonElement>]>()
        .mockResolvedValue(undefined)
        const clickHandler = handleClick(mockHandler)

        const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(result).toBeUndefined()
    })

    test('logs and rethrows sync handler errors', () => {
        const error = new Error('Sync Error')
        const mockHandler = jest.fn().mockImplementation(() => { throw error })

        const clickHandler = handleClick(mockHandler)

        expect(() => {
        clickHandler({} as ReactMouseEvent<HTMLButtonElement>)
        }).toThrow(error)

        expect(mockLog).toHaveBeenCalledWith('Button click error', error, 'error', expect.objectContaining({
        context: expect.any(String),
        trace: true
        }))
    })

    test('attaches logging to unhandled async errors', async () => {
        const error = new Error('Async Error')
        const mockHandler = jest.fn<Promise<void>, [ReactMouseEvent<HTMLButtonElement>]>()
        .mockRejectedValue(error)
        const clickHandler = handleClick(mockHandler)

        const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(result).toBeUndefined()

        await new Promise<void>(resolve => {
        global.setTimeout(resolve, 0)
        })

        expect(mockLog).toHaveBeenCalledWith('Unhandled async error', error, 'error', expect.objectContaining({
        context: expect.any(String),
        trace: true
        }))
    })

    test('does not log caught async errors', async () => {
        await withNodeEnv('production', async () => {
        const error = new Error('Caught Async Error')
        const mockHandler = jest.fn<Promise<void>, [ReactMouseEvent<HTMLButtonElement>]>()
            .mockImplementation(() => Promise.reject(error).catch(() => {
            // Swallow the error
            }))
        const clickHandler = handleClick(mockHandler)

        const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(result).toBeUndefined()

        await new Promise<void>(resolve => {
            global.setTimeout(resolve, 0)
        })

        expect(mockLog).not.toHaveBeenCalled()
        })
    })
    test('logs all clicks in non-production environments', () => {
        withNodeEnv('development', () => {
        const mockHandler = jest.fn().mockName('testHandler')
        const clickHandler = handleClick(mockHandler)

        clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(mockLog).toHaveBeenCalledWith('Button clicked', undefined, 'default', expect.objectContaining({
            context: expect.any(String),
            trace: true
        }))
        })
    })

    test('does not log clicks in production', () => {
        withNodeEnv('production', () => {
        const mockHandler = jest.fn()
        const clickHandler = handleClick(mockHandler)

        clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(mockLog).not.toHaveBeenCalled()
        })
    })
    })
})`} />
                                )
                            }
                        ]}
                    />
                    {/* decide if we want to embed a codepen or do we use tabpanel component to add each of the files under a tab 
                    ### button.type.ts <!-- H3 -->
                    ### useButton.ts <!-- H3 -->
                    ### Button.tsx <!-- H3 -->
                    ### button.css <!-- H3 -->
                    */}
                </PostSection>
                <PostSection>
                    <PostNavigation
                        next={{
                            href: "/blog/design-system/buttons/sliders",
                            heading: "Slider Buttons"
                        }} />
                </PostSection>

            </Post >
            <PostSideBar
                contents={[
                    { id: 'button-foundations', href: '#button-foundations', label: "Laying the Foundation" },
                    { id: 'project-setup', href: '#project-setup', label: 'Project Setup' },
                    { id: 'building-foundation', href: '#building-foundation', label: 'Building the Foundation' },
                    { id: 'interaction-logic', href: '#interaction-logic', label: 'Interaction Logic' },
                    { id: 'essential-features', href: '#essential-features', label: 'Essential Features' },
                    { id: 'accessibility', href: '#accessibility', label: 'Accessibility Requirements' },
                    { id: 'css-styling', href: '#css-styling', label: 'Styling' },
                    { id: 'testing', href: '#testing', label: 'Testing' },
                    { id: 'what-we-built', href: '#what-we-built', label: 'What We Built' },
                    { id: 'whats-next', href: '#whats-next', label: "What's Next" },
                    { id: 'resources', href: '#resources', label: "Resources" }
                ]}
                // Fillers
                relatedPosts={relatedPosts}
                author={{ avatarUrl: '/window.svg', name: "carl davidson" }}
            />

        </>
    )
}