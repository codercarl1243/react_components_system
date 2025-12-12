import clsx from "clsx";
import { Block } from "@/components/primitives";
import type { SelectProps } from "@/components/select/types";
import SelectOption from "@/components/select/option";
import Label from "@/components/select/label";

export default function Select({
    labelChildren,
    id,
    options,
    error,
    helperText,
    className,
    ref,
    ...rest
}: SelectProps) {

    const resolvedId = id || `select-${Math.random().toString(36).slice(2)}`;
    const helperId = helperText ? `${resolvedId}-help` : undefined;
    const errorId = error ? `${resolvedId}-error` : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;
    
    return (
        <Block as="span" className={clsx("select-wrapper", error && 'contains-error', className)}>
            {labelChildren && <Label selectId={resolvedId}>{labelChildren}</Label>}
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
                aria-describedby={describedBy}
                {...rest}
            >
                {options.map((opt) => <SelectOption key={opt.value} {...opt} />)}
            </Block>

            {helperText && (
                <Block
                    as="p"
                    id={helperId}
                    className="select-helper"
                >
                    {helperText}
                </Block>
            )}

            {error && (
                <Block
                    as="p"
                    id={errorId}
                    className="select-error"
                    variant="danger"
                    variantAppearance="outlined"
                >
                    {error}
                </Block>
            )}
        </Block>
    );
}
