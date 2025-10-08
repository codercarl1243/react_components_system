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
import { RiAccessibilityLine, RiErrorWarningLine, RiFlaskLine } from "@remixicon/react";
import Icon from "@/components/icon";
import PostNote from "@/components/post/post.note";
import TabList from "@/components/tablist";

export const metadata: Metadata = { title: 'Buttons · Design System' }

export default function ButtonsBasePage() {
    return (
        <>
            <Post>
                <PostSection id="what-were-building">
                    <PostBanner
                        title="The Button"
                        subtitle="Building a React Design System Foundation"
                        headingId="the-button-heading"
                        image={{
                            src: '/mountainRangeBanner_1200x400.png'
                        }}
                    />
                    <Heading headingLevel={2} id="what-were-building-heading">What We&apos;re Building</Heading>
                    <p>
                        This is the first in a series where we&apos;re building a comprehensive <span className="bold">Button design system</span>.
                    </p>
                    <p>
                        We&apos;ll create a <FunHighlight>flexible</FunHighlight>, <FunHighlight>accessible</FunHighlight>, and <FunHighlight>composable</FunHighlight> button system in React
                        {/* Add links to content
                        that serves as the foundation for more complex components like <Link>toggles</Link>, <Link>switches</Link>, and button <Link>panels</Link>.
                        */}
                        that serves as the foundation for more complex components like toggles, switches, and panels.
                    </p>
                    <p>By the end of this post, you&apos;ll have:</p>
                    <List>
                        <li>A type-safe, accessible base button component</li>
                        <li>A reusable hook for handling button interactions</li>
                        <li>CSS styling with built-in accessibility features</li>
                        <li>Comprehensive test coverage</li>
                    </List>
                </PostSection>
                <PostSection id="project-setup">
                    <Heading headingLevel={2} id="project-setup-heading">Project Setup</Heading>

                    <Heading headingLevel={3} id="file-structure">File Structure</Heading>
                    <p>We&apos;ll follow a consistent pattern for organizing our components:</p>

                    <Code lang="md" copyEnabled={false} codeString={`components/
    └── button/
        ├── button.tsx              
        ├── hook.ts
        └── button.type.ts

    tests/                          
    └── components/
        ├── useButton.test.tsx
        └── Button.test.tsx

    styles/
    └── components/
        └── button.css`} />
                    <p>This structure keeps related code together while maintaining clear boundaries between logic, types, and presentation.</p>
                    <Heading headingLevel={3} id="dependencies">Dependencies</Heading>
                    <p>I have installed a couple of additional packages:</p>
                    <List>
                        <li><Link className="bold" href="https://www.npmjs.com/package/@remixicon/react">RemixIcons</Link> to leverage their extensive and free library of icons</li>
                        <li><Link className="bold" href="https://www.npmjs.com/package/clsx">CLSX</Link> to handle class names conditionally</li>
                    </List>
                    <Code lang="bash" codeString={`npm install @remixicon/react clsx`} />
                    <PostNote className="italic">
                        <p>Later in this post we will use <Link className="bold" href="https://jestjs.io/docs/getting-started">Jest</Link> to run tests.</p>
                    </PostNote>

                </PostSection>

                <PostSection id="building-foundation">
                    <Heading headingLevel={2} id="building-foundation-heading">
                        Building the Foundation
                    </Heading>
                    <Heading headingLevel={3} id="starting-simple">
                        Starting Simple: The Component
                    </Heading>
                    <p>Let's start with the component itself. Our Button component needs to handle several responsibilities:</p>
                    <List>
                        <li>Managing click events (both sync and async)</li>
                        <li>Communicating loading states</li>
                        <li>Maintaining accessibility attributes</li>
                        <li>Forwarding refs properly; and</li>
                        <li>Preventing interaction when disabled or loading</li>
                    </List>

                    <PostNote><p>We're using a custom hook called <Code codeString="useButton" inline copyEnabled={false} /> to handle click logic - we'll explore
                        this in detail in the next section.</p>
                    </PostNote>
                    <p className="bold">Here's how we structure it:</p>
                    <Code codeString={`'use client'

import clsx from 'clsx'
import { BaseButtonProps, MouseEventType } from '@/components/button/button.type'
import useButton from '@/components/button/useButton'
import Spinner from '@/components/utilities/spinner'

/**
 * A base, accessible button component that supports loading states and 
 * safely manages click behavior and logging through a custom hook.
 *  
 * This component uses aria-disabled instead of the native disabled attribute
 * to maintain discoverability and tab order. The button remains focusable
 * and discoverable to assistive technology while in this non-functional state.
 *
 * @component
 * @param {BaseButtonProps} props - The props for the Button component.
 * @param {string} [props.className] - Additional class names to append.
 * @param {React.ReactNode} props.children - The button label or content.
 * @param {function} [props.onClick] - Optional click handler.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button type.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state.
 * @param {React.Ref<HTMLButtonElement>} [props.ref] - Optional ref to the button element.
 * @returns {JSX.Element} The rendered Button component.
 *
 * @example
 * // Loading state with spinner
 * <Button isLoading onClick={handleSubmit}>Submit</Button>
 * 
 * // Disabled but discoverable
 * <Button disabled onClick={handleSave}>Save</Button>
 * 
 * // With variant styling
 * <Button data-variant="primary" data-style="filled">
 *   Click Me
 * </Button>
 */
export default function Button({
    className,
    children,
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false,
    ref,
    ...props
}: BaseButtonProps) {
    const { handleClick } = useButton()

    /**
     * Handles click events.
     *
     * - Prevents default form submission when loading or disabled.
     * - Stops propagation to avoid parent click triggers.
     * - Delegates to useButton's click handler otherwise.
     */
    function onClickHandler(event: MouseEventType) {

    if (isLoading || disabled) {
        /**  
         * Using both is correct here since a disabled/loading button should do nothing and 
         * not trigger parent handlers.
         * */
        event.preventDefault()      // Prevent form submission and/or default click actions
        event.stopPropagation()     // Prevent bubbling to parent click handlers
        return;
    }
    return handleClick(onClick)(event)
    }

    return (
        <button
            {...props}
            className={clsx(className, 'button')}
            onClick={onClickHandler}
            aria-disabled={isLoading || disabled}
            data-loading={isLoading}
            ref={ref}
            type={type}
            data-testid="base-button"
        >
            {children}
            {isLoading && <Spinner />}
        </button>
    )}`} />

                    <Heading headingLevel={4}>Key Decisions</Heading>
                    <List>
                        <li><Code codeString={`clsx(className, 'button')`} inline copyEnabled={false} /> - Combines user-provided classes with our base class, giving consumers flexibility while maintaining defaults</li>
                        <li><Code codeString={`isLoading || disabled`} inline copyEnabled={false} /> - Prevents click handlers from firing during loading or disabled states.</li>
                        <li><Code codeString={`event.preventDefault()`} inline copyEnabled={false} /> - Stops any default behavior when the button shouldn't be interactive</li>
                        <li><Code codeString={`ref`} inline copyEnabled={false} /> - React 19 allows refs to be passed as regular props without <Code codeString={`forwardRef`} inline copyEnabled={false} /></li>
                        <li><Code codeString={`data-loading`} inline copyEnabled={false} /> - Provides a styling hook for loading states without relying on JavaScript</li>
                        <li><Code codeString={`aria-disabled`} inline copyEnabled={false} /> over <Code codeString={`disabled`} inline copyEnabled={false} /> - We'll explain this choice in the accessibility section</li>
                    </List>
                    <Heading headingLevel={3} id="typescript-support">Adding TypeScript Support</Heading>
                    <p>Type safety helps catch errors early and provides excellent autocomplete for consumers. Our type definitions need to:</p>
                    <List>
                        <li>Support both synchronous and asynchronous click handlers</li>
                        <li>Extend native button props without conflicts</li>
                        <li>Allow custom data attributes for styling</li>
                        <li>Properly type mouse events</li>
                    </List>
                    <Code codeString={`import type { ComponentPropsWithRef, MouseEvent } from 'react'

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler<T = unknown> = (event: MouseEventType) => T | Promise<T>;

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    'data-style'?: 'outlined' | 'filled';
    'data-variant'?: 'primary' | 'secondary' | 'accent';
    onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>;`} />
                    <Heading headingLevel={4}>Types Breakdown</Heading>
                    <List>
                        <li><Code codeString={`MouseEventType`} inline copyEnabled={false} /> - Alias for cleaner code and easier updates if we need to change event types</li>
                        <li><Code codeString={`ButtonClickHandler<T = unknown>`} inline copyEnabled={false} /> - The unknown default allows maximum flexibility while maintaining type safety through inference at the call site</li>
                        <li><Code codeString={`Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>`} inline copyEnabled={false} /> - Inherits all native button props (className, aria-*, data-*, etc.) while replacing onClick, and disabled with our typed versions</li>
                    </List>
                </PostSection>

                <PostSection id="interaction-logic">
                    <Heading headingLevel={2} id="interaction-logic-heading">Interaction Logic</Heading>
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
import log from '@/utils/Logging';

export default function useButton() {
    /**
     * Creates a wrapped click handler that logs all button interactions and handles errors.
     * 
     * This wrapper provides centralized logging for:
     * - All button click events (successful and failed) - Logged in: Development only
     * - Synchronous errors (caught and re-thrown) - Logged in: All environments
     * - Unhandled asynchronous errors (not re-thrown) - Logged in: All environments
     * 
     * Note: If the user handler catches its own errors, those errors will NOT be logged here.
     * Only unhandled promise rejections are captured for async operations.
     * 
     * @template T - The return type of the user's click handler
     * @param {ButtonClickHandler<T>} [userHandler] - The user's click handler function
     * @returns {Function} A wrapped click handler that can be passed to button onClick
     * 
     * @example
     * const { handleClick } = useButton()
     * <button onClick={handleClick(myAsyncHandler)}>Click me</button>
     */
    const handleClick = <T = unknown>(userHandler?: ButtonClickHandler<T>) =>
    (event: MouseEventType) => {
        if (!userHandler) return

        try {
            const result = userHandler(event)

            // Log all button clicks for analytics/debugging
            if (process.env.NODE_ENV !== 'production') {
                log('Button clicked', undefined, 'default', { context: \`\${userHandler.name || 'anonymous function'}\`, trace: true })
            }
            if (result && typeof (result as any)?.then === 'function') {
                /**
                 * Attach error logging to unhandled promise rejections.
                 * Uses void to indicate we're intentionally not awaiting this promise.
                 * 
                 * Note: This only catches rejections that the user handler did NOT catch.
                 * If the user handler has its own try/catch, this won't fire.
                 */
                void Promise.resolve(result).catch((err) => {
                log('Unhandled async error', err, 'error', { context: \`\${userHandler.name || 'anonymous function'}\`, trace: true })
                })
            }

            // Return the result (could be a value, Promise, or undefined)
            return result

        } catch (err) {
            /**
             * Catch synchronous errors thrown during handler execution.
             * Log the error for debugging, then re-throw so the error still
             * propagates (breaks execution, shows in console, etc.)
             */
            log('Button click error', err, 'error', { context: \`\${userHandler.name || 'anonymous function'}\`, trace: true })
            throw err
        }
    }

    return { handleClick }
}`} />

                    <Heading headingLevel={3}>Why this approach</Heading>
                    <List>
                        <li>
                            <p><span className="bold">Curried function</span> - <Code codeString="handleClick(onClick)(event)" inline copyEnabled={false} /> allows us to configure the handler once and reuse it.</p>
                        </li>
                        <li>
                            <p><span className="bold">Duck typing for Promises</span> - We check for a <Code codeString=".then" inline copyEnabled={false} /> method rather than using <Code codeString="instanceof Promise" inline copyEnabled={false} /> because the handler might return a <span className="italic">Promise-like</span> object. </p>
                            <p>This is a little bit more verbose and not as pretty but 2 extra lines ensures we don&apos;t miss the edges.</p>
                        </li>
                        <li>
                            <p>The <span className="bold"><Code codeString="void" inline copyEnabled={false} /> operator</span> - Explicitly discards the Promise return value, telling TypeScript/ESLint we're intentionally not awaiting it (fire-and-forget error logging).</p>
                        </li>
                        <li>
                            <p><span className="bold">Centralized logging</span> - Errors are logged consistently across all buttons. This is one of the main reasons we extract this logic into a hook rather than handling it in each component.</p>
                        </li>
                        <li>
                            <p><span className="bold">Re-throw synchronous errors</span> - By re-throwing with <Code inline codeString="throw err" copyEnabled={false} />, we allow React error boundaries to catch and handle errors. This prevents the UI from breaking silently.
                                <span className="bold">Async errors</span> are logged but not re-thrown since this occurs <FunHighlight>after the promise rejects.</FunHighlight></p>
                        </li>
                    </List>
                    <PostNote>
                        <p><span className="bold">Why doesn&apos;t the hook await?</span> Using <Code codeString="void" inline copyEnabled={false} /> with <Code codeString="Promise.resolve" inline copyEnabled={false} /> is a deliberate choice for fire-and-forget error logging. We attach a <Code codeString=".catch()" inline copyEnabled={false} /> block to log any rejected Promises.</p>
                        <p>We don't await the Promise because we want the handler to return the <span className="italic">resolving</span> promise to the component that will actually use it.</p>
                    </PostNote>

                </PostSection>
                <PostSection id="essential-features">
                    <Heading id="essential-features-heading" headingLevel={2}>Essential Features</Heading>
                    <Heading headingLevel={3}>Loading States</Heading>
                    <p>Loading states are critical for async operations. They provide feedback to users and prevent duplicate submissions.</p>
                    <p className="bold">Our implementation:</p>
                    <Code codeString="{isLoading && <Spinner />}" copyEnabled={false} />
                    <p>The Spinner component appears alongside the button text, maintaining the button's layout. We use <Code codeString="data-loading={isLoading}" copyEnabled={false} inline /> to enable CSS styling:</p>
                    <Code lang="css" codeString={`&[data-loading="true"] {
  position: relative;
  cursor: wait;
}`} copyEnabled={false} />
                    <Heading headingLevel={3}>Preventing Duplicate Actions</Heading>
                    <p>When a button triggers an async operation, users might click multiple times. We prevent this by:</p>
                    <List ordered>
                        <li>Checking <Code codeString="isLoading || disabled" copyEnabled={false} inline /> in our click handler</li>
                        <li>Using <Code codeString="event.preventDefault()" copyEnabled={false} inline /> to stop the event</li>
                        <li>Setting <Code lang="css" codeString="cursor: wait" copyEnabled={false} inline /> in CSS for visual feedback</li>
                        <li>Using <Code codeString="aria-disabled" copyEnabled={false} inline /> to communicate the state to assistive technology</li>
                    </List>
                    <Heading headingLevel={3}>Integration with Forms</Heading>
                    <p>
                        Our button defaults to <Code codeString={`type="button"`} copyEnabled={false} inline /> instead of <Code codeString={`type="submit"`} copyEnabled={false} inline />.
                    </p>
                    <p className="bold">This default button type ensures that we:</p>
                    <List>
                        <li>Prevent accidental form submissions</li>
                        <li>Force developers to explicitly opt-in to submit behavior</li>
                        <li>Reduce bugs in complex forms with multiple buttons</li>
                    </List>
                    <p>If you need a submit button, simply override this type:</p>
                    <Code copyEnabled={false} codeString={`<Button type="submit" onClick={handleSubmit}>
  Save Changes
</Button>`} />
                </PostSection>
                <PostSection id="accessibility">
                    <Heading id="accessibility-heading" headingLevel={2}>Accessibility Requirements</Heading>

                    <Heading headingLevel={3}>WCAG Success Criteria That Apply to Buttons</Heading>
                    <p>Buttons must meet several WCAG standards. Here are the key criteria our implementation addresses:</p>
                    <PostNote>
                        <p>This button is providing a base, more complex components that have additional accessibility considerations should be treated like their own Component and those concerns would be addressed within them.</p>
                        <p>That being said, there is nothing within the Base Button Component that would prevent you from extending it to meet your needs</p>
                    </PostNote>
                    <Heading headingLevel={4}>Perceivable (Principle 1)</Heading>
                    <List>
                        <li><span className="bold">1.4.3 Contrast (Minimum)</span> - Text and borders must have 4.5:1 contrast ratio</li>
                        <li><span className="bold">1.4.11 Non-text Contrast</span> - Interactive elements need 3:1 contrast against adjacent colors</li>
                        <li><span className="bold">1.4.1 Use of Color</span> - Don't rely on color alone to convey state changes</li>
                        <li><span className="bold">1.4.4 Resize Text</span> - Text must be readable when zoomed to 200%</li>
                    </List>
                    <Heading headingLevel={4}>Operable (Principle 2)</Heading>
                    <List>
                        <li><span className="bold">2.1.1 Keyboard</span> - All functionality must be available via keyboard</li>
                        <li><span className="bold">2.4.7 Focus Visible</span> - Clear focus indicators for keyboard navigation</li>
                        <li><span className="bold">2.5.5 Target Size</span> - Minimum 44×44px touch target (AAA standard)</li>
                        <li><span className="bold">2.5.3 Label in Name</span> - Visible text should match accessible name</li>
                    </List>
                    <Heading headingLevel={4}>Understandable (Principle 3)</Heading>
                    <List>
                        <li><span className="bold">3.3.2 Labels or Instructions</span> - Clear, descriptive button labels</li>
                        <li><span className="bold">3.2.2 On Input</span> - Button actions shouldn't cause unexpected context changes</li>
                    </List>
                    <Heading headingLevel={4}>Robust (Principle 4)</Heading>
                    <List>
                        <li><span className="bold">4.1.2 Name, Role, Value</span> - Proper semantic HTML and ARIA attributes</li>
                        <li><span className="bold">4.1.3 Status Messages</span> - Loading states must be communicated</li>
                    </List>
                    {/*  give references to common wcag success criteria that could apply to buttons 
                        1.1.1: Non-text Content
                        1.3.1: Info and Relationships
                        1.4.1: Use of Color
                        1.4.3: Contrast (Minimum)
                        1.4.4: Resize text
                        1.4.11: Non-text Contrast
                        1.4.12: Text Spacing
                        2.1.1: Keyboard
                        2.2.2: Pause, Stop, Hide
                        2.4.3: Focus Order
                        2.4.6: Headings and Labels
                        2.4.7: Focus Visible
                        2.5.3: Label in Name
                        2.5.5: Target Size (AAA)
                        3.3.1: Error Identification
                        3.3.2: Labels or Instructions
                        4.1.1: Parsing
                        4.1.2: Name, Role, Value
                        4.1.3 Status Messages 
                    */}
                    {/* explain why we dont use aria-loading - does this belong here or under ux/ui?? */}

                    <Heading headingLevel={3}>How UX/UI Design Extends WCAG</Heading>
                    <p>WCAG provides minimum standards, but good UX goes further. Here's how our implementation adds:</p>
                    {/* Explain how WCAG doesnt cover all bases */}
                    {/* benefits of adding margin around the button */}
                    {/* contrast requirements dont consider disabled buttons but they should */}
                    {/* Assistive technology is great but they dont work in every situation */}
                    {/* changing content/text content doesnt always end with the user knowing it has changed */}
                    {/* Disabling a button results in it being removed from the accessibility tree and shifts tab-order 
                            aria-disabled doesnt
                            explain - benefits of using aria-disabled when loading
                            how to do this while preventing user interactions like it is a disabled button
                    */}
                    {/* Keeping the button size consistent and how this prevents chaotic UIs, the rare case where a button needs to be larger or smaller should
                        probably be treated as its own component and have own styling i.e. toolbar/icon, CTA
                    */}
                    {/* good reads on topic: 
                    https://adrianroselli.com/2021/01/multi-function-button.html - in depth article on creating a button. plain html,js,css example code is quite complicated imo
                    https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/ - explaining when to use aria-disabled over disabled
                    */}
                    <Heading headingLevel={4}>Margin and Spacing</Heading>
                    <p>WCAG addresses target size but does not specifically require spacing between targets. This button has margin added by default</p>
                    <p><span className="bold">Why this matters:</span> Users with motor disabilities benefit from space between interactive elements. Accidental taps are less likely when targets aren't crowded. <span className="fun_underline">This is especially important on touch devices</span></p>
                    <Heading headingLevel={4}>Disabled State Contrast</Heading>
                    <p>WCAG's contrast requirements have an exception for disabled elements. But disabled buttons should still be visible and identifiable, they shouldn't dissapear from view because of an action that the user has taken.</p>
                    <Heading headingLevel={4}>The aria-disabled decision</Heading>
                    <p>This is one of the most important accessibility choices in our component. We use <Code codeString="aria-disabled" inline copyEnabled={false}/> instead of the native <Code codeString="disabled" inline copyEnabled={false}/> attribute.</p>
                    <p className="bold">The problem with <Code codeString="disabled" inline copyEnabled={false}/>:</p>
                    <List>
                        <li>Removes the button from the accessibility tree</li>
                        <li>Changes tab order dynamically</li>
                        <li>The Button can't be focused or announced by all assistive technologies</li>
                        <li>Users can find it hard to understand what is unavailable and why</li>
                    </List>
                    <p className="bold">Our solution - <Code codeString="aria-disabled" inline copyEnabled={false}/></p>
                    <p>This approach:</p>
                    <List>
                        <li>Keeps the button in the tab order</li>
                        <li>Allows screen readers to announce the button and it's state</li>
                        <li>Prevents confusion the user may experience</li>
                        <li>Works for both permanently disabled and temporily <span className="italic">loading</span> states</li>
                    </List>
                    <PostNote>Using aria-disabled in the same way as disabled works - We need to take a few extra steps and ensure that our click handler prevents interactions, along with targeting the aria-disabled state in our styling</PostNote>
                    <Heading headingLevel={4}>Why we don&apos;t use aria-busy</Heading>
                    <Heading headingLevel={4}>Consistent Button Sizing</Heading>
                    <Heading headingLevel={4}>Assistive Technology isnt everything</Heading>
                    <Heading headingLevel={4}>Further Reading</Heading>
                </PostSection>
                <PostSection id="css-styling">
                    <Heading headingLevel={2} id="css-styling-heading">CSS Styling</Heading>
                    <Heading headingLevel={3} id="css-reset-base-styles">Reset and Base Styles</Heading>
                    <Heading headingLevel={3} id="css-custom-properties">Custom Properties for Theming</Heading>
                    <Heading headingLevel={3} id="css-button-states">Button States</Heading>
                    <Heading headingLevel={4} id="css-interactions">Interaction states</Heading>
                    <Heading headingLevel={4} id="css-disabled">Disabled</Heading>
                    <Heading headingLevel={4} id="css-loading">Loading</Heading>
                    <Heading headingLevel={3} id="css-variants">Adding Variants</Heading>
                    <Heading headingLevel={3} id="css-touch-devices">Touch Device Optimization</Heading>
                    <Heading headingLevel={3} id="css-user-preferences">Respecting User Preferences</Heading>
                </PostSection>

                <PostSection id="testing">
                    <Heading headingLevel={2} id="testing-heading">Testing</Heading>
                    <Heading headingLevel={3} id="testing-setup">Set up</Heading>
                    <Heading headingLevel={3} id="testing-component">The Component</Heading>
                    <Heading headingLevel={3} id="testing-hook">The Hook</Heading>
                </PostSection>

                <PostSection id="what-we-built">
                    <Heading headingLevel={2} id="what-we-built-heading">What We Built</Heading>
                    <p>Our base button component now provides:</p>

                    <Heading headingLevel={3} id="what-we-built__core" hasIcon >
                        <Icon icon={RiErrorWarningLine} color={"var(--color-primary-400)"} size={32} />
                        Core Features
                    </Heading>
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

                    <Heading headingLevel={3} id="what-we-built__accessibility" className="heading-w-icon">
                        <Icon icon={RiAccessibilityLine} color={"var(--color-primary-400)"} size={32} />
                        Accessibility Checklist
                    </Heading>
                    <p>Our button implementation meets these accessibility standards:</p>
                    <List aria-labelledby="what-we-built__accessibility">
                        <li>AAA target size (44x44px minimum)</li>
                        <li>No reliance on color alone for meaning</li>
                        <li>Proper focus management and keyboard navigation</li>
                        <li>Properly disabled state communicated</li>
                        <li>Screen reader support with <Code inline codeString="aria-busy" /></li>
                        <li>Touch-friendly margins for motor accessibility</li>
                    </List>


                    <Heading headingLevel={3} id="what-we-built__DX" className="heading-w-icon"><Icon icon={RiFlaskLine} color={"var(--color-primary-400)"} size={32} />Developer Experience</Heading>
                    <List aria-labelledby="what-we-built__DX">
                        <li>Clean separation of logic and presentation</li>
                        <li>Consistent API across all variants</li>
                        <li>Comprehensive error handling</li>
                        <li>Type safety with TypeScript</li>
                        <li>Full test coverage</li>
                    </List>

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
                </PostSection>
                <PostSection id="resources">
                    <Heading headingLevel={2} id="resources-heading">Resources</Heading>
                    <Heading headingLevel={3}>Complete Code Reference</Heading>
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
import { BaseButtonProps, MouseEventType } from '@/components/button/button.type'
import useButton from '@/components/button/useButton'
import Spinner from '@/components/spinner'

export default function Button({
    className,
    children,
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false,
    ref,
    ...props
}: BaseButtonProps) {
    const { handleClick } = useButton()

    function onClickHandler(event: MouseEventType) {

        if (isLoading || disabled) {
            event.preventDefault()
            event.stopPropagation()
            return;
        }

        return handleClick(onClick)(event)
    }

    return (
        <button
            {...props}
            className={clsx(className, 'button')}
            onClick={onClickHandler}
            aria-disabled={isLoading || disabled}
            data-loading={isLoading}
            ref={ref}
            type={type}
            data-testid="base-button"
        >
            {icon && <Icon icon={icon}/>}
            {children}
            {isLoading && <Spinner />}
        </button>
    )
}`} />
                                )
                            },
                            {
                                id: 'code_hook',
                                tabLabel: 'useButton.tsx',
                                panelContent: (
                                    <Code codeString={`import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';
import log from '@/utils/Logging';

export default function useButton() {
    const handleClick = <T = unknown>(userHandler?: ButtonClickHandler<T>) =>
    (event: MouseEventType) => {
        if (!userHandler) return

        try {
            const result = userHandler(event)

            if (process.env.NODE_ENV !== 'production') {
                log('Button clicked', undefined, 'default', { context: \`\${userHandler.name || 'anonymous function'}\`, trace: true })
            }
            if (result && typeof (result as any)?.then === 'function') {
                void Promise.resolve(result).catch((err) => {
                log('Unhandled async error', err, 'error', { context: \`\${userHandler.name || 'anonymous function'}\`, trace: true })
                })
            }

            return result

        } catch (err) {
            log('Button click error', err, 'error', { context: \`\${userHandler.name || 'anonymous function'}\`, trace: true })
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

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler<T = unknown> = (event: MouseEventType) => T | Promise<T>;

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
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
    --button-margin: 8px;
    --button-padding: 8px 16px;
    --button-outline-offset: 2px;

    /* WCAG Target Size Requirements */
    /* AA: 24px x 24px minimum, AAA: 44px x 44px minimum */
    min-width: 44px;
    min-height: 44px;

    /* Layout */
    margin: var(--button-margin);
    padding: var(--button-padding);
    display: flex;
    align-items: center;

    /* Reset browser defaults */
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: var(--border-thin);
    border-radius: var(--radius-md);
    outline: 0;
    box-shadow: none;

    /* Apply color properties (defined in second declaration) */
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
    transition:
        background-color 0.2s ease,
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
        position: relative;
        cursor: wait;
        display: flex;

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
        --button-padding: 12px 20px;
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

            </Post>
            <PostSideBar
                contents={[
                    { id: 'what-were-building', href: '#what-were-building', label: "What We're Building" },
                    { id: 'project-setup', href: '#project-setup', label: 'Project Setup' },
                    { id: 'building-foundation', href: '#building-foundation', label: 'Building the Foundation' },
                    { id: 'interaction-logic', href: '#interaction-logic', label: 'Interaction Logic' },
                    { id: 'essential-features', href: '#essential-features', label: 'Essential Features' },
                    { id: 'accessibility', href: '#accessibility', label: 'Accessibility Requirements' },
                    { id: 'css-styling', href: '#css-styling', label: 'Styling' },
                    { id: 'testing', href: '#testing', label: 'Testing' },
                    { id: 'what-we-built', href: '#what-we-built', label: 'What We Built' },
                    { id: 'whats-next', href: '#whats-next', label: "What's Next" },
                    { id: 'resources', href: '#resources', label: "resources" }
                ]}
                // Fillers
                relatedPosts={[
                    { href: "/blog/design-system/buttons/sliders", title: "Slider Buttons" },
                    { href: "/blog/design-system/buttons/sliders", title: "Slider Buttons" },
                    { href: "/blog/design-system/buttons/sliders", title: "Slider Buttons" },
                    { href: "/blog/design-system/buttons/sliders", title: "Slider Buttons" }
                ]}
                author={{ avatarUrl: '/window.svg', name: "carl davidson" }}
            />

        </>
    )
}