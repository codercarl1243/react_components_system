import { useEffect, useState } from "react";

const viewPortBreakpoints = {
    mobile: "35rem",
    tablet: "48rem",
} as const;

function getBreakpointState() {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
        return {
            isMobile: false,
            isTablet: false,
            isDesktop: false,
        };
    }

    const isMobile = window.matchMedia(`(max-width: ${viewPortBreakpoints.mobile})`).matches;
    const isTablet = window.matchMedia(
        `(min-width: ${viewPortBreakpoints.mobile}) and (max-width: ${viewPortBreakpoints.tablet})`,
    ).matches;

    return {
        isMobile,
        isTablet,
        isDesktop: !isMobile && !isTablet,
    };
}

export function useMediaQuery() {
    const [state, setState] = useState(() => getBreakpointState());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setState(getBreakpointState());

        if (typeof window === "undefined") return;

        function compute() {
            setState(getBreakpointState());
        }

        window.addEventListener("resize", compute);

        return () => window.removeEventListener("resize", compute);
    }, []);

    return { ...state, mounted };
}