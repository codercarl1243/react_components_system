'use client';
import Button from "@/components/button";
import clsx from "clsx";
import { HamburgerButtonProps } from "@/components/hamburger/hamburger.types";
import { useHamburgerContext } from "@/components/hamburger/context";
import { RiCloseLargeLine, RiMenuLine } from "@remixicon/react";


export default function HamburgerToggle({
    className,
    ariaLabelWhenOpen,
    ariaLabelWhenClosed,
    closeIcon,
    openIcon,
    children,
    ...props
}: HamburgerButtonProps) {
    const { menuState, menuId, toggleMenuOpenState, buttonRef, position } = useHamburgerContext();

    const IconToRender = menuState === "open" ? (closeIcon ?? RiCloseLargeLine) : (openIcon ?? RiMenuLine);
    const ariaLabelValue = menuState === "open" ? (ariaLabelWhenOpen ?? "Close menu") : (ariaLabelWhenClosed ?? "Open menu")

    return (
        <Button
            aria-label={ariaLabelValue}
            {...props}
            aria-controls={menuId}
            aria-expanded={menuState === "open"}
            data-state={menuState}
            data-position={position}
            onClick={toggleMenuOpenState}
            ref={buttonRef}
            icon={IconToRender}
            className={clsx(
                'hamburger-menu--toggle overlay-control',
                className)}
        >
          {children}  
        </Button>
    )
}