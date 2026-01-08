import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";

export default function ButtonsResources() {

  return (
    <PostSection id="resources">
      <AnchorHeading as={"h2"} id="resources-heading">Code & Resources</AnchorHeading>
      <AnchorHeading as={"h3"}>Complete Code Reference</AnchorHeading>
      <TabList
        tabListName="code_reference"
        className="code__reference"
        defaultActiveTabId="code_button"
        variant="accent"
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
import { isThenable } from '@/lib/utils/guards';
import log from '@/lib/logging/log';

export default function useButton() {
  const handleClick = (userHandler?: ButtonClickHandler) =>
    (event: MouseEventType) => {
      if (!userHandler) return

      try {
        const result = userHandler(event)

        if (process.env.NODE_ENV !== 'production') {
          log()
        }
        if (isThenable(result)) {
          void Promise.resolve(result).catch((err) => {
              log()
          })
        }
      } catch (err) {
          log()
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
    --button-margin: var(--spacing);
    --button-padding-y: var(--spacing);
    --button-padding-x: var(--spacing-sm);
    --button-icon-width: 24px;
    --button-spinner-width: 24px;
    /* WCAG Target Size Requirements */
    /* AA: 24px x 24px minimum, AAA: 44px x 44px minimum */
    min-width: 44px;
    min-height: 44px;

    /* Layout - reserve space for icon and spinner to prevent layout shift*/
    display: grid;
    grid-template-columns: var(--button-icon-width) fit-content(100%) var(--button-spinner-width);
    gap: var(--spacing-sm);
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

.button[variant="primary"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-primary-400);
    --button-accent-color: var(--color-primary-600);
}

.button[variant="secondary"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-secondary-400);
    --button-accent-color: var(--color-secondary-600);

}

.button[variant="accent"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-accent-400);
    --button-accent-color: var(--color-accent-600);
}`} />
            )
          },
          {
            id: 'isThenable',
            tabLabel: 'guards.ts (excerpt)',
            panelContent: (
              <Code lang="ts" codeString={`export function isThenable(value: unknown): value is PromiseLike<unknown> {
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
    render(<Button variant="primary">click me</Button>)
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
import log from '@/lib/logging/log';
import withNodeEnv from '@/tests/helpers/withNodeEnv';

jest.mock('@/lib/Logging.ts');

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
    </PostSection>
  )
}