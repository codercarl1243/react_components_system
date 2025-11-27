'use client';
import clsx from "clsx";
import useHamburger from "@/components/hamburger/useHamburger";
import { HamburgerContext } from "@/components/hamburger/context";
import { HamburgerWrapperProps } from "@/components/hamburger/hamburger.types";
import { useRef, type ElementType } from "react";
import { useMergedRef } from "@/hooks/useMergedRef";

export default function HamburgerWrapper<T extends ElementType = "div">({
    as,
    children,
    className,
    menuId,
    position,
    breakpoint,
    ref: userRef,
    ...props
}: HamburgerWrapperProps<T>) {

    const Component = as || "div";

    const internalRef = useRef<HTMLElement | null>(null);
    
    const state = useHamburger({ id: menuId, position, breakpoint, wrapperRef: internalRef   });
    const mergedRef = useMergedRef(userRef, internalRef);

    return (
        <HamburgerContext.Provider value={state}>
            <Component
                ref={mergedRef}
                className={clsx(
                    {"hamburger-menu--wrapper overlay-container": state.isActive},
                    className
                )}
                data-overlay={(state.menuState === "open" && state.isActive) ? "visible" : "hidden"}
                data-mode={state.isActive ? "hamburger" : "static"}
                {...props}
            >
                {children}
            </Component>
        </HamburgerContext.Provider>
    );
}