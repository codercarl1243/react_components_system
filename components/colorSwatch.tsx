import type { CSSProperties } from "react";
import { Block } from "@/components/primitives";
import type { BlockProps } from "./primitives/types";
import type { AccessibleLabel } from "@/types/accessibility";

type ColorSwatchShape = "square" | "circle";
type ColorSwatchSize = "sm" | "md" | "lg";

type ColorSwatchProps = AccessibleLabel & BlockProps<'span'> & {
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
            role="img"
            style={styles}
            {...props} />
    )
}