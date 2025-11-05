import clsx from "clsx";
import { createElement, type JSX } from "react";
import type { TElementMap, TextInputProps } from "@/components/form/inputs/input.type";


export default function TextInput<T extends keyof TElementMap = "input">({ as, className, required, label, error, id, ...props }: TextInputProps<T>) {

    const inputType = (as ?? "input") as keyof JSX.IntrinsicElements;
    const commonProps = {
        id,
        "aria-invalid": !!error,
        "aria-describedby": error ? `${id}-error` : undefined,
        className: clsx("input-group__input", className),
        ...props,
    } satisfies Record<string, unknown>;


    return (
        <div className="input-group">
            {label && (
                <label htmlFor={id} className="input-group__label">
                    {label}
                    {required && <span className="input-group__required" aria-hidden="true">*</span>}
                </label>
            )}
            <div>
                {error && (
                    <p id={`${id}-error`} className="input-group__error">
                        {error}
                    </p>
                )}
                {createElement(inputType, commonProps)}
            </div>
        </div>
    );
}