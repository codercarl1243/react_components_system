import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import TabList from "@/components/tablist";
import PrimitiveOwnershipDiagram from '../examples/primitiveOwnershipDiagram'
export default function Section6() {
    return (
        <PostSection id="composing">
            <AnchorHeading as={"h2"} id="composing-heading">
                Composing
            </AnchorHeading>
            <p>
                With <InlineCode codeString="<Block />" /> providing containment,
                we can layer focused structural responsibilities on top of it.
            </p>
            <p>
                A common structural role in a layout system is vertical
                composition — placing elements in a predictable vertical rhythm.
                That responsibility belongs to <InlineCode codeString="<Stack />" />.
            </p>
            <p>
                <InlineCode codeString="<Stack />" /> extends <InlineCode codeString="BlockProps" />, adding only the structural
                properties it owns.
            </p>
            <Code
                codeString={`type StackProps<T extends ElementType = "div"> =
BlockProps<T> & {
    gap?: number;
    align?: "start" | "center" | "end" | "stretch" | "baseline";
};`} />
            <TabList
                tabListName="composing_code_reference"
                className="code__reference height-min"
                variant="accent"
                orientation="horizontal"
                tabs={[
                    {
                        id: "composing-stack-tsx",
                        panelContent: (
                            <Code
                                codeString={`function Stack<T extends ElementType = "div">({
    gap = 4,
    align = "baseline",
    className,
    ...blockProps
}: StackProps<T>) {

    const classes = clsx(
                'stack',
                // Gap utilities are defined globally (gap.css)
                // rather than scoped to Stack
                \`gap-row-\${gap}\`, 
                \`stack-align-\${align}\`,
                className);

    return (
        <Block
            className={classes}
            {...blockProps as BlockProps<T>}
        />
    )
}`}
                            />),
                        tabLabel: "stack.tsx"
                    },
                    {
                        id: "composing-stack-styles",
                        panelContent: (
                            <Code
                                lang="css"
                                codeString={`.stack {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: minmax(0, 1fr);
  align-items: var(--stack-alignment);
  min-width: 0;
}

.stack > * {
  grid-column: 1;
}

.stack-align-start { --stack-alignment: start; }
.stack-align-center { --stack-alignment: center; }
.stack-align-end { --stack-alignment: end; }
.stack-align-stretch { --stack-alignment: stretch; }
.stack-align-baseline { --stack-alignment: baseline; }`}
                            />
                        ),
                        tabLabel: "stack.css"
                    }
                ]}
            />

            <p>
                The implementation is intentionally small.{" "}
                <InlineCode codeString="Stack" /> does not redefine containment.
                It does not introduce horizontal behavior.
                It adds vertical composition — and nothing more.
            </p>

            <Rule>
                Composition adds responsibility — it does not redefine foundations.
            </Rule>

            <p>
                This layering keeps structural concerns isolated. Containment lives in{" "}
                <InlineCode codeString="Block" />. Vertical rhythm lives in{" "}
                <InlineCode codeString="Stack" />.
            </p>

            <Heading as="h3" headingSize={4}>
                Additional Structural Roles
            </Heading>

            <p>
                Other primitives follow the same pattern.
            </p>
            <PostNote>
                <p>
                    The following primitives are described without implementation detail — the goal is to establish structural responsibility, not provide a component library.
                </p>
                <p>
                    Full code is available in the resources section below.
                </p>
            </PostNote>
            <p>
                <strong>Row</strong> owns horizontal layout surfaces.
                It establishes structure for toolbars, headers, and side-by-side panels.
            </p>

            <p>
                <strong>Inline</strong> participates in content flow. It behaves as an
                inline-level flex container, ideal for icon-text pairs, tags, and
                metadata clusters.
            </p>

            <p>
                Each primitive owns a distinct structural responsibility. None duplicate
                containment. None collapse into a generic utility surface.
            </p>

            <PrimitiveOwnershipDiagram />

        </PostSection>
    );
}