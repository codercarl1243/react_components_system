'use client';

import { useState, useEffect } from 'react';


export function useTheme(initialTheme: string) {
    const [theme, setTheme] = useState<string>(initialTheme);

    useEffect(() => {
        console.log("use effect triggred")
        console.log("document.documentElement", document.documentElement)
        document.documentElement.dataset.theme = theme;
        console.log("THEMEEEE", theme)
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    }, [theme]);

    const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    return {
        theme,
        toggleTheme
    };
}