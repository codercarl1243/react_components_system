import { CSSProperties } from "react";
import { Block } from "./primitives";
import { BlockProps } from "./primitives/types";

type ColorSwatchShape = "square" | "circle";
type ColorSwatchSize = "sm" | "md" | "lg";

type ColorSwatchProps = BlockProps<'span'> & {
    color?: string;
    shape?: ColorSwatchShape;
    size?: ColorSwatchSize;
};

export default function ColorSwatch({ color = "transparent", shape = "square", size = "md", ...props }: ColorSwatchProps) {

    const styles: CSSProperties = {
        '--background-color': color,
        '--border-color': 'var(--text-on-surface)',
        '--border-radius': shape === 'circle'
            ? 'var(--radius-circle)'
            : 'var(--radius-sm)',
        '--color-swatch-width':
            size === 'lg' ? '1.5lh' :
                size === 'sm' ? '0.75lh' :
                    '1lh'
    };

    return (
        <Block as="span"
            paint="surface"
            className="color-swatch"
            style={styles}
            {...props} />
    )
}