import clsx from "clsx";
import { Block } from "./primitives";
import { BlockWrapperProps } from "./primitives/types";

type Direction = "right" | "left" | "top" | "bottom";

type ArrowProps = BlockWrapperProps<'div', { direction?: Direction }>;

export default function Arrow({ direction = "right", className, ...props }: ArrowProps) {

    return (
        <Block className={clsx("arrow", className)} data-direction={direction} {...props}>
            <div className="arrow__line" />
            <div className="arrow__head" />
        </Block>
    )

}

type Orientation = "horizontal" | "vertical";
type DoubleArrowProps = BlockWrapperProps<'div', { orientation?: Orientation }>;

export function DoubleArrow({ orientation = "horizontal", className, variant = "neutral", paint = "foreground", variantAppearance = "filled", ...props }: DoubleArrowProps) {

    return (
        <Block data-orientation={orientation} className={clsx("arrow__double", className)} {...props} >
            <Arrow direction="left" paint={paint} variant={variant} variantAppearance={variantAppearance} />
            <Arrow direction="right" paint={paint} variant={variant} variantAppearance={variantAppearance} />
        </Block>
    )
}