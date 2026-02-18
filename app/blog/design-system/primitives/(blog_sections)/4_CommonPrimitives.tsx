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
                While implementations vary, most design systems converge around a small set of structural primitives.
            </p>
            <List as="ul" marker="none">
                <li>
                    Stack
                    Represents vertical arrangement.
                    <List as="ul" marker="circle">
                        <li>Encodes vertical composition explicitly in JSX</li>
                        <li>Controls spacing rhythm between children</li>
                        <li>Handles vertical alignment rules</li>
                        <li>Prevents ad-hoc margin stacking</li>
                    </List>

                </li>
                <li>
                    Inline
                    Represents horizontal arrangement.
                    <List as="ul" marker="circle">
                        <li>Encodes row composition explicitly in JSX</li>
                        <li>Manages gap and wrapping behaviour</li>
                        <li>Controls alignment and distribution</li>
                        <li>Makes horizontal intent obvious at a glance</li>
                    </List>
                </li>
                <li>
                    Block
                    Represents containment.
                    <List>
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