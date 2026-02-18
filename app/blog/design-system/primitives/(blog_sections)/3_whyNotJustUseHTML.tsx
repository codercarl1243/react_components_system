import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section3() {
    return (
        <PostSection id="why-not-just-use-html">
            <AnchorHeading as={"h2"} id="why-not-just-use-html-heading">
                Why Not Just Use HTML?
            </AnchorHeading>
            <p>
                HTML already gives us structural elements — div, section, article, ul, li.
            </p>
            <p>
                So why introduce another abstraction layer?
            </p> 
            <p>
                Because HTML describes document semantics, not layout systems.
            </p>
            <p>
                A div does not communicate intent. It does not tell you whether content is composed using a Stack, arranged with an Inline, or contained within a Block. That intent usually lives in class names, utility chains, or scattered CSS rules.
            </p>
            <p>
                Over time, that creates three problems:
            </p>
            <p>
                Layout decisions become invisible in markup
            </p>
            <p>
                Spacing patterns drift across the codebase
            </p>
            <p>
                Structural behaviour becomes duplicated instead of shared
            </p>
            <p>
                You can build large systems with raw HTML. But without primitives, layout discipline depends entirely on developer restraint.
            </p>
            <p>
                Primitives encode that discipline directly into the component model.
            </p>
        </PostSection>
    );
}