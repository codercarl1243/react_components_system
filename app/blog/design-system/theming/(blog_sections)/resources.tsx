import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";

export default function ButtonsResources() {

  return (
    <PostSection id="resources">
      <AnchorHeading as={"h2"} id="resources-heading">Code & Resources</AnchorHeading>
      <AnchorHeading as={"h3"}>Complete Code Reference</AnchorHeading>
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