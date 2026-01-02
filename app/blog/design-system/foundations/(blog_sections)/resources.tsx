import Code from "@/components/code";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";

export default function section4() {
    return (
        <PostSection id="resources">
            <AnchorHeading as={"h2"} id="resources-heading">
                Resources
            </AnchorHeading>
            <Heading as="h3">Token Architecture</Heading>

            <List as="ul">
                <li>Theme tokens</li>
                <li>Variant tokens</li>
                <li>Appearance mappings</li>
                <li>Paint channels</li>
            </List>

            <Heading as="h3">Related Posts</Heading>

            <List as="ul">
                <li><Link>Primitive Components — Structure, Boundaries, and Composition</Link></li>

            </List>
            <Heading as={"h3"}>Complete Code Reference</Heading>
            <TabList
                tabListName="code_reference"
                className="code__reference"
                defaultActiveTabId="[tbc]"
                variant="accent"
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

            {/* Color accessibility tools */}
            {/* Token naming conventions */}
            {/* Further reading */}
            {/* Link to GitHub repo */}
        </PostSection>
    );
}