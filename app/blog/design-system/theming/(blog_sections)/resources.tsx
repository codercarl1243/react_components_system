import Code from "@/components/code";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";

export default function ButtonsResources() {

  return (
    <PostSection id="resources">
      <AnchorHeading as={"h2"} id="resources-heading">Code & Resources</AnchorHeading>

      <AnchorHeading as="h3" id="resources-color-accessibility-tools">Tools for Designing Accessible Color Palettes</AnchorHeading>
      <p>Color accessibility is one of the easiest ways to accidentally exclude users. </p>
      <p>The tools below can help test contrast, generate accessible palettes, and validate combinations before you lock them into your design system.</p>
      <List spacing="tight" marker="none">
        <li><Link href="https://webaim.org/resources/contrastchecker/">WebAIM Contrast Checker</Link> — the gold standard for checking contrast ratios</li>
        <li><Link href="https://contrast-grid.eightshapes.com/">Contrast Grid</Link> — compare entire color palettes at once</li>
        <li><Link href="https://venngage.com/tools/accessible-color-palette-generator">Venngage Accessible Palette Generator</Link> — create accessible palettes with contrast previews</li>
        <li><Link href="https://colorable.jxnblk.com/">Colorable</Link> — explore combinations and immediately see WCAG contrast scores</li>
        <li><Link href="https://color.review/">Color.review</Link> — preview colors with vision-deficiency simulations</li>
      </List>

      <Heading as={"h3"}>Complete Code Reference</Heading>
      <TabList
        tabListName="code_reference"
        className="code__reference"
        defaultActiveTabId="[tbc]"
        data-variant="accent"
        orientation="horizontal"
        tabs={[
          {
            id: 'tbc',
            tabLabel: 'tbc.tsx',
            panelContent: (
              <Code codeString={``} />
            )
          }
        ]}
      />
    </PostSection>
  )
}