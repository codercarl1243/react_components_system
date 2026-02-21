import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";

export default function Section6() {
    return (
        <PostSection id="composing">
            <AnchorHeading as={"h2"} id="composing-heading">
                Composing
            </AnchorHeading>
            <TabList
                tabListName="composing_code_reference"
                className="code__reference height-min"
                variant="neutral"
                orientation="horizontal"
                tabs={[
                    {
                        id: "composing-inline-tsx",
                        panelContent: (
                        <Code
                            codeString={`export default function Inline<T extends ElementType = "div">({
    gap = 4,
    align = "baseline",
    justify = "initial",
    wrap = true,
    className,
    ...blockProps
}: InlineProps<T>) {

    const classes = clsx(
        "inline-flow",
        wrap ? "inline-wrap" : "inline-nowrap",
        \`gap-\${gap}\`,
        \`inline-align-\${align}\`,
        \`inline-justify-\${justify}\`,
        className
    )

    return <Block
        className={classes}
        {...(blockProps as BlockProps<T>)}
    />
}`}
                        />),
                        tabLabel: "inline.jsx"
                    },
                    {
                        id: "composing-inline-styles",
                        panelContent: (
                            <Code
                                codeString={`
                
`}
                            />
                        ),
                        tabLabel: "inline.css"
                    }
                ]}
            />
        </PostSection>
    );
}