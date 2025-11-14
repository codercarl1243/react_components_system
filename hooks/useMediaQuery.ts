import { useEffect, useMemo, useState } from "react";

const viewPortBreakpoints = {
    mobile: '35rem',
    tablet: '48rem'
} as const;

function remToPx(rem: string): number {
    return parseFloat(rem) * 16;
}

export function useMediaQuery() {
    const isClient = typeof window !== "undefined";

    const breakpointPx = useMemo(() => ({
        mobile: remToPx(viewPortBreakpoints.mobile),
        tablet: remToPx(viewPortBreakpoints.tablet),
    }), []);

    const [state, setState] = useState(() => {
        if (!isClient) {
            return {
                isMobile: false,
                isTablet: false,
                isDesktop: false,
            };
        }

        const width = window.innerWidth;

        return {
            isMobile: width <= breakpointPx.mobile,
            isTablet: width > breakpointPx.mobile && width <= breakpointPx.tablet,
            isDesktop: width > breakpointPx.tablet,
        };
    });

    useEffect(() => {
        if (!isClient) return;

        function compute() {
            const width = window.innerWidth;

            setState({
                isMobile: width <= breakpointPx.mobile,
                isTablet: width > breakpointPx.mobile && width <= breakpointPx.tablet,
                isDesktop: width > breakpointPx.tablet,
            });
        }

        window.addEventListener("resize", compute);

        return () => window.removeEventListener("resize", compute);
    }, [breakpointPx]);

    return state;
}