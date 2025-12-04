import { CSSProperties } from "react";
import { Block } from "./primitives";
import { BlockProps } from "./primitives/types";

type ColorSwatchShape = "square" | "circle";
type ColorSwatchSize = "xs" | "sm" | "md" | "lg";

type ColorSwatchProps = BlockProps<'span'> & {
    color?: string;
    shape?: ColorSwatchShape;
    size?: ColorSwatchSize;
};

export default function ColorSwatch({color = "transparent", shape, size, ...props}: ColorSwatchProps) {

    const styles: CSSProperties = {
        '--surface-color': color,
        '--border-color': 'currentColor'

    }

    return (
        <Block as="span" variant="neutral" variantAppearance="primitive" className="color-swatch" style={styles} {...props} />
    )
}