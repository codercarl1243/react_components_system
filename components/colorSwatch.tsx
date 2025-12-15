import { CSSProperties } from "react";
import { Block } from "./primitives";
import { BlockProps } from "./primitives/types";

type ColorSwatchShape = "square" | "circle";
type ColorSwatchSize =  "sm" | "md" | "lg";

type ColorSwatchProps = BlockProps<'span'> & {
    color?: string;
    shape?: ColorSwatchShape;
    size?: ColorSwatchSize;
};

export default function ColorSwatch({color = "transparent", shape = "square", size = "md", ...props}: ColorSwatchProps) {

    const styles: CSSProperties = {
        '--surface-color': color,
        '--border-color': 'currentColor',
        '--border-radius': shape === 'square' ? 'var(--radius-sm)' : 'var(--radius-circle)',
        '--color-swatch-width': size === 'lg' ? '1.5lh' : size === 'md' ? '1lh' : '0.75lh'
    }

    return (
        <Block as="span" variant="neutral" variantAppearance="surface" className="color-swatch" style={styles} {...props} />
    )
}