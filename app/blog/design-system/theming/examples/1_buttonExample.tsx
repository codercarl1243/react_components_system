import Button from "@/components/button";
import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import { Stack, Inline, Block } from "@/components/primitives";
import Tablist from "@/components/tablist";

export default function ButtonExample() {

    return (
        <Block as="figure" style={{ paddingInlineStart: "1rem" }} variant="neutral" variantAppearance="primitive" className="flow-4">
            <Heading as="h3" headingSize={4} variant="neutral" className="center">Button Examples</Heading>
            <Stack variant="neutral" variantAppearance="primitive" style={{ width: "100%" }}>
                <p className="text-sm text-muted">Basic unstyled button</p>
                <div>
                    <button>Click Me</button>
                </div>
            </Stack>
            <Stack variant="neutral" variantAppearance="primitive">
                <p className="text-sm">
                    With theming — controlled by <InlineCode codeString="data-variant" lang="html" /> and <InlineCode codeString="data-appearance" lang="html" />
                </p>
                <Inline gap={2}>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary" variantAppearance="ghost">Secondary</Button>
                    <Button variant="accent" variantAppearance="outlined">Accent</Button>
                </Inline>
            </Stack>
            <Tablist
                tabListName={"button_example_code"}
                className="height-min code__reference"
                defaultActiveTabId="button_example_code--primary"
                variant="accent"
                orientation="horizontal"
                tabs={[
                    {
                        id: 'button_example_code--primary',
                        tabLabel: 'Primary',
                        panelContent: (
                            <Code
                                lang="html"
                                copyEnabled={false}
                                highlightTokens={[`primary`, `filled`]}
                                codeString={`<button class="button" variant="primary" data-appearance="filled">
    Primary
</button>`} />
                        )
                    },
                    {
                        id: 'button_example_code--secondary',
                        tabLabel: 'secondary',
                        panelContent: (
                            <Code
                                lang="html"
                                copyEnabled={false}
                                highlightTokens={[`secondary`, `ghost`]}
                                codeString={`<button class="button" variant="secondary" data-appearance="ghost">
    Secondary
</button>`} />
                        )
                    },
                    {
                        id: 'button_example_code--accent',
                        tabLabel: 'accent',
                        panelContent: (
                            <Code
                                lang="html"
                                copyEnabled={false}
                                highlightTokens={[`accent`, `outlined`]}
                                codeString={`<button class="button" variant="accent" data-appearance="outlined">
    Accent
</button>`} />
                        )
                    }
                ]}
            />
            <figcaption className="text-sm text-muted italic" >
                A single button component with three different visual styles, controlled entirely through data attributes
            </figcaption >
        </Block>
    )
}