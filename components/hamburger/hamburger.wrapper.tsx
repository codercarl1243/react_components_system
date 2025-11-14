import clsx from "clsx";
import useHamburger from "@/components/hamburger/useHamburger";
import { HamburgerContext } from "@/components/hamburger/context";
import { HamburgerWrapperProps } from "@/components/hamburger/hamburger.types";

export default function HamburgerWrapper<T extends React.ElementType = "div">({
    as,
    children,
    className,
    menuId,
    position,
    breakpoint,
    ...props
}: HamburgerWrapperProps<T>) {

    const Component = as || "div";
    const state = useHamburger(menuId, position, breakpoint);

    return (
        <HamburgerContext.Provider value={state}>
            <Component
                ref={state.wrapperRef as React.Ref<any>}
                className={clsx(
                    "hamburger-menu-wrapper overlay",
                    { "overlay--visible": state.menuIsOpen && state.isActive },
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        </HamburgerContext.Provider>
    );
}