import type { ElementType, PolymorphicProps, Ref, RefObject } from "react";
import type { BaseButtonProps } from "@/components/button/button.type";
import type { IconProps } from "@/components/icon/icon.type";

const positions = ["left", "right"] as const;
type Position = typeof positions[number];

const breakpoints = ["mobile", "tablet", "desktop"] as const;
type Breakpoint = typeof breakpoints[number];

type MenuState = "inactive" | "open" | "closed";

export type HamburgerState = {
    menuState: MenuState;
    toggleMenuOpenState: (state?: MenuState) => void;
    menuId: string | undefined;
    buttonRef: RefObject<HTMLButtonElement | null>;
    menuRef: RefObject<HTMLElement | null>;
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

export type useHamburgerProps = {
    id?: string;
    position: HamburgerWrapperProps["position"];
    breakpoint: HamburgerWrapperProps["breakpoint"];
    wrapperRef: RefObject<HTMLElement | null>;
}