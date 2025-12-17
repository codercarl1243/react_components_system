'use client';
import clsx from "clsx";
import { HamburgerMenuProps } from "@/components/hamburger/hamburger.types";
import { useHamburgerContext } from "@/components/hamburger/context";

export default function HamburgerMenu<T extends React.ElementType = "aside">({
    as,
    className,
    ...props
}: HamburgerMenuProps<T>) {
    const Component = as || "aside";
    const { menuState, isActive, menuRef, menuId, position } = useHamburgerContext();
    const dialogProps = isActive ? {role: "dialog","aria-modal": true} : {}

    return (
        <Component
            ref={menuRef}
            className={clsx(
                {'hamburger-menu': isActive},
                className
            )}
            id={menuId}
            data-state={menuState}
            data-position={position}
            data-mode={isActive ? "hamburger" : "static"}
            {...dialogProps}
            {...props}
        />
    )
}