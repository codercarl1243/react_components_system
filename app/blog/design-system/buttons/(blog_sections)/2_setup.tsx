import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Link from "@/components/link";


export default function Section2() {

    return (
        <PostSection id="project-setup">
            <AnchorHeading as={"h2"} id="project-setup-heading">Project Setup</AnchorHeading>

            <AnchorHeading as={"h3"} id="file-structure">File Structure</AnchorHeading>
            <p>
                A well-defined folder structure makes components easier to reason about and maintain.
                For our Button, we'll follow a consistent pattern that keeps logic, types, and styles clearly separated:
            </p>

            <Code lang="md" copyEnabled={false}
                title="Button Component Structure"
                codeString={`components/
    └── button/
        ├── button.tsx              
        ├── useButton.ts
        └── button.type.ts

    tests/                          
    └── components/
        ├── useButton.test.tsx
        └── Button.test.tsx

    styles/
    └── components/
        └── button.css`} />
            <p>
                This structure encourages <FunHighlight>encapsulation</FunHighlight> — everything related to a component lives together —
                while maintaining a clean boundary between <span className="italic">presentation</span>, <span className="italic">logic</span>, and <span className="italic">types</span>.
                It also makes testing and refactoring predictable as your design system grows.
            </p>
            <AnchorHeading as={"h3"} id="dependencies">Dependencies</AnchorHeading>
            <p> We'll use a couple of small, focused packages to support the component:</p>
            <List variant="none" spacing="tight">
                <li><Link className="bold" href="https://www.npmjs.com/package/@remixicon/react">RemixIcons</Link> for an extensive and free icon library</li>
                <li><Link className="bold" href="https://www.npmjs.com/package/clsx">CLSX</Link> for clean, conditional class name handling</li>
            </List>
            <Code lang="bash" codeString={`npm install @remixicon/react clsx`} />
            <PostNote className="italic">
                <p>We'll also use <Link className="bold" href="https://jestjs.io/docs/getting-started">Jest</Link> later in this post to run tests and verify behavior.</p>
            </PostNote>

        </PostSection>
    )
}