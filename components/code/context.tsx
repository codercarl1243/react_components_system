"use client";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { getCustomGithubDark, getHighlighterSingleton } from "@/components/code/highlighter";
import {type ThemeRegistration, type Highlighter } from "shiki";

interface CodeHighlighterContextType {
theme: ThemeRegistration | null;
highlighter: Highlighter | null;
}

const CodeHighlighterContext = createContext<CodeHighlighterContextType | null>(null);

export function CodeHighlighterProvider({ children }: { children: ReactNode }) {
    const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
    const [theme, setTheme] = useState<ThemeRegistration | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function init() {
            const highlighterSingleton = await getHighlighterSingleton();
            const customTheme = await getCustomGithubDark();
            if (isMounted) {
                setHighlighter(highlighterSingleton);
                setTheme(customTheme);
            }
        }

        init();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <CodeHighlighterContext.Provider value={{ highlighter, theme }}>
            {children}
        </CodeHighlighterContext.Provider>
    );
}

export const useCodeHighlighter = () => {
    const ctx = useContext(CodeHighlighterContext);
    if (!ctx) {
        throw new Error("useCodeHighlighter must be used inside a <CodeHighlighterProvider>");
    }
    return ctx;
};