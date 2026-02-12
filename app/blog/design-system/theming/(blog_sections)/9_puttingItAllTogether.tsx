import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import ButtonConfigurator from "../examples/9_buttonConfigurator";

export default function Section9() {
    return (
        <PostSection id="putting-it-all-together">
            <AnchorHeading as={"h2"} id="putting-it-all-together-heading">
                Putting it all together
            </AnchorHeading>
            <p>
                We now have the core styling layers working together:
            </p>
            <ButtonConfigurator />
            <p>
                Styling resolves through the following layers:
            </p>
            <List as="ol" spacing="loose">
                <li>
                    <strong>Global tokens</strong> provide raw color values.
                </li>
                <li>
                    <strong>Theme</strong> establishes the environment and contrast baseline.
                </li>
                <li>
                    <strong>Variant</strong> defines a semantic palette.
                </li>
                <li>
                    <strong>Appearance</strong> maps that palette to styling tokens.
                </li>
                <li>
                    <strong>Paint</strong> applies those tokens to CSS properties on request.
                </li>
            </List>
            <p>
                When responsibilities are layered correctly, styling becomes predictable, composable, and controlled.
            </p>
        </PostSection>
    );
}