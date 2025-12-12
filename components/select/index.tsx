import clsx from "clsx";
import { Block } from "@/components/primitives";
import type { SelectProps } from "@/components/select/types";
import SelectOption from "@/components/select/option";
import Label from "@/components/select/label";

export default function Select({
    label,
    id,
    options,
    error,
    helperText,
    className,
    ref,
    ...rest
}: SelectProps) {

    const resolvedId = id || `select-${Math.random().toString(36).slice(2)}`;

    return (
        <Block as="span" className={clsx("select-wrapper", error && 'contains-error', className)}>
            {label && <Label id={resolvedId} label={label} />}
            <Block
                as="select"
                id={resolvedId}
                ref={ref}
                variantAppearance="outlined"
                variant="neutral"
                className={clsx(
                    "select",
                    error && "select--error"
                )}
                aria-invalid={!!error}
                aria-describedby={helperText ? `${resolvedId}-help` : undefined}
                {...rest}
            >
                {options.map((opt) => <SelectOption key={opt.value} {...opt} />)}
            </Block>

            {helperText && (
                <Block
                    as="p"
                    id={`${resolvedId}-help`}
                    className="select-helper"
                >
                    {helperText}
                </Block>
            )}

            {error && (
                <Block as="p" className="select-error" variant="danger" variantAppearance="outlined">
                    {error}
                </Block>
            )}
        </Block>
    );
}
