import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

export default function Section8() {
    return (
        <PostSection id="primitives—when-and-when-not-to">
            <AnchorHeading as={"h2"} id="primitives—when-and-when-not-to-heading">
                Primitives — When and When Not To
            </AnchorHeading>
            <p>
                Primitives solve structural problems that appear as systems scale.
            </p>
            <List as="ul" spacing="loose">
                <li>
                    <strong>Layout Drift</strong> - Primitives <span className="fun-underline">centralise</span> spacing rules
                </li>
                <li>
                    <strong>Hidden Intent</strong> - Primitives make arrangement <span className="fun-underline">explicit</span>.
                </li>
                <li>
                    <strong>Duplication of Structural Logic</strong> - Primitives <span className="fun-underline">consolidate</span> repeated patterns.
                </li>
                <li>
                    <strong>Fragile Refactoring</strong> - Changing a primitive is <span className="fun-underline">predictable</span> and system-wide.
                </li>
            </List>
            <p>
                Primitives reduce entropy by limiting where structural decisions can live.
            </p>
            <Rule>
                A primitive should solve a structural problem — not just name a div.
            </Rule>
            <p>
                That said, avoid primitives when you're prototyping quickly, or when semantic HTML alone communicates both structure and meaning clearly.
            </p>
            <p>
                Over-abstraction is just as harmful as under-structure. The goal is clarity — not purity.
            </p>
        </PostSection>
    );
}