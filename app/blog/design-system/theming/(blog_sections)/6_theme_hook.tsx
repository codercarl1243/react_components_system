import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section6() {

  return (
    <PostSection id="hook">
      <AnchorHeading as={"h2"} id="hook-heading">
        Step 4 — Create the <code>useTheme()</code> Hook
      </AnchorHeading>

      <Code lang="tsx" codeString={`export function useTheme() {
  return useContext(ThemeContext);
}`} />
      <p>Simple. Clean. Zero complexity.</p>

      <p>Usage:</p>

      <Code lang="tsx" codeString={`const { theme, setTheme } = useTheme();

// Example toggle
<Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
  Switch Theme
</Button>`} />
    </PostSection>
  )
}