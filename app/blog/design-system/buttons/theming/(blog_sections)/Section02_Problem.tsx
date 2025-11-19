import Button from "@/components/button";
import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section02_Problem() {
    return (
        <PostSection id="problem">
            <AnchorHeading as={"h2"} id="problem-heading">The Problem with Hard-Coded Colors</AnchorHeading>
            <p>Right now, your button probably looks something like this:</p>
            {/* Add a Button as an example */}
            <Button>Example</Button>
            <Code codeString={`.button {
    background-color: #3b82f6;
    color: #ffffff;
    border: 2px solid #2563eb;
}`} lang="css" />
            <List>
                <li><FunHighlight>Not reusable:</FunHighlight> Every variant needs its own class</li>
                <li><FunHighlight>Hard to theme:</FunHighlight> Changing colors means updating multiple files</li>
                <li><FunHighlight>Not scalable:</FunHighlight> Adding a "Danger" variant = rewriting all the CSS</li>
            </List>
        </PostSection>
    )
}