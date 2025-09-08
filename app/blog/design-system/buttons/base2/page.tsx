import Code from "@/components/code";
import Heading from "@/components/heading";
import Link from "@/components/link";
import Post from "@/components/post";
import PostBanner from "@/components/post/post.banner";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import PostSideBar from "@/components/post/post.sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Buttons · Design System" };

export default function ButtonsBasePage() {
    return (
        <>
            <Post className="flow-16">
                <PostSection>
                    <PostBanner
                        title="The Button"
                        subtitle="Building a React Design System Foundation"
                        image={{
                            src: "",
                        }}
                    />
                    <p>
                        This is the first in a series where we&apos;re building a comprehensive <span className="bold italic">Button design system</span>.
                    </p>

                    <p>
                        We&apos;ll create a flexible, accessible, and composable button system in React that serves as the
                        foundation for more complex components like toggles, switches, and button panels.
                    </p>
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="what-were-building">What We&apos;re Building</Heading>
                    <div>
                        <p>By the end of this post, you&apos;ll have:</p>
                        <ul>
                            <li>A type-safe, accessible base button component</li>
                            <li>A reusable hook for handling button interactions</li>
                            <li>CSS styling with built-in accessibility features</li>
                            <li>Multiple button variants (primary, secondary, accent)</li>
                            <li>Comprehensive test coverage</li>
                        </ul>
                    </div>
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="project-setup">Project Setup</Heading>

                    <Heading headingLevel={3} id="file-structure">File Structure</Heading>
                    <p>We&apos;ll follow a consistent pattern for organizing our components:</p>

                    <Code lang="md" copyEnabled={false} codeString={`components/
└── button/
    ├── Button.tsx          // Main component
    ├── useButton.ts        // Logic hook
    └── button.type.ts     // TypeScript types

tests/                          
└── components/
    ├── useButton.test.tsx
    └── button.test.tsx

styles/
└── components/
    └── button.css              // Styling`} />

                    <Heading headingLevel={3} id="dependencies">Dependencies</Heading>
                    <p>Install these additional packages:</p>
                    <ul>
                        <li><Link href="https://www.npmjs.com/package/@remixicon/react">RemixIcons</Link> - Extensive free icon library</li>
                        <li><Link href="https://www.npmjs.com/package/clsx">clsx</Link> - Conditional class name utility</li>
                        <li>Testing packages: <Link href="https://www.npmjs.com/package/jest">jest</Link>, <Link href="https://www.npmjs.com/package/jest-environment-jsdom">jest-environment-jsdom</Link>, <Link href="https://www.npmjs.com/package/@testing-library/react">@testing-library/react</Link>, <Link href="https://www.npmjs.com/package/@testing-library/dom">@testing-library/dom</Link>, <Link href="https://www.npmjs.com/package/@testing-library/jest-dom">@testing-library/jest-dom</Link>, <Link href="https://www.npmjs.com/package/ts-node">ts-node</Link>, <Link href="https://www.npmjs.com/package/@types/jest">@types/jest</Link></li>
                    </ul>
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="building-foundation">Building the Foundation</Heading>

                    <Heading headingLevel={3} id="starting-simple">Starting Simple</Heading>
                    <p>Our button begins as a simple HTML button that passes through all standard props:</p>

                    <Code codeString={`// Button.tsx
"use client"

export default function Button({children, ...props}) {
    return (
        <button {...props}>
            {children}
        </button>
    )
}`} />

                    <p>This needs to be a client component because we&apos;ll handle interactions that can&apos;t be serialized during server-side rendering.</p>

                    <Heading headingLevel={3} id="typescript-support">Adding TypeScript Support</Heading>
                    <p>TypeScript needs to understand what props our button accepts. We&apos;ll use React&apos;s built-in type helper:</p>

                    <Code codeString={`// button.type.ts
import { ComponentPropsWithRef } from "react";

export type BaseButtonProps = ComponentPropsWithRef<"button">;`} />

                    <p>This gives us all standard button props plus ref support.</p>

                    <Heading headingLevel={3} id="handling-refs">Handling Refs in React 19</Heading>
                    <p>React 19 deprecated <Code inline codeString="forwardRef" /> in favor of accepting <Code inline codeString="ref" /> as a regular prop:</p>

                    <Code codeString={`// Button.tsx
export default function Button({children, ref, ...props}) {
    return <button ref={ref} {...props}>{children}</button>
}`} />

                    <PostNote>
                        <Heading headingLevel={4}>For React 18 and Earlier</Heading>
                        <p>If you&apos;re using React 18 or earlier, you&apos;ll still need <Code inline codeString="forwardRef" />:</p>
                        <Code codeString={`import { forwardRef } from "react";
import type {ComponentProps} from 'react';

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
    ({children, ...props }, ref) => (
        <button ref={ref} {...props}>
            {children}
        </button>
    )
)`} />
                        <Link href="https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop">See the React 19 announcement</Link>
                    </PostNote>
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="interaction-logic">Adding Interaction Logic</Heading>

                    <Heading headingLevel={3} id="why-custom-hook">Why Use a Custom Hook?</Heading>
                    <p>We&apos;ll separate our interaction logic into a custom hook for several reasons:</p>
                    <ul>
                        <li>Easier testing of business logic</li>
                        <li>Reusable across different button variants</li>
                        <li>Cleaner component code</li>
                        <li>Better error handling</li>
                    </ul>

                    <Heading headingLevel={3} id="basic-click-handler">Basic Click Handler</Heading>
                    <Code codeString={`// useButton.ts
export default function useButton() {
    const handleClick = (userHandler) => {
        return async (event) => {
            return await userHandler(event);
        }
    }

    return { handleClick }
}`} />

                    <p>This creates an async wrapper around any click handler, preparing us for async operations.</p>

                    <Heading headingLevel={3} id="error-handling">Adding Error Handling</Heading>
                    <p>Real applications need robust error handling:</p>

                    <Code codeString={`const handleClick = (userHandler) => {
    return async (event) => {
        // Early return if no handler provided
        if (!userHandler) return;
        
        try {
            return await userHandler(event);
        } catch (err) {
            console.error("Button click error", err);
            throw err; // Re-throw for upstream handling
        }
    }
}`} />

                    <Heading headingLevel={3} id="type-safety">Type Safety</Heading>
                    <p>Let&apos;s add proper TypeScript types for our click handler:</p>

                    <Code codeString={`type ButtonClickHandler<T = void> = (
    event: React.MouseEvent<HTMLButtonElement>
) => T | Promise<T>;

export default function useButton() {
    const handleClick = <T = void>(userHandler?: ButtonClickHandler<T>) =>
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!userHandler) return;

            try {
                return await userHandler(event);
            } catch (err) {
                console.error("Button click error", err);
                throw err;
            }
        };

    return { handleClick };
}`} />

                    <p>This provides:</p>
                    <ul>
                        <li>Type safety for the mouse event</li>
                        <li>Flexible return types using generics</li>
                        <li>Support for both sync and async handlers</li>
                        <li>Proper error propagation</li>
                    </ul>

                    <Heading headingLevel={3} id="integrating-hook">Integrating the Hook</Heading>
                    <Code codeString={`// Button.tsx
import { useButton } from "./useButton";

export default function Button({children, onClick, ref, ...props}) {
    const { handleClick } = useButton();

    return (
        <button
            ref={ref}
            onClick={handleClick(onClick)}
            {...props}
        >
            {children}
        </button>
    )
}`} />
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="essential-features">Essential Button Features</Heading>

                    <Heading headingLevel={3} id="preventing-form-submission">Preventing Accidental Form Submission</Heading>
                    <p>Set a default button type to prevent accidental form submissions:</p>

                    <Code codeString={`export default function Button({
    children, 
    onClick, 
    ref, 
    type = "button",  // Default to "button", not "submit"
    ...props 
}) {
    // ... rest of component
}`} />

                    <Heading headingLevel={3} id="loading-state">Loading State Support</Heading>
                    <p>Add loading state handling for better UX:</p>

                    <Code codeString={`export default function Button({
    children,
    onClick,
    ref,
    type = "button",
    isLoading = false,
    disabled,
    className,
    ...props
}) {
    const { handleClick } = useButton();

    return (
        <button
            ref={ref}
            className={clsx("button", className)}
            onClick={handleClick(onClick)}
            type={type}
            disabled={isLoading || disabled}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    )
}`} />

                    <p>This provides:</p>
                    <ul>
                        <li>Visual loading feedback</li>
                        <li>Accessibility support with <Code inline codeString="aria-busy" /></li>
                        <li>Prevention of multiple clicks during loading</li>
                    </ul>

                    <Heading headingLevel={3} id="updated-types">Updated Type Definitions</Heading>
                    <Code codeString={`// button.type.ts
export type ButtonProps = {
    isLoading?: boolean;
    ["data-style"]?: "outline" | "filled";
    ["data-variant"]?: "primary" | "secondary" | "accent";
} & React.ComponentPropsWithRef<"button">`} />
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="accessible-styling">Accessible Styling</Heading>

                    <Heading headingLevel={3} id="wcag-compliance">WCAG Compliance Foundation</Heading>
                    <p>Our CSS starts with accessibility requirements:</p>

                    <Code lang="css" codeString={`@layer base {
    .button {
        /* WCAG Target Size Requirements */
        /* AA: 24px minimum, AAA: 44px minimum */
        min-height: 44px;
        min-width: 44px;
        
        /* Generous margins for motor accessibility */
        margin: 8px;
    }
}`} />

                    <p>This ensures:</p>
                    <ul>
                        <li>Minimum 44px target size (WCAG AAA)</li>
                        <li>Extra margin for users with motor challenges</li>
                        <li>Works well for touch devices</li>
                    </ul>

                    <PostNote>
                        <Heading headingLevel={4}>Minimum Target Size</Heading>
                        <p>
                            The <strong>AA</strong> rating requires a minimum target size of 24x24 pixels, but since
                            over 60% of all internet traffic comes from mobile users, I suggest aiming for the
                            <strong>AAA</strong> requirement of 44x44 pixels.
                        </p>
                        <p>
                            This sizing ensures that anyone using a touch device has a good chance to hit the button
                            when they&apos;re trying to. Both iOS guidelines and Material Design use similar sizing.
                        </p>
                    </PostNote>

                    <Heading headingLevel={3} id="css-reset">CSS Reset and Base Styles</Heading>
                    <Code lang="css" codeString={`.button {
    /* Reset browser defaults */
    -webkit-appearance: none;
    appearance: none;
    background: none;
    background-color: transparent;
    
    /* Inherit context styles */
    color: currentColor;
    font: inherit;
    font-size: 1rem;
    line-height: 1.25;
    text-align: center;
    vertical-align: middle;
    
    /* Improve font rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* Base border and outline */
    border: 1px solid currentColor;
    border-radius: 0;
    box-shadow: none;
    outline: 0;
    outline-color: currentColor;
    outline-offset: 0;
    
    /* Remove default padding */
    padding: 0;
    
    /* Smooth transitions */
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease,
        outline 0.2s ease;
}`} />

                    <Heading headingLevel={3} id="user-preferences">Respect User Preferences</Heading>
                    <Code lang="css" codeString={`@media (prefers-reduced-motion: reduce) {
    .button {
        transition: none !important;
        animation: none !important;
    }
}`} />

                    <Heading headingLevel={3} id="interactive-states">Interactive States</Heading>
                    <Code lang="css" codeString={`button {
    cursor: pointer; /* Only on actual button elements */
}

.button {
    &:hover {
        outline: 1px solid currentColor;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    }

    &:focus-visible {
        outline: 1px solid currentColor;
        outline-offset: 1px;
        box-shadow: none;
    }

    &:active {
        outline: 1px dotted currentColor;
        outline-offset: 1px;
        transform: translateY(1px);
    }

    &:disabled {
        cursor: not-allowed;
        /* Use solid colors instead of opacity for contrast */
        color: #4d4d4d;
        background-color: #e0e0e0;
        border-color: #262626;
        
        /* Remove interactive effects when disabled */
        &:hover,
        &:focus-visible,
        &:active {
            outline: none;
            box-shadow: none;
            transform: none;
        }
    }
}`} />
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="flexible-styling">Flexible Styling System</Heading>

                    <Heading headingLevel={3} id="css-variables">CSS Custom Properties</Heading>
                    <p>Replace hardcoded values with CSS variables for easy customization:</p>

                    <Code lang="css" codeString={`@layer base {
    .button {
        /* Customizable properties */
        --button-color: currentColor;
        --button-font-size: 1rem;
        --button-bg-color: transparent;
        --button-border: 1px solid currentColor;
        --button-border-radius: 8px;
        --button-margin-y: 8px;
        --button-margin-x: 8px;
        --button-margin: var(--button-margin-y) var(--button-margin-x);
        --button-padding-y: 0.25em;
        --button-padding-x: 0.5em;
        --button-padding: var(--button-padding-y) var(--button-padding-x);

        /* Apply the variables */
        min-height: 44px;
        min-width: 44px;
        background-color: var(--button-bg-color);
        color: var(--button-color);
        font-size: var(--button-font-size);
        border: var(--button-border);
        border-radius: var(--button-border-radius);
        margin: var(--button-margin);
        padding: var(--button-padding);
    }
}`} />

                    <Heading headingLevel={3} id="color-system">Color System</Heading>
                    <p>Define a consistent color palette:</p>

                    <Code lang="css" codeString={`:root {
    /* Primary (Blue) */
    --color-primary-200: hsl(212, 61%, 61%);
    --color-primary-400: hsl(212, 70%, 48%);
    --color-primary-600: hsl(212, 85%, 22%);

    /* Secondary (Green) */
    --color-secondary-200: hsl(154, 20%, 52%);
    --color-secondary-400: hsl(155, 45%, 35%);
    --color-secondary-600: hsl(154, 80%, 20%);

    /* Accent (Purple) */
    --color-accent-200: hsl(314, 20%, 55%);
    --color-accent-400: hsl(314, 80%, 47%);
    --color-accent-600: hsl(314, 80%, 24%);

    /* Neutral colors */
    --color-neutral-100: hsl(0, 0%, 100%);
    --color-neutral-200: hsl(0, 0%, 88%);
    --color-neutral-300: hsl(0, 0%, 70%);
    --color-neutral-400: hsl(0, 0%, 46%);
    --color-neutral-600: hsl(0, 0%, 30%);
    --color-neutral-800: hsl(0, 0%, 15%);
}`} />

                    <Heading headingLevel={3} id="button-variants">Button Variants</Heading>

                    <Heading headingLevel={4} id="base-styles">Base Styles</Heading>
                    <Code lang="css" codeString={`/* Default button appearance */
.button {
    --button-color: var(--color-neutral-600);
    --button-bg-color: var(--color-neutral-100);
    --button-border-color: var(--color-neutral-600);
}`} />

                    <Heading headingLevel={4} id="style-variants">Style Variants</Heading>
                    <Code lang="css" codeString={`/* Filled style */
.button[data-style="filled"] {
    --button-color: var(--color-neutral-100);
    --button-bg-color: var(--color-neutral-600);
    --button-border-color: var(--color-neutral-800);

    &:hover {
        --button-bg-color: var(--color-neutral-400);
    }

    &:disabled {
        --button-color: var(--color-neutral-100);
        --button-bg-color: var(--color-neutral-400);
        --button-border-color: var(--color-neutral-400);
    }
}

/* Outline style */
.button[data-style="outline"] {
    --button-color: var(--color-neutral-600);
    --button-bg-color: var(--color-neutral-100);
    --button-border-color: var(--color-neutral-600);

    &:hover {
        --button-color: var(--color-neutral-100);
        --button-bg-color: var(--color-neutral-600);
    }

    &:disabled {
        --button-color: var(--color-neutral-400);
        --button-border-color: var(--color-neutral-400);
    }
}`} />

                    <Heading headingLevel={4} id="color-variants">Color Variants</Heading>
                    <Code lang="css" codeString={`/* Primary variant */
.button[data-variant="primary"] {
    --button-outline-color: var(--color-primary-200);

    &[data-style="filled"] {
        --button-color: var(--color-neutral-100);
        --button-bg-color: var(--color-primary-400);
        --button-border-color: var(--color-primary-600);

        &:hover {
            --button-bg-color: var(--color-primary-600);
        }
    }

    &[data-style="outline"] {
        --button-color: var(--color-primary-600);
        --button-border-color: var(--color-primary-600);

        &:hover {
            --button-color: var(--color-neutral-100);
            --button-bg-color: var(--color-primary-600);
        }
    }
}

/* Secondary and Accent variants follow the same pattern */`} />

                    <Heading headingLevel={3} id="touch-optimization">Touch Device Optimization</Heading>
                    <Code lang="css" codeString={`@media screen and (any-pointer: coarse) {
    .button {
        --button-margin-y: 12px;
        --button-margin-x: 12px;
    }
}`} />
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="testing-strategy">Testing Strategy</Heading>

                    <Heading headingLevel={3} id="jest-setup">Setting Up Jest</Heading>
                    <p>Install testing dependencies:</p>

                    <Code codeString={`npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest`} />

                    <p>Configure Jest:</p>
                    <Code codeString={`// jest.config.ts
import type {Config} from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageProvider: 'v8',
    coverageDirectory: "coverage",
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)`} />

                    <p>Setup file:</p>
                    <Code codeString={`// jest.setup.ts
import '@testing-library/jest-dom';`} />

                    <Heading headingLevel={3} id="component-tests">Component Tests</Heading>
                    <Code codeString={`import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/button";

describe("Base Button", () => {
    test("renders with children", () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByRole("button")).toHaveTextContent("Click Me");
    });

    test("shows loading state", () => {
        render(<Button isLoading={true}>Click Me</Button>);
        expect(screen.getByRole("button")).toHaveTextContent("Loading...");
        expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    test("handles click events", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("forwards ref correctly", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<Button ref={ref}>Ref Test</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test("defaults to button type", () => {
        render(<Button>Test Type</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
});`} />

                    <Heading headingLevel={3} id="hook-tests">Hook Tests</Heading>
                    <Code codeString={`import { renderHook, act } from "@testing-library/react";
import useButton from "../../../components/button/useButton";

describe("useButton", () => {
    let consoleErrorSpy: jest.SpyInstance;
    let handleClick: ReturnType<typeof useButton>["handleClick"];

    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    beforeEach(() => {
        const { result } = renderHook(() => useButton());
        handleClick = result.current.handleClick;
        consoleErrorSpy.mockClear();
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    it("handles sync functions", async () => {
        const mockHandler = jest.fn().mockReturnValue("sync result");
        const clickHandler = handleClick(mockHandler);

        let result;
        await act(async () => {
            result = await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
        });

        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(result).toBe("sync result");
    });

    it("logs and rethrows errors", async () => {
        const error = new Error("Test error");
        const mockHandler = jest.fn().mockImplementation(() => { throw error; });
        const clickHandler = handleClick(mockHandler);

        await expect(
            act(async () => {
                await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
            })
        ).rejects.toThrow(error);

        expect(consoleErrorSpy).toHaveBeenCalledWith("Button click error", error);
    });
});`} />
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="usage-examples">Usage Examples</Heading>

                    <Code codeString={`'use client'
import Button from "@/components/button";

export default function ButtonsPage() {
    return (
        <div>
            <Button>Standard Button</Button>
            <Button isLoading={true}>Loading Button</Button>
            
            <Button data-style="filled" data-variant="primary">
                Primary Filled
            </Button>
            
            <Button data-style="outline" data-variant="secondary">
                Secondary Outline
            </Button>
        </div>
    )
}`} />
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="what-we-built">What We Built</Heading>
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

                <PostSection>
                    <Heading headingLevel={2} id="whats-next">What&apos;s Next</Heading>
                    <p>
                        In the next post, we&apos;ll extend this foundation to create toggle buttons and explore
                        setting up Storybook to document our growing design system.
                    </p>
                    <p>
                        The patterns we&apos;ve established here will serve as the foundation for more complex
                        components like button groups, tab lists, and interactive panels.
                    </p>

                    <Link href="./sliders">Next: Slider Buttons</Link>
                </PostSection>
            </Post>

            <PostSideBar
                contents={[
                    { id: "what-were-building", href: "#what-were-building", label: "What We're Building" },
                    { id: "project-setup", href: "#project-setup", label: "Project Setup" },
                    { id: "building-foundation", href: "#building-foundation", label: "Building the Foundation" },
                    { id: "interaction-logic", href: "#interaction-logic", label: "Adding Interaction Logic" },
                    { id: "essential-features", href: "#essential-features", label: "Essential Button Features" },
                    { id: "accessible-styling", href: "#accessible-styling", label: "Accessible Styling" },
                    { id: "flexible-styling", href: "#flexible-styling", label: "Flexible Styling System" },
                    { id: "testing-strategy", href: "#testing-strategy", label: "Testing Strategy" },
                    { id: "usage-examples", href: "#usage-examples", label: "Usage Examples" },
                    { id: "what-we-built", href: "#what-we-built", label: "What We Built" },
                    { id: "whats-next", href: "#whats-next", label: "What's Next" }
                ]}
            />
        </>

    )
}