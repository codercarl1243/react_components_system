'use client';

import { useState, useEffect } from 'react';


export function useTheme(initialTheme: string) {
    const [theme, setTheme] = useState<string>(initialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    }, [theme]);

    const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    return {
        theme,
        toggleTheme
    };
}