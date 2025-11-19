import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";


export default function Section5() {

    return (
        <PostSection id="provider">
            <AnchorHeading as={"h2"} id="provider-heading">
                Step 3 — Build a ThemeProvider
            </AnchorHeading>

            <p>The provider controls global theme selection via data attributes.</p>

            <Code lang="tsx" codeString={`export type Theme = 'light' | 'dark';

export const ThemeContext = createContext({
  theme: 'light' as Theme,
  setTheme: (t: Theme) => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`} />

            <PostNote>
                <p>
                    Notice how we apply the theme to <code>&lt;html&gt;</code> — this means <strong>your entire component system
                        automatically becomes theme-aware</strong>.
                </p>
            </PostNote>
        </PostSection>
    )
}