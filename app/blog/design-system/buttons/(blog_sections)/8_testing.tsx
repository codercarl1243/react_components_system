import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";

export default function Section8() {

    return (
        <PostSection id="testing">
            <AnchorHeading headingLevel={2} id="testing-heading">Testing</AnchorHeading>
            <p>
                Testing ensures our button behaves predictably and remains accessible, even as the codebase evolves.
            </p>
            <p>
                Our test suite validates <span className="fun-underline">sync and async logic</span>, <span className="fun-underline">accessibility semantics</span>, and <span className="fun-underline">DOM behavior</span> to guarantee consistent, reliable interactions.
            </p>
            <PostNote>
                <p className="italic">
                    Full reference material of both the component and hooks with their respective test suites can be found in the <Link href="#resources-heading">resources section</Link>.
                </p>
            </PostNote>

            <AnchorHeading headingLevel={3} id="testing-setup">Set Up</AnchorHeading>
            <p>
                Before writing any tests, we need a predictable testing environment using <code>Jest</code> and <code>@testing-library/react</code>.
                This setup allows our components to render in a virtual DOM and behave just as they would in the browser.
            </p>

            <p>NextJS documentation includes a <Link href="https://nextjs.org/docs/app/guides/testing/jest">walkthrough for a Jest testing setup</Link> if you would like to read more. The npm install line from this walkthrough is available below:</p>

            <Code
                lang="bash"
                title="Install dependencies"
                codeString={`npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest`}
                copyEnabled
            />
            <p>You will need a config file for Jest to work properly. I have shared my existing config file below</p>

            <AnchorHeading headingLevel={3}>useButton Hook</AnchorHeading>
            <p>
                The <InlineCode codeString="useButton" /> hook handles all interaction logic. These tests validate how the hook behaves in isolation — separate from any UI — ensuring that our event system is resilient and predictable.
            </p>
            <List variant="circle" spacing="tight">
                <li><span className="bold">Event Handling:</span> Verifies that user-provided click handlers run safely for both synchronous and asynchronous cases.</li>
                <li><span className="bold">Error Logging:</span> Ensures unhandled Promise rejections and synchronous errors are logged without interfering with execution.</li>
                <li><span className="bold">Return Value:</span> Confirms the hook returns a stable, curried function signature that can be reused across components.</li>
                <li><span className="bold">Isolation:</span> Tests logic independently of the DOM to maintain separation of concerns.</li>
            </List>


            <AnchorHeading headingLevel={3}>Button Component</AnchorHeading>
            <p>
                The <InlineCode codeString="Button" /> component connects logic to presentation. These tests focus on markup, accessibility, and visual stability.
            </p>
            <List variant="circle" spacing="tight">
                <li><span className="bold">Rendering:</span> Renders with the correct text, role, and variant props.</li>
                <li><span className="bold">Accessibility:</span> Applies <InlineCode codeString="aria-disabled" />, keyboard focus, and meets minimum touch target requirements.</li>
                <li><span className="bold">Loading State:</span> Disables interaction, updates <InlineCode codeString="aria-live" /> regions, and provides visual feedback.</li>
                <li><span className="bold">Interaction:</span> Responds correctly to mouse and keyboard events.</li>
                <li><span className="bold">Visual Stability:</span> Prevents layout shift when icons or spinners appear.</li>
            </List>
            <AnchorHeading headingLevel={4}>Accessibility Checks</AnchorHeading>
            <p>
                Accessibility testing verifies that users with assistive technologies experience consistent, predictable behavior. We confirm:
            </p>
            <List variant="circle" spacing="tight">
                <li>Focus visibility is maintained at all times.</li>
                <li><InlineCode codeString="aria-disabled" /> accurately reflects the visual state.</li>
                <li>Keyboard interaction is fully supported.</li>
                <li>Motion respects <InlineCode lang="css" codeString="prefers-reduced-motion" /> settings.</li>
            </List>

            <p>
                Together, these tests ensure our button is stable, predictable, and safe to refactor. They provide developers with the confidence that visual updates or logic changes won&apos;t break accessibility or behavior.
            </p>

            <AnchorHeading>Testing Resources</AnchorHeading>
            <TabList
                className="code__reference"
                tabListName="testing_resources"
                defaultActiveTabId="code_button"
                data-variant="accent"
                orientation="horizontal"
                tabs={[
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
import log from '@/lib/logging/log';
import withNodeEnv from '@/tests/helpers/withNodeEnv';

jest.mock('@/lib/logging/log.ts');

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
                    },
                    {
                        id: 'jest_config',
                        tabLabel: "jest.config.ts",
                        panelContent: (
                            <Code codeString={`import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './'
})

// Add any custom config to be passed to Jest
const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageProvider: 'v8',
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    silent: true, // Prevent jest from logging to the console
    moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
    },
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)`} />)
                    },
                    {
                        id: 'jest_setup',
                        tabLabel: "jest.setup.ts",
                        panelContent: (
                            <Code codeString={`import '@testing-library/jest-dom'`} />)
                    }
                ]}
            />
        </PostSection>
    )
}