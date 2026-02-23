import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import { Stack } from "@/components/primitives";
import Tablist from "@/components/tablist";


export default function Resources() {


    return (
        <PostSection id="resources" className="flow-8">
            <Stack>
                <AnchorHeading as={"h2"} id="resources-heading">Code & Resources</AnchorHeading>
                <p className="italic">
                    This section documents constraints, tradeoffs, and reference material — it does not introduce new concepts.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Typescript notes</Heading>
                <p>
                    The shared <InlineCode codeString="PrimitiveProps" /> type uses <InlineCode codeString="Omit" lang="ts" /> to remove any existing <InlineCode codeString="as" /> prop from <InlineCode codeString="ComponentProps<T>" lang="ts" />.
                    This prevents duplicate or conflicting polymorphic definitions when composing custom element types.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Primitives (Reference)</Heading>
                <p>
                    Reference implementation of the Primitives discussed in the post.
                </p>
                <Heading as="h4" headingSize={6}>Types</Heading>
                <Code
                    codeString={`import { ElementType, ComponentProps } from "react";
                    
type PrimitiveProps<T extends ElementType = "div"> = {
    as?: T;
} & Omit<ComponentProps<T>, "as">;
 
type BlockProps<T extends ElementType = "div"> =
    PrimitiveProps<T>;
  
type StackProps<T extends ElementType = "div"> =
BlockProps<T> & {
    gap?: Gap;
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?: "start" | "center" | "end" | "stretch";
};

type InlineProps<T extends ElementType = "div"> =
BlockProps<T> & {
    gap?: Gap
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?: "start" | "center" | "end" | "stretch" | "even" | "between" | "initial";
    wrap?: boolean; // true = wrap (default), false = nowrap
}

type RowProps<T extends ElementType = "div"> =
BlockProps<T> & {
    gap?: Gap;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between";
};`}
                />
                <Heading as="h4" headingSize={6}>Components</Heading>

                <Code
                    title="block.tsx"
                    codeString={`import type { BlockProps } from "@/components/primitives/types";

function Block<T extends ElementType = "div">({
    as,
    ...rest
}: BlockProps<T>) {

    const Component = as || "div";

    return <Component {...rest} />;`}
                />
                <Tablist
                    tabListName="primitives_code_reference_stack"
                    className="code__reference height-min"
                    variant="accent"
                    orientation="horizontal"
                    tabs={[
                        {
                            id: "primitives-resources-stack",
                            tabLabel: "stack.tsx",
                            panelContent: (
                                <Code
                                    codeString={``}
                                />
                            )
                        },
                        {
                            id: "primitives-resources-stackcss",
                            tabLabel: "stack.css",
                            panelContent: (
                                <Code
                                    codeString={``}
                                />
                            )
                        }
                    ]}
                />
                <Tablist
                    tabListName="primitives_code_reference_row"
                    className="code__reference height-min"
                    variant="accent"
                    orientation="horizontal"
                    tabs={[
                        {
                            id: "primitives-resources-row",
                            tabLabel: "row.tsx",
                            panelContent: (
                                <Code
                                    codeString={``}
                                />
                            )
                        },
                        {
                            id: "primitives-resources-rowcss",
                            tabLabel: "row.css",
                            panelContent: (
                                <Code
                                    codeString={``}
                                />
                            )
                        }
                    ]}
                />
                <Tablist
                    tabListName="primitives_code_reference_inline"
                    className="code__reference height-min"
                    variant="accent"
                    orientation="horizontal"
                    tabs={[
                        {
                            id: "primitives-resources-inline",
                            tabLabel: "inline.tsx",
                            panelContent: (
                                <Code
                                    codeString={``}
                                />
                            )
                        },
                        {
                            id: "primitives-resources-inlinecss",
                            tabLabel: "inline.css",
                            panelContent: (
                                <Code
                                    codeString={``}
                                />
                            )
                        }
                    ]}
                />
            </Stack>
        </PostSection>

    )
}