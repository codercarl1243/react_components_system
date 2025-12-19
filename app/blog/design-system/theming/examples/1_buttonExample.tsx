import Button from "@/components/button";
import Code from "@/components/code";
import Heading from "@/components/heading";
import { Stack, Inline } from "@/components/primitives";
import Tablist from "@/components/tablist";

export default function ButtonExample() {

    return (
        <Stack as="figure" variant="muted" variantAppearance="tonal" paint="all" className="text-sm surface-frame p-8 frame-inset-8" gap={2}>
            <Heading as="h3" headingSize={4} className="center">Button Examples</Heading>
            
            <Stack variant="neutral" paint="all" className="p-4 surface-frame">
                <Inline gap={2} style={{width: "100%", justifyContent: "center"}}>
                    <Button variant="primary" aria-label="Primary filled button example">
                        Primary
                    </Button>
                    <Button variant="secondary" variantAppearance="ghost" aria-label="Secondary ghost button example">
                        Secondary
                    </Button>
                    <Button variant="accent" variantAppearance="outlined" aria-label="Accent outlined button example">
                        Accent
                    </Button>
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
                                codeString={`<button class="button" data-variant="primary" data-appearance="filled">
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
                                codeString={`<button class="button" data-variant="secondary" data-appearance="ghost">
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
                                codeString={`<button class="button" data-variant="accent" data-appearance="outlined">
    Accent
</button>`} />
                        )
                    }
                ]}
            />
            <figcaption className="text-sm text-muted italic" >
                A single button component with three different visual styles, controlled entirely through data attributes
            </figcaption >
        </Stack>
    )
}