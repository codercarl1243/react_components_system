import Button from "@/components/button";
import type { IconButtonProps } from "@/components/button/button.type";
import clsx from "clsx";

/**
 * Icon-only button component that enforces accessible labeling.
 * 
 * Must include either aria-label or aria-labelledby for screen reader users.
 * Applies icon-specific styling optimized for square/circular buttons.
 * 
 * @example
 * <IconButton icon={<CloseIcon />} aria-label="Close dialog" />
 * 
 * @example
 * <IconButton icon={<HeartIcon />} aria-labelledby="like-counter-label" />
 * <span id="like-counter-label">Like Post</span>
 */
export default function IconButton({ className, icon, 'aria-label': ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }: IconButtonProps) {

    return (
        <Button
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className={clsx(className, 'button-w-icon')}
            icon={icon}
            {...props}
        />
    )
}