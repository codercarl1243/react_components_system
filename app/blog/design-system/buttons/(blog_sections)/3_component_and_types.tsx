import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Link from "@/components/link";
import InlineCode from "@/components/code/inlineCode";

export default function Section3() {

    return (
        <PostSection id="component-and-types">
            <AnchorHeading headingLevel={2} id="component-and-types-heading">
                Component & Types
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
                    Button behavior is handled through a dedicated <InlineCode codeString="useButton" /> hook.
                    This keeps our component lean and allows logic to be reused across other interactive elements like toggles or switches.
                </p>
            </PostNote>
            <p className="bold">Here&apos;s our base implementation:</p>
            <Code
                title="button.tsx"
                codeString={`'use client'

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
                    <InlineCode codeString={`clsx(className, 'button')`} /> - Combines user-provided
                    classes with our base class for flexible, predictable styling.
                </li>
                <li>
                    <InlineCode codeString={`isLoading || disabled`} /> - Prevents clicks and ensures
                    consistent state management.
                </li>
                <li>
                    <InlineCode codeString="event.preventDefault()" /> and <InlineCode codeString="event.stopPropagation()" /> — Block interaction entirely when the button is inactive, maintaining UX consistency.
                </li>
                <li>
                    <p>
                        <InlineCode codeString={`ref`} /> - React 19 allows refs to be passed as regular props without <InlineCode codeString={`forwardRef`} />
                    </p>
                    <p className="italic text-sm neutral-600">
                        See: <Link href="https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop">React 19 release notes</Link>
                    </p>
                </li>
                <li>
                    <InlineCode codeString={`data-loading`} /> - Provides a hook for styling and animation control.
                </li>
                <li>
                    <InlineCode codeString={`aria-disabled`} /> - Keeps the button in the accessibility
                    tree and maintains keyboard discoverability. We'll explain this more in depth in the accessibility section.
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
            <Code
                title="button.type.ts"
                codeString={`import type { ComponentPropsWithRef, MouseEvent } from 'react'
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
                    <InlineCode codeString={`MouseEventType`} /> -  Alias for cleaner references throughout the component.
                </li>
                <li>
                    <InlineCode codeString={`ButtonClickHandler`} /> - This type further communicates that we are not returning anything which is consistent with React patterns.
                </li>
                <li>
                    <InlineCode codeString={`Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>`} /> - Inherits all native button props (e.g. <InlineCode codeString="className" /> and <InlineCode codeString="aria-*" />) while replacing <InlineCode codeString="onClick" />, and <InlineCode codeString="disabled" /> with our typed versions.
                </li>
            </List>
        </PostSection>
    )
}