import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section4() {
    return (
        <PostSection id="common-primitives">
            <AnchorHeading as={"h2"} id="common-primitives-heading">
                Common Primitives
            </AnchorHeading>
            <p>
                If primitives define structural contracts, what are those contracts in practice?
            </p>

            <p>
                Most systems converge around a small, repeatable set of structural roles.
                These roles form the vocabulary of composition.
            </p>
            <List as="ul" marker="none">
                <li>
                    <strong>Stack</strong>{" "}
                    Represents vertical arrangement.
                    <List as="ul" marker="circle">
                        <li>Encodes vertical composition explicitly in JSX</li>
                        <li>Controls spacing rhythm between children</li>
                        <li>Handles vertical alignment rules</li>
                        <li>Prevents ad-hoc margin stacking</li>
                    </List>

                </li>
                <li>
                    <strong>Inline</strong>{" "}
                    Represents horizontal arrangement.
                    <List as="ul" marker="circle">
                        <li>Encodes row composition explicitly in JSX</li>
                        <li>Manages gap and wrapping behaviour</li>
                        <li>Controls alignment and distribution</li>
                        <li>Makes horizontal intent obvious at a glance</li>
                    </List>
                </li>
                <li>
                    <strong>Block</strong>{" "}
                    Represents containment.
                    <List as="ul" marker="circle">
                        <li>Establishes a structural surface</li>

                        <li>Defines width constraints or padding rules</li>

                        <li>Acts as a predictable composition boundary</li>

                        <li>Serves as the foundational wrapper for higher-level components</li>
                    </List>
                </li>

            </List>
            <p>The goal is not to create dozens of primitives. The goal is to create a small, composable vocabulary of structure.</p>
        </PostSection>
    );
}