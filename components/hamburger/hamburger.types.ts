import type { ElementType, PolymorphicProps, RefObject } from "react";
import type { ButtonProps } from "@/components/button/button.type";
import type { IconProps } from "@/components/icon/icon.type";

type Horizontal = "left" | "right";
type Vertical = "top" | "bottom";
type Breakpoint = "mobile" | "tablet" | "desktop";
type MenuState = "inactive" | "open" | "closed";

export type HamburgerState = {
    menuState: MenuState;
    toggleMenuOpenState: () => void;
    menuId: string | undefined;
    buttonRef: RefObject<HTMLButtonElement | null>;
    menuRef: RefObject<HTMLElement | null>;
    isActive: boolean;
    horizontal?: Horizontal;
    vertical?: Vertical;
    breakpoint?: Breakpoint;
}

export type HamburgerButtonProps = Omit<
    ButtonProps,
    'aria-controls' | 'aria-expanded' | 'aria-label' | 'data-open' | 'icon'
> & {
    closeIcon?: IconProps['icon'];
    openIcon?: IconProps['icon'];
    ariaLabelWhenOpen?: string;
    ariaLabelWhenClosed?: string
};

export type HamburgerMenuProps<T extends ElementType = "aside"> = PolymorphicProps<T>;

export type HamburgerWrapperProps<T extends ElementType = "div"> = PolymorphicProps<
    T,
    {
        menuId?: string;
        horizontal?: HamburgerState['horizontal'];
        vertical?: HamburgerState['vertical'];
        breakpoint?: HamburgerState['breakpoint'];
    }
>;

export type useHamburgerProps = {
    id?: string;
    horizontal?: HamburgerState['horizontal'];
    vertical?: HamburgerState['vertical'];
    breakpoint: HamburgerWrapperProps["breakpoint"];
    wrapperRef: RefObject<HTMLElement | null>;
}