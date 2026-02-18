import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section5() {
    return (
        <PostSection id="problems-that-primitives-solve">
            <AnchorHeading as={"h2"} id="problems-that-primitives-solve-heading">
                Problems that Primitives solve
            </AnchorHeading>
            <p>
                Primitives solve structural problems that appear as systems scale.
            </p>
            <List as="ol">
                <li>Layout Drift

                    When spacing lives inside feature components, rhythm becomes inconsistent. Primitives centralise spacing rules.
                </li>
                <li>
                    Hidden Intent

                    Utility chains and deeply nested divs obscure layout meaning. Primitives make arrangement explicit.
                </li>
                <li>
                    Duplication of Structural Logic

                    Without primitives, similar flex/grid patterns get rewritten repeatedly. Primitives consolidate them.
                </li>
                <li>
                    Fragile Refactoring

                    Changing spacing rules across dozens of components is risky. Changing a primitive is predictable.

                    Primitives reduce entropy by limiting where structural decisions can live.
                </li>
            </List>
        </PostSection>
    );
}