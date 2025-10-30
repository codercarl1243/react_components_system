import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import Figure from "@/components/image/figure";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section5() {

    return (
        <PostSection id="loading-and-states">
            <AnchorHeading id="loading-and-states" headingLevel={2}>
                Loading & States
            </AnchorHeading>
            <Figure
                style={{ objectFit: "contain" }}
                height={200}
                variant="default"
                caption="Visual feedback for three button states: ready, processing, and unavailable"
                alt="Three buttons displayed side by side showing default state with pointer cursor, loading state with spinner and wait cursor, and disabled state with greyed colors and not-allowed cursor"
                src={"/images/button_states.webp"}
            />
            <p>
                Beyond aesthetics, these essential features ensure the button behaves predictably under real-world conditions—handling async operations gracefully, preventing duplicate submissions, and integrating seamlessly with forms.
            </p>
            <AnchorHeading headingLevel={3}>
                Loading States
            </AnchorHeading>
            <p>Buttons often trigger asynchronous actions — saving data, submitting forms, or making API calls. A good design system must <FunHighlight>communicate progress clearly</FunHighlight> to the user while preventing accidental re-triggers.</p>
            <p className="bold">Our implementation is simple and composable:</p>
            
            <p><InlineCode codeString="{isLoading && <Spinner />}"/> - The <InlineCode codeString="Spinner" /> appears alongside the button label without shifting layout, maintaining predictable spacing. We also expose a <InlineCode codeString="data-loading" /> attribute so CSS can respond directly to loading state:</p>
            <Code
                lang="css"
                copyEnabled={false}
                codeString={`&[data-loading="true"] {
  position: relative;
  cursor: wait;
}`} />
            <PostNote>
                <p>
                    Using <InlineCode codeString="cursor: wait" /> gives users instant feedback while
                    asynchronous work completes. This small visual cue prevents unnecessary frustration.
                </p>
            </PostNote>
            <AnchorHeading headingLevel={3}>Preventing Duplicate Actions</AnchorHeading>
            {/* IMAGE IDEA: Diagram showing click blocked by disabled/loading branch */}
            <p>Async operations can take time, and users often click again if nothing happens immediately. Our button prevents duplicate submissions with a combination of logic and semantics:</p>
            <List ordered>
                <li>
                    Checking <InlineCode codeString="isLoading || disabled" /> before executing the handler
                </li>
                <li>
                    Stopping events in their tracks with <InlineCode codeString="event.preventDefault()" /> and <InlineCode codeString="event.stopPropagation()" />. <span className="italic">A disabled button should not trigger any action.</span>
                </li>
                <li>
                    Applying <InlineCode lang="css" codeString="cursor: wait" /> for visual feedback
                </li>
                <li>
                    Using <InlineCode codeString="aria-disabled" /> to communicate the state to assistive technology
                </li>
            </List>


            <AnchorHeading headingLevel={3}>Integration with Forms</AnchorHeading>
            <p>
                By default, our button sets <InlineCode codeString={`type="button"`} />. This follows best practices and avoids accidental form submissions when multiple buttons exist.
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

    )
}