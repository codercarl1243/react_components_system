import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import HTMLvsPrimitives from "../examples/2_whatIsAPrimitive";

export default function Section3() {
    return (
        <PostSection id="why-not-just-use-html">
            <AnchorHeading as={"h2"} id="why-not-just-use-html-heading">
                Why Not Just Use HTML?
            </AnchorHeading>
            <p>
                HTML and primitives operate at different layers of the system:
            </p>
            <p>
                <strong>HTML defines document <span className="fun-underline">structure</span>:</strong>
            </p>

            <List as="ul" marker="circle">
                <li>Document hierarchy</li>
                <li>Content meaning and relationships</li>
                <li>Landmarks</li>
            </List>

            <p>
                <strong>Primitives define <span className="fun-underline">responsibility</span>:</strong>
            </p>

            <List as="ul" marker="circle">
                <li>Who owns layout decisions</li>
                <li>Where layout boundaries are enforced</li>
            </List>
            <p>
                The distinction becomes clearer when viewed next to each other:
            </p>
            <HTMLvsPrimitives />
            <Rule>
                Structural discipline cannot rely on convention alone.
            </Rule>
            <p>
                Primitives make structural ownership explicit and enforceable.
            </p>
        </PostSection>
    );
}