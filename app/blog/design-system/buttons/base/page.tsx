import Code from "@/components/code";
import Heading from "@/components/heading";
import Link from "@/components/link";
import Post from "@/components/post";
import PostBanner from "@/components/post/post.banner";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import PostSideBar from "@/components/post/post.sidebar";


export default function ButtonsBasePage() {

    return (
        <>

            <Post className="flow-8">
                <PostSection>
                    <PostBanner
                        title={"The Button"}
                        image={{
                            src: "",
                        }}
                    />
                    <p>
                        This is the first in a series where we are building a Button design system.
                        We will be creating a base for a flexible, accessible, and composable button system in React.
                        Future button components will all be building off of this one button.
                    </p>
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="project-structure">Project Structure</Heading>
                    <p>
                        For ease of reference I will be following a basic format for files and folders:
                    </p>
                    <ul>
                        <li>A folder for the component</li>
                        <li>A type file</li>
                        <li>A CSS file in the styles folder.</li>
                        <li>An index file for the component...</li>
                        <li>and Depending on the component, we will create a custom Hook that handles all of the logic</li>
                        <li>Variants on the main component will receive individual files.</li>
                    </ul>
                    <Code lang="md" codeString={`components/
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
    └── button.css              // Styling
                    `} />

                    <p>
                        I have installed a couple of additional packages:
                    </p>
                    <ul>
                        <li><Link href="https://www.npmjs.com/package/@remixicon/react">RemixIcons</Link> to leverage their extensive and free library of icons</li>
                        <li><Link href="https://www.npmjs.com/package/clsx">clsx</Link> to handle class names</li>
                        <li>and a number of Jest related packages to run tests (<Link href="https://www.npmjs.com/package/jest">jest</Link>, <Link href="https://www.npmjs.com/package/jest-environment-jsdom">jest-environment-jsdom</Link>, <Link href="https://www.npmjs.com/package/@testing-library/react">@testing-library/react</Link>, <Link href="https://www.npmjs.com/package/@testing-library/dom">@testing-library/dom</Link>, <Link href="https://www.npmjs.com/package/@testing-library/jest-dom">@testing-library/jest-dom</Link>, <Link href="https://www.npmjs.com/package/ts-node">ts-node</Link>, <Link href="https://www.npmjs.com/package/@types/jest">@types/jest</Link>)</li>
                    </ul>
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="starting-code">Starting Code</Heading>

                    <p>Our starting point is a simple HTML button, which will be the foundation for building more complex buttons like toggles and switches, all the way to tablists and button panels.</p>

                    <Code codeString={`//button.tsx
"use client"
export default function Button({children, ...props }){
    return <button {...props}>
                {children}
            </button>
}`}
                    />

                    <p>
                        This has to be labelled as a client component because we&apos;ll handle interactions on the client side with functions that cant be serialized in the build step on the server. The ref is deliberately added to the props to communicate intent and the ability for the button to have a ref if the project has a use-case for it.
                    </p>
                    <PostNote>
                        <Heading headingLevel={3} id="react-ref-deprecation">React Ref inside of props and the deprecation of forwardRef</Heading>
                        <p>As of React 19, the team came out and said that they would be deprecating forwardRef some time in the future and have prepared for that by adding the ability to just grab the ref from the props.
                            If you&apos;re using an older version you would still need to use forwardRef to pass through Refs properly.</p>

                        <Code layout="content" codeString={`import { forwardRef } from "react";
import type {ComponentProps} from "react";
                    
const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
    ({children, ...props }, ref) => (
        <button ref={ref} {...props}>
            {children}
        </button>
    )
)`} />

                        <Link href="https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop" style={{ marginInlineStart: "auto" }}>see the original post</Link>
                    </PostNote>


                    <Code codeString={`export default function Button({children, ref, ...props }){
    return <button ref={ref} {...props}>{children}</button>
}`} />

                    <p>
                        Typescript will complain because it doesnt understand what these props are. We can use the intellisense of the code editor to see the return type of the component is a html button and it is receiving basic component attributes <strong>plus</strong> the ref. React provides for this sort of situation with a built-in type helper <Code inline codeString={` type BaseButtonProps = React.ComponentPropsWithRef<"button">;`} />.
                    </p>
                    <p>
                        As we build out more complex buttons, their typing <strong>will</strong> build on the props being passed through here, so I am going to extract this into the buttons&apos; type file.
                    </p>
                    <Code codeString={`//button.type.ts
import { ComponentPropsWithRef } from "react";

export type BaseButtonProps = ComponentPropsWithRef<"button">;`} />
                    <p>
                        As of now our component:
                    </p>
                    <ul>
                        <li>Renders a standard HTML button</li>
                        <li>Passes through a ref; and..</li>
                        <li>Allows standard button props within the component</li>
                    </ul>
                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="onclick-handler">The onClick handler with Custom Hook</Heading>
                    <p>
                        <span className="bold">Moving on to the interaction handling!</span> We will keep all the logic in a custom hook in <Code codeString={`./useButton.tsx`} inline />.
                    </p>

                    <div>
                        {/* grid this to place side by side */}
                        <Code codeString={`export default function useButton() {

    const handleClick = () => { }

    return {handleClick}
}`} />
                        <Code codeString={`export default function Button({children, onClick, ref, ...props }){
    const {handleClick} = useButton();

    return <button
        ref={ref}
        onClick={handleClick(onClick)}
        {...props}
    >
        {children}
    </button>
}`} />
                    </div>
                    <p>I&apos;m just going to create a route for buttons and nextJS requires a page in here which I will render our button inside of.</p>

                    {/* 👉 **🎬 Create a page file and navigate to 3000/buttons,** */}

                    <Code codeString={`"use client"
import Button from "@/components/button";

export default function ButtonsPage() {
    return <div>
                <Button className="check">Here</Button>
            </div>
}`} />


                    <Heading headingLevel={3} id="type-safety">Adding Type-Safety</Heading>
                    <p>lets quickly cover the questions that a QA or manager is going to ask us.</p>
                    <ol>
                        <li>What if we make a request to another service online?
                            <div>The current response wont be there before the reliant code tries to keep going. This will cause errors</div>
                        </li>
                        <li>what if an error happens?
                            <div>There is no error handling at present</div>
                        </li>
                        <li>How do we make this type safe?</li>
                    </ol>
                    <p>So lets mark these off add some async magic to the button</p>

                    <Code codeString={`const handleClick = (userHandler) => {
return async (event) => {
    return await userHandler(event);
}}`} />

                    <p>lets now cover the simple possible errors.</p>
                    <ul>
                        <li>Human errors occur where we the devs might just forget to pass a function.
                            <div>So lets add an early escape to prevent future us from making that an issue.</div>
                        </li>
                        <li>If there is an error in the function that is being passed through we should log it but I dont think that we should resolve the error here inside a generic component.
                            <div>lets add a try catch, log out any errors and throw these errors further up the chain.</div>
                        </li>
                    </ul>
                    <Code codeString={`const handleClick = (userHandler) => {
return async (event) => {
    if (!userHandler) return;
    try {
        return await userHandler(event);
    } catch (err) {
        console.error("Button click error", err);
        throw err;
    }
}}`} />
                    <p>
                        Finally onto the type safety of our onClick handler.
                        {/* TODO add image of intellisense maybe?*/}
                        If we hover over the onclick attribute of the button element, we get all the types we need.
                        The event originates from a <Code lang="tsx" codeString="HTMLButtonElement" inline /> and is a <Code lang="tsx" codeString="MouseEvent" inline />.
                    </p>
                    <p>We dont know what future handlers will be returning so lets keep it flexible by using a generic and allowing the button variants to type it strictly if needed, lets default it to void though.</p>
                    <Code codeString={`type ButtonClickHandler<T = void> = (event: React.MouseEvent<HTMLButtonElement>) => T | Promise<T>;

export default function useButton() {

const handleClick = 
    <T = void>(userHandler?: ButtonClickHandler<T>) =>
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!userHandler) return;

            try {
                // Await works for both sync and async handlers
                return await userHandler(event);
            } catch (err) {
                console.error("Button click error", err);
                throw err;
            }
        };

return {handleClick};
}`} />

                </PostSection>

                <PostSection>
                    <Heading headingLevel={2} id="final-touches">
                        Final Touches
                    </Heading>
                    <p>
                        The final touches for the button will be to do 3 small things
                    </p>
                    <ol>
                        <li>lets remove any oops moments by specifying a type of button. This should prevent any buttons inside of a form from accidentally initiating a submit when clicked.
                            <div>Passing a type in the props will overwrite that of course.</div>
                        </li>
                        <li>Add a loading state.
                            This will just be a prop passed through to the button and will ensure that every single button in the app will communicate state to the user in the same consistent manner.
                            <div>
                                We can disable the button while it is loading, and add an aria-busy attribute to tell screen readers that this button is processing the click. Changing the text content from the original label to &quot;Loading...&quot; provides clear feedback to all users about the current state.
                            </div>
                        </li>
                        <li>Add some css styling to give us a clean button with some baked in accessibility</li>
                    </ol>

                </PostSection>
                <PostSection>
                    <Heading headingLevel={2} id="css-styling">CSS Styling</Heading>
                    <PostNote>
                        <Heading headingLevel={3}>CSS Or Libraries??</Heading>
                        <p>to do this I am going to use good old CSS rather than any libraries. feel free to do whatever you prefer.</p>
                    </PostNote>
                    <p>As mentioned previously I have installed CLSX to ensure class names are joined cleanly and conditional class name logic is respected.</p>
                    <Code codeString={`"use client"

export default function Button({
className, onClick, disabled, ref, isLoading = false, type = "button", children, ...props 
}){
    const {handleClick} = useButton();
    return <button
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
}`} />

                    <p>Because this is our base Button I am going to wrap all of this CSS inside a layer to ensure it can be overwritten easily.</p>
                    <Code codeString={`@layer base { }`} lang="css" />

                    <p>lets ensure that we respect the WCAG&apos;s minimum target size requirements for interactive elements - <em>especially as the number of countries with some level of legal requirement in place is growing each year.</em> </p>
                    <PostNote>
                        <Heading headingLevel={3}>Minimum target size</Heading>
                        <p>
                            The <span className="bold">AA</span> rating requires a minimum target size of 24x24 pixels , but since <em>over 60% of all internet traffic comes from mobile users</em>, I suggest aiming for the <span className="bold">AAA</span> requirement of 44x44 pixels. This sizing ensures that anyone using a touch device has a pretty good chance to hit the button when they are trying to.

                            Both the IOS guidelines and Material Design use similar sizing so users are already familiar with this.

                        </p>
                    </PostNote>
                    <p>
                        We can also add a bit of <span className="italic">UX embellishment</span> here by applying margins around the button by default. This helps users with motor function challenges, such as:</p>
                    <ul>
                        <li>hand tremors</li>
                        <li>anyone using a device 1 handed</li>
                        <li>people on public transport that might be bumped around</li>
                        <li>or just folks with larger-than-average fingers.</li>
                    </ul>

                    <p>So I&apos;m going to bump the <span className="bold">minimum height and width to 44px</span>, and add <span className="bold">8px of margin</span> around each button.

                        If you&apos;ve used any touch device in the past year, you&apos;re already familiar with these sizes — both Android and iOS follow this success criterion.</p>



                    <Code lang="css" codeString={`/* 
    WCAG Target Size Requirements
    https://www.wcag.com/developers/2-5-8-target-size-minimum-level-aa/ 
*/
/* AA: 24px x 24px minimum */
/* AAA: 44px x 44px minimum */

min-height: 44px;
min-width: 44px;
margin: 8px;`} />
                    <p>lets zoom through this next part. we are going reset the styling to remove any padding, borders, and appearances.</p>



                    <Heading headingLevel={3}>CSS Reset</Heading>
                    <Code lang="css" codeString={`

/* We reset the appearance so the button looks consistent across browsers. */
-webkit-appearance: none;
appearance: none;

/*
    Strip out default styles and background 
    We use the currentColor keyword for borders and text so it adapts automatically to contexts, like dark mode
*/
background: none;
background-color: transparent;
color: currentColor; /* Inherit text color from parent */

/* 
    Font and text styling for consistency 
    Fonts are not inherited by buttons and other inputs due to the differences in opinions in the browsers\' default style sheets 
*/
font: inherit; /* Inherit font family, weight, etc. from parent */
font-size: 1rem; /* Standardize font size for predictability */
line-height: 1.25; /* Improve vertical spacing for legibility */
text-align: center; /* Center text to ensure easier reading */
vertical-align: middle;
-webkit-font-smoothing: antialiased; /* Improve font rendering on WebKit */
-moz-osx-font-smoothing: grayscale; /* Improve font rendering on Firefox/Mac */

/* Remove default button borders and provide base styles */
border: 1px solid currentColor; /* Thin baseline border */
border-radius: 0; /* Flat edges by default for consistency */
box-shadow: none; /* Reset shadows */
outline: 0; /* Remove browser default outlines */
outline-color: currentColor; /* Sync outline color with text */
outline-offset: 0; /* Keep outline aligned tightly */

/* Strip out all padding so component logic controls spacing */
padding: 0;

/* Base transition styles for visual polish */
transition:
background-color 0.2s ease,
color 0.2s ease,
border-color 0.2s ease,
outline 0.2s ease;
`} />

                    <p>I&apos;m going to take this opportunity to remove any transitions and animations if the user of the site has preferences against it.</p>

                    <Code lang="css" codeString={`@media (prefers-reduced-motion: reduce) {
    .button {
        transition: none !important;
        animation: none !important;
    }
}`} />

                    <p>lets give it a cursor of pointer to show the user that it is interactive, but we&apos;re only adding this to actual <Code inline={true} codeString={`<button>`} /> elements - because in some edge cases, we might style non-interactive elements to look like buttons for layout consistency. We don&apos;t want to imply interactivity with a hand cursor if clicking doesn&apos;t do anything.</p>

                    <Code lang="css" codeString={`button{
    /*
      dont add cursor: pointer to the button class.
        we might style other non-interactive elements to look like button boxes but we dont want to suggest interactivity
    */
    cursor: pointer;
}`} />

                    <p>and lets add in some base hover, focus-visible, active, and disabled indicators.</p>

                    <Code lang="css" codeString={`&:hover {
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
    transform: translateY(1px)
}

&:disabled {
    cursor: not-allowed;
    /* 
    We could choose to reduce the opacity here, and you will find this done all over the internet but this is one of those things that can result in contrast issues creeping into your website and its quite likely that none of the automated contrast checkers will pick it up. So we will just give it a grey color rather than reduce the opacity.
    */
    color: #4d4d4d;
    background-color: #e0e0e0;
    border-color: #262626;
    /* Remove hover/focus effects when disabled */
    &:hover,
    &:focus-visible,
    &:active {
        outline: none;
        box-shadow: none;
        transform: none;
    }
}`} />

                    {/* 👉 **🎬 Replace button styling with CSS variables where possible.** */}

                    <p>
                        Now that we have a good base. I&apos;m going to quickly replace some of this css with css variables that can be used to customize our buttons moving forward.
                        a couple of these css statements reference css variables that wont be used at first but are now open for us to hook into.
                    </p>
                    <Code lang="css" codeString={`@layer base {
    .button {
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

        min-height: 44px;
        min-width: 44px;
        -webkit-appearance: none;
        appearance: none;
        background: none;
        background-color: var(--button-bg-color);
        color: var(--button-color);

        /* font and font styling */
        font: inherit;
        font-size: var(--button-font-size);
        line-height: 1.25;
        text-align: center;
        vertical-align: middle;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        /* borders and outlines */
        border: var(--button-border);
        border-radius: var(--button-border-radius);
        border-color: var(--button-border-color);
        box-shadow: var(--button-shadow);
        outline: var(--button-outline);
        outline-color: var(--button-outline-color);
        outline-offset: var(--button-outline-offset, 2px);

        margin: var(--button-margin);
        padding: var(--button-padding);

        transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease,
        outline 0.2s ease,
        var(--button-transitions);

        &:focus-visible {
            --button-outline: 2px solid;
            --button-outline-offset: 4px;
            --button-shadow: none;
    }

    &:hover {
        --button-outline: 1px solid;
        --button-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    }

    &:active {
        --button-outline: 1px dotted;
        transform: translateY(1px);
    }

    &:disabled {
        cursor: not-allowed;
        --button-color: var(--color-neutral-600);
        --button-bg-color: var(--color-neutral-200);
        --button-border-color: var(--color-neutral-800);

        /* Remove hover/focus effects when disabled */
        &:hover,
        &:focus-visible,
        &:active {
            --button-outline: none;
            --button-shadow: none;
            transform: none;
            }
    }
}

@media screen and (any-pointer: coarse) {
    .button {
        --button-margin-y: 12px;
        --button-margin-x: 12px;
    }
}
}`} />
                    <p>While this might seem like a lot for a starting point, this will ensure that the styling is consistent across browsers and we can hook into it easily with minimal effort. So lets add some base variants that are styling specific. To make this a bit easier I have gone and asked our AI overlords to create a color theme giving us  primary, secondary, accent and neutral colours to use. Later on in this series you will find that the colours provided here wont always meet contrast requirements, so double check anything provided by an AI, and when in doubt there are some great colour tools out there online.</p>

                    <Code lang="css" codeString={`    /* Primary (Blue) */
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
`} />

                    <p>what I am doing here is creating a couple of hooks that we will use to style the buttons. Creating 2 distinct looks without adding much complexity. the difference in borders, outlines and shadows are already done in the base button styling. These will just decide when one of the colours will be used.</p>

                    <Code lang="css" codeString={`/* Base button (no variant) */
.button {
    --button-color: var(--color-neutral-600);
    --button-bg-color: var(--color-neutral-100);
    --button-border-color: var(--color-neutral-600);
}

/* Filled style */
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
}}`} />
                   <p> the outline colour for the buttons cant be the current colour because a lot of the variants will end up with white text which results in white outlines and we have a white background.

                    and then we can hook into this for our 3 main variants (primary, secondary, and accent)
                    I will just create the styling for one variant and copy that 2 more times and just change the wording; Now we could try to condense this sort of declaration down to 6 or 8 lines of css variables that change per variant but I find doing it this way is much easier for a developer to see exactly whats happening. This will come in handy later on as we use these color variants for our more complicated components</p>

                    <Code lang="css" codeString={`.button[data-variant="primary"] {
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
}`} />
                    <p>to ensure typos are caught and that we only use the variants and styles that are available, lets update the typing.</p>

                    <Code codeString={`export type ButtonProps = {
    isLoading ?: boolean;
    ["data-style"]?: "outline" | "filled";
    ["data-variant"]?: "primary" | "secondary" | "accent";
} & React.ComponentPropsWithRef<"button">`} />

                    {/* 👉 **🎬 Create button variants on Button Page** */}

                    <Code codeString={`"use client"
import Button from "@/components/button";

export default function DefaultButtons() {

    return (
        <fieldset style={{ display: "flex", gap: "2rem", borderColor: "lightBlue" }}>
            <legend>Base Buttons</legend>
            <div style={{ padding: "1em" }}>
                <h2>Standard Button</h2>
                <Button>standard</Button>
                <Button isLoading={true}>standard</Button>
            </div>
            <div style={{ padding: "1em" }}>
                <h2>Primary Buttons</h2>
                <Button data-style="filled" data-variant="primary">filled</Button>
                <Button data-style="filled" data-variant="primary" isLoading={true}>loading</Button>
                <Button data-style="outline" data-variant="primary">outline</Button>
                <Button data-style="outline" data-variant="primary" isLoading={true}>loading</Button>
            </div>
            <div style={{ padding: "1em" }}>
                <h2>Secondary Buttons</h2>
                <Button data-style="filled" data-variant="secondary">filled</Button>
                <Button data-style="filled" data-variant="secondary" isLoading={true}>loading</Button>
                <Button data-style="outline" data-variant="secondary">outline</Button>
                <Button data-style="outline" data-variant="secondary" isLoading={true}>loading</Button>
            </div>
            <div style={{ padding: "1em" }}>
                <h2>Accent Buttons</h2>
                <Button data-style="filled" data-variant="accent">filled</Button>
                <Button data-style="filled" data-variant="accent" isLoading={true}>loading</Button>
                <Button data-style="outline" data-variant="accent">outline</Button>
                <Button data-style="outline" data-variant="accent" isLoading={true}>loading</Button>
            </div>
        </fieldset>
    )
}`} />
                    <p>
                        so I have gone ahead and added these buttons to the buttons page.
                        we can see that the styling works nicely regardless of the button&apos;s state.
                    </p>
                    <PostNote>
                        <p>In a design system, you will want to document and showcase all these variants in one place - that&apos;s where tools like Storybook really shine.
                            We&apos;ll explore setting up Storybook for our design system in the future.</p>
                    </PostNote>
                </PostSection>


                <PostSection>
                    <Heading headingLevel={2}>Testing</Heading>

                    <p>For anyone that wants to follow along you will need to install a few testing packages</p>

                    <p>links to these packages are down in the description. NextJS also has a helpful install line to copy if you wanted to follow their guide <Link href="https://nextjs.org/docs/app/guides/testing/jest">https://nextjs.org/docs/app/guides/testing/jest</Link></p>

                    {/* make it so we can copy this string */}
                    <Code codeString={`npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest`} />

                    <p>I am going to go through the basic setup.</p>
                    <Code codeString={`> Would you like to use Typescript for the configuration file? > Y;
> Choose the test environment that will be used for testing: JSDOM - we are testing components and interacting with the DOM.
> ? Do you want Jest to add coverage reports? Y - this will allow us to see the parts that our tests dont currently hit
> Which provider should be used to instrument code for coverage? V8 - its used in the browser. the components will be also in the browser. lets test in the same environment
> ? Automatically clear mock calls, instances, contexts and results before every test? Y
 `} />
                    <p>            99% of the time clean tests are good tests.

                        additional file
                        jest.setup.ts - this file gives us access to some useful helpers so we dont need to write as much (link in the description below)</p>

                    <Code codeString={`
// jest.setup.ts
import "@testing-library/jest-dom";
`} />
                    <p>and I am going to grab the jest.config file directly from the nextjs website and paste in the extra options that I selected yes to.</p>

                    <Code codeString={`
// jest.config.ts
import type {Config} from "jest"
import nextJest from "next/jest"

const createJestConfig = nextJest({
// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
dir: "./",
})

// Add any custom config to be passed to Jest
const config: Config = {
clearMocks: true,
collectCoverage: true,
coverageProvider: "v8",
coverageDirectory: "coverage",
testEnvironment: "jsdom",
moduleNameMapper: {
"^@/(.*)$": "<rootDir>/$1",
},
// Add more setup options before each test is run
setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
`} />

                    <p>                the tests that we are writing for the button are pretty straight forward
                        we will check:
                    </p>
                    <ul>
                        <li>the children is rendered</li>
                        <li>the children when it is loading</li>
                        <li>classnames can be passed through</li>
                        <li>the onclick works</li>
                        <li>handleClick is being called when the button is being clicked</li>
                        <li>the type works and is a button type by default</li>
                        <li>the ref is passed</li>
                        <li>disabled states work</li>
                        <li>aria-busy works</li>
                    </ul>

                    <Code codeString={`
import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import Button from "../../../components/button";

describe("Base Button", () => {
    test("renders with children", () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByRole("button")).toHaveTextContent("Click Me");
    });
    test("renders Loading isLoading prop is true", () => {
        render(<Button isLoading={true}>Click Me</Button>);
        expect(screen.getByRole("button")).toHaveTextContent("Loading...");
    });
    test("calls onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("passes through disabled prop and disables the button", () => {
        render(<Button disabled={true}>Disabled</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });
    test("sets aria-busy to true when loading", () => {
        render(<Button isLoading={true}>Click Me</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    })
    test("forwards ref to the button element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<Button ref={ref}>Ref Test</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test("supports custom className", () => {
        render(<Button className="custom-class">Styled</Button>);
        expect(screen.getByRole("button")).toHaveClass("button custom-class");
    });

    test("type defaults to 'button' to prevent accidental form submission", () => {
        render(<Button>Test Type</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    test("accepts type prop and overrides default", () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    test("calls useButton handleClick when clicked", () => {
        const mockHandler = jest.fn();

        render(<Button onClick={mockHandler}>Test Button</Button>);

        fireEvent.click(screen.getByRole("button"));

        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(mockHandler).toHaveBeenCalledWith(expect.any(Object));
    });
});
`} />
                    <Heading headingLevel={3}>Testing the Hook</Heading>
                    <p>for the hook we want to check:</p>
                    <ul>
                        <li>if no function is passed to handleClick, we get an early return</li>
                        <li>passing a function to the handleClick works</li>
                        <li>passing an async function to the handleClick works</li>
                        <li>logging happens when an error occurs</li>
                        <li>the error is re-thrown</li>
                    </ul>

                    <p>with the logging test, we can create a spy but it wont always be instantiated before the logging begins so we can create the spy in a beforeAll to ensure that it captures the log and it doesnt pollute the console.</p>

                    <Code codeString={`
import {renderHook, act} from "@testing-library/react";
import useButton from "../../../components/button/useButton";

let handleClick: ReturnType<typeof useButton>["handleClick"];

describe("useButton", () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    beforeEach(() => {
        const {result} = renderHook(() => useButton());
        handleClick = result.current.handleClick;
        consoleErrorSpy.mockClear();
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    it("calls the provided sync handler", async () => {
        const mockHandler = jest.fn().mockReturnValue("sync result");;
        const clickHandler = handleClick(mockHandler);

        let resultValue;
        await act(async () => {
            resultValue = await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
        });

        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(resultValue).toBe("sync result");
    });

    it("calls the provided async handler", async () => {
        const mockHandler = jest.fn().mockResolvedValue("async result");
        const clickHandler = handleClick(mockHandler);

        let resultValue;
        await act(async () => {
                resultValue = await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
        });

        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(resultValue).toBe("async result");
    });

    it("logs errors when sync handler throws", async () => {
        const error = new Error("Sync error");
        const mockHandler = jest.fn().mockImplementation(() => { throw error; });
        const clickHandler = handleClick(mockHandler);

        await expect(
            act(async () => {
                await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
            })
        ).rejects.toThrow(error);

        expect(consoleErrorSpy).toHaveBeenCalledWith("Button click error", error);
    });

    it("logs errors when async handler throws", async () => {
        const error = new Error("Async error");
        const mockHandler = jest.fn().mockRejectedValue(error);
        const clickHandler = handleClick(mockHandler);

        await expect(
            act(async () => {
                    await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
            })
        ).rejects.toThrow(error);

        expect(consoleErrorSpy).toHaveBeenCalledWith("Button click error", error);
    });

    it("rethrows errors from the handler", async () => {
        const error = new Error("Sync test error");
        const mockHandler = jest.fn().mockImplementation(() => { throw error; });
        const clickHandler = handleClick(mockHandler);

        await expect(
            act(async () => {
                    await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
            })
        ).rejects.toThrow(error);
    });

    it("rethrows async errors from the handler", async () => {
        const error = new Error("Async test error");
        const mockHandler = jest.fn().mockRejectedValue(error);
        const clickHandler = handleClick(mockHandler);

        await expect(
            act(async () => {
                    await clickHandler({} as React.MouseEvent<HTMLButtonElement>);
            })
        ).rejects.toThrow(error);
    });

    it("returns early if no handler is provided", async () => {
        const clickHandler = handleClick(undefined);

        const resultValue = await act(async () => {
            return await clickHandler({ } as React.MouseEvent<HTMLButtonElement>);
        });

        expect(resultValue).toBeUndefined();
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });   
});
        `} />

                </PostSection>

                <PostSection>
                    <Heading headingLevel={2}>Summary</Heading>
                    <p>
                        This about wraps up the button base.
                        So rounding the Button component up, We&apos;ve:
                    </p>
                    <ul>
                        <li>Isolated logic in a custom hook</li>
                        <li>Ensured accessible styling</li>
                        <li>Created flexible variants; while</li>
                        <li>added comprehensive unit tests for the button.</li>
                    </ul>

                    <p>
                        Next up, we&apos;ll take this button and extend it to create a toggle button,
                        {/* 👉 **🎬 Demo Toggle Button on Button Page** */}

                        and I&apos;ll also show you how to set up Storybook to document and visualize
                        all our design system components in one place.

                        Thanks for watching! Be sure to like and subscribe — I&apos;ll see you in the next one.
                    </p>
                        <section>
                            <Link href="./sliders">Next: Slider Buttons</Link>
                        </section>
                </PostSection>
            </Post>
            <PostSideBar
                contents={[
                    { id: "project-structure", href: "#project-structure", label: "Project Structure" },
                    { id: "starting-code", href: "#starting-code", label: "Starting Code" },
                    { id: "react-ref-deprecation", href: "#react-ref-deprecation", label: "React Ref and forwardRef Deprecation" },
                    { id: "onclick-handler", href: "#onclick-handler", label: "The onClick Handler with Custom Hook" },
                    { id: "type-safety", href: "#type-safety", label: "Adding Type-Safety" },
                    { id: "css-styling", href: "#css-styling", label: "CSS Styling" },
                    { id: "final-touches", href: "#final-touches", label: "Final Touches" },
                    { id: "summary", href: "#summary", label: "Summary" },
                ]}
            />
        </>

    )
}