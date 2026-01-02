import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import ButtonConfigurator from "../examples/9_buttonConfigurator";

export default function section9() {
    return (
        <PostSection id="putting-it-all-together">
            <AnchorHeading as={"h2"} id="putting-it-all-together-heading">
                Putting it all together
            </AnchorHeading>
            <p>
                We now have all four layers working together:
            </p>
            <ButtonConfigurator />
            <p>
                Here's what happens when a button is rendered:
            </p>
            <List as="ol" spacing="loose">
                <li>
                    <strong>Theme tokens</strong> define raw color values.
                </li>

                <li>
                    <strong>Variant</strong> maps those values to a semantic palette.
                </li>
                <li>
                    <strong>Appearance</strong> maps that palette to styling tokens.
                </li>

                <li>
                    <strong>Paint</strong> explicitly applies those tokens to CSS properties.
                </li>
            </List>
            <p>
                Change data-<span className="fun-underline">variant</span> to <span className="bold italic">secondary</span> and steps 2-4 update automatically.
            </p>
            <p>
                Change data-<span className="fun-underline">appearance</span> to <span className="bold italic">outlined</span> and steps 3-4 update.
            </p>
            <p>
                The component code never changes.
            </p>
            <p>
                This is what makes the system flexible. Decisions are made in the right layer, and each layer only depends on the layer beneath it.
            </p>
        </PostSection>
    );
}