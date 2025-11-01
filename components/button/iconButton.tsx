'use client'
import { IconButtonProps } from "@/components/button/button.type";
import Button from "@/components/button";
import clsx from "clsx";
import { logWarning } from "@/lib/logging/log";

/**
 * Icon-only button component that enforces accessible labeling.
 * 
 * Must include either aria-label or aria-labelledby for screen reader users.
 * Renders only an icon without text, optimized for compact interfaces.
 * 
 * @example
 * <IconButton icon={<CloseIcon />} aria-label="Close dialog" />
 * 
 * @example
 * <IconButton icon={<HeartIcon />} aria-labelledby="like-counter-label" />
 * <span id="like-counter-label">Like Post</span>
 */
export default function IconButton({
    className,
    icon,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props }: IconButtonProps) {

    if (process.env.NODE_ENV !== 'production') {
         const hasValidLabel = ariaLabel?.trim() || ariaLabelledBy?.trim();
        if (!hasValidLabel) {
            logWarning(
                'IconButton requires aria-label or aria-labelledby for accessibility.'
            );
        }
    }

    return (
        <Button
            className={clsx("button--icon-only", className)}
            {...props}
            icon={icon}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
        />
    )
}