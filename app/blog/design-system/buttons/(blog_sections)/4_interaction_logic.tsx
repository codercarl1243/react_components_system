import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import Figure from "@/components/image/figure";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { BaseButtonExample } from "../examples/BaseButtonExample";
import InlineCode from "@/components/code/inlineCode";


export default function Section4() {

    return (
        <PostSection id="interaction-logic">
            <AnchorHeading headingLevel={2} id="interaction-logic-heading">Interaction Logic</AnchorHeading>
            <p>
                Every button interaction should feel complete: <span className="italic">"I acted. Something responded."</span>
            </p>
            <p>
                Good buttons don't just execute code—they <FunHighlight>communicate</FunHighlight>. Users should always know their action was received.
            </p>
            <p>Try it out below:</p>

            <BaseButtonExample />
            <PostNote>
                <p>
                    This whimsical demo shows what's possible when buttons provide rich feedback. The bubbles are decorative, but the <span className="italic">principles</span> are production-ready:
                </p>
                <List ordered spacing="tight">
                    <li>The button prevents duplicate clicks during loading (isLoading state)</li>
                    <li>Visual feedback stays within the button's boundaries — <span className="italic">no unexpected layout shifts</span></li>
                    <li>Visual feedback is paired with accessible announcements using a live region</li>
                </List>
            </PostNote>

            <p>
                Behind the scenes is a simple logging layer. Every click flows through a custom hook that tracks interactions and logs errors—without changing how errors propagate or promises resolve.
            </p>
            <p>
                Before we dive into the implementation, let&apos;s clarify what responsibilities this hook needs to handle:
            </p>
            <p className="bold">The hook:</p>
            <List variant="circle">
                <li>Logs clicks in development</li>
                <li>Logs synchronous errors (then re-throws them)</li>
                <li>Attaches logging to unhandled Promise rejections</li>
                <li>Doesn't interfere with return values or error handling</li>
            </List>

            <Code
                title="useButton.tsx"
                codeString={`import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';
import log from '@/lib/logging/log';
import isThenable from '@/lib/utils/guards';

export default function useButton() {
    const handleClick = (userHandler?: ButtonClickHandler) =>

    // The actual click handler
    (event: MouseEventType) => {
        if (!userHandler) return

        try {
            const result = userHandler(event)

            if (process.env.NODE_ENV !== 'production') {
                log();
            }
/**
 * Note: This only catches rejections that the user handler did NOT catch.
 * If the user handler has its own try/catch, this won't do anything.
 * See the isThenable function in the Resources section.
*/
            if (isThenable(result)) {
                void Promise.resolve(result).catch((err) => {
                    log();
                });
            }
        } catch (err) {
            log();
            throw err
        }
    }

    return { handleClick }
}`} />

            <AnchorHeading headingLevel={3}>Why These Choices Matter</AnchorHeading>
            <p>
                Each of these choices may seem small, but together they create a robust, fault-tolerant interaction layer that behaves consistently across environments.
            </p>
            <List variant="circle" spacing="loose">
                <li>
                    <p>
                        <span className="bold">Curried function</span> - <InlineCode codeString="handleClick(onClick)(event)" /> allows us to configure the handler once and reuse it.
                    </p>
                </li>
                <li>
                    <p>
                        <span className="bold">Duck typing for Promises</span> - We check for a <InlineCode codeString=".then" /> method rather than using <InlineCode codeString="instanceof Promise" /> because the handler might return a <span className="italic">Promise-like</span> object.
                    </p>
                </li>
                <li>
                    <p>
                        <span className="bold">The <InlineCode codeString="void" /> operator</span> - Signals that we intentionally don&apos;t await the Promise (prevents ESLint "floating promise" warnings).
                    </p>
                    <p className="italic">
                        We use <InlineCode codeString="Promise.resolve().catch()" /> to log unhandled rejections. If the user&apos;s handler already has error handling, our logging never runs.
                    </p>
                </li>
                <li>
                    <p>
                        <span className="bold">Centralized logging</span> - Errors are logged consistently across all buttons. In development, we can easily toggle logging via an environment variable to inspect interactions.
                    </p>
                </li>
                <li>
                    <p>
                        <span className="bold">Re-throw synchronous errors</span> - Logging happens, then errors propagate to React error boundaries as normal. The hook doesn't suppress or handle errors — it just observes them.
                    </p>
                </li>
            </List>
            <Figure
                alt={"Button error handling flow diagram"}
                src={'/images/handleClick_flow.webp'}
                sources={[
                    { media: '(max-width: 560px)', srcSet: '/images/handleClick_Flow_vertical.webp' },
                ]}
                caption={
                    <>
                        The onClick handler ensures that we log both synchronous errors <span className="bold italic">(caught and re-thrown immediately)</span> and asynchronous errors <span className="bold italic">(logged via attached <InlineCode codeString=".catch()" /> handler when Promise rejects later)</span>.
                    </>}
            />
            <PostNote>
                <p>
                    <span className="bold">Why doesn't the hook await?</span> We use a fire-and-forget pattern with <InlineCode codeString="void Promise.resolve().catch()" /> to log unhandled errors without forcing the button handler to be async.
                </p>
                <p>
                    This keeps the component API simple while ensuring errors don't disappear silently. The Promise continues executing, but we've attached logging to catch any rejections that weren't already handled.
                </p>
            </PostNote>
        </PostSection>
    )
}