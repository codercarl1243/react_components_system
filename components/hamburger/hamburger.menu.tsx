import clsx from "clsx";
import { HamburgerMenuProps } from "@/components/hamburger/hamburger.types";
import { useHamburgerContext } from "@/components/hamburger/context";

export default function HamburgerMenu<T extends React.ElementType = "aside">({
    as,
    className,
    ...props
}: HamburgerMenuProps<T>) {
    const Component = as || "aside";
    const { menuIsOpen, isActive, menuRef, menuId, position } = useHamburgerContext();
    const dialogProps = (isActive && menuIsOpen) ? {role: "dialog","aria-modal": true} : {}

    return (
        <Component
            ref={menuRef}
            className={clsx(
                'hamburger-menu',
                className
            )}
            id={menuId}
            data-isopen={menuIsOpen}
            data-position={position}
            {...dialogProps}
            {...props}
        />
    )
}