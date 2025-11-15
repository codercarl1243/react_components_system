import type { ElementType, PolymorphicProps, RefObject } from "react";
import type { BaseButtonProps } from "@/components/button/button.type";
import type { IconProps } from "@/components/icon/icon.type";

const positions = ["left", "right"] as const;
type Position = typeof positions[number];

const breakpoints = ["mobile", "tablet", "desktop"] as const;
type Breakpoint = typeof breakpoints[number];

export type HamburgerState = {
    menuIsOpen: boolean | undefined;
    toggleMenuOpenState: (state?: boolean) => void;
    menuId: string | undefined;
    buttonRef: RefObject<HTMLButtonElement | null>;
    menuRef: RefObject<HTMLElement | null>;
    wrapperRef: RefObject<any | null>;
    isActive: boolean;
    position?: Position;
    breakpoint?: Breakpoint;
}

export type HamburgerButtonProps = Omit<
    BaseButtonProps,
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
        position?: HamburgerState['position'];
        breakpoint?: HamburgerState['breakpoint'];
    }
>;