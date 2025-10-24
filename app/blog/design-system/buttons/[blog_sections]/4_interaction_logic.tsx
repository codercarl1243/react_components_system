import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import Figure from "@/components/image/figure";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";


export default function Section4() {

    return (
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
import log from '@/lib/logging/log';
import isThenable from '@/lib/utils/guards';

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
                    src={'/images/handleClick_flow.webp'}
                    sources={[
                        { media: '(max-width: 560px)', srcSet: '/images/handleClick_Flow_vertical.webp' },
                    ]}
                    caption={
                        <>
                            The onClick handler ensures that we log both synchronous errors <span className="bold italic">(caught and re-thrown immediately)</span> and asynchronous errors <span className="bold italic">(logged via attached <Code codeString=".catch()" copyEnabled={false} inline /> handler when Promise rejects later)</span>.
                        </>}
                />
            </PostNote>

        </PostSection>
    )
}