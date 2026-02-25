import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

export default function Section4() {
    return (
        <PostSection id="minimizing-surface-area">
            <AnchorHeading as={"h2"} id="minimizing-surface-area-heading">
                Minimizing surface area
            </AnchorHeading>
            <p>
                While implementations vary, most design systems converge around a small set of structural primitives.
            </p>
            <p>
                If you think in terms of software architecture, a primitive behaves like a
                single-responsibility <InlineCode codeString={"function"} />. It owns one structural concern, exposes a
                constrained API, and does not leak responsibilities it does not control.
            </p>
            <Rule>
                A primitive should do one structural job — and do it predictably.
            </Rule>
            <p>
                In practice, that vocabulary usually converges around:
            </p>
            <List as="ul" marker="none">
                <li><strong>Vertical composition</strong> — stacking elements with controlled rhythm</li>
                <li><strong>Horizontal composition</strong> — aligning and distributing elements in a row</li>
                <li><strong>Containment</strong> — defining layout boundaries and spacing surfaces</li>
            </List>
            <p>
                Three roles. That is the structural vocabulary. Everything else is composition.
            </p>
        </PostSection>
    );
}