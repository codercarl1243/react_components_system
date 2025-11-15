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
    // TODO: allow custom ref to be passed to context to use as buttonRef
    const { menuIsOpen, menuId, toggleMenuOpenState, buttonRef, position } = useHamburgerContext();

    const IconToRender = menuIsOpen ? (closeIcon ?? RiCloseLargeLine) : (openIcon ?? RiMenuLine);
    const ariaLabelValue = menuIsOpen ? (ariaLabelWhenOpen ?? "Close menu") : (ariaLabelWhenClosed ?? "Open menu")

    return (
        <Button
            aria-label={ariaLabelValue}
            {...props}
            aria-controls={menuId}
            aria-expanded={menuIsOpen === true}
            data-open={menuIsOpen}
            data-position={position}
            onClick={() => toggleMenuOpenState()}
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