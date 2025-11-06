import clsx from "clsx";
import { createElement} from "react";
import type { TElementMap, TextInputProps } from "@/components/form/inputs/input.type";
import { RiErrorWarningFill } from "@remixicon/react";
import Icon from "@/components/icon";


export default function TextInput<T extends keyof TElementMap = "input">({ as, helper, className, required, label, error, id, ...props }: TextInputProps<T>) {

    const inputType = (as ?? "input");
    const ariaDescribedByIds = [
        helper ? `${id}-helper` : null,
        error ? `${id}-error` : null,
    ]
        .filter(Boolean)
        .join(" ");

    const commonProps = {
        id,
        "aria-invalid": !!error,
        "aria-describedby": ariaDescribedByIds,
        className: clsx("input-group__input", className),
        'aria-required': required,
        required,
        ...props,
    } satisfies Record<string, unknown>;


    return (
        <div className="input-group" data-invalid={error ? true : undefined}>
                <label htmlFor={id} className="input-group__label">
                    {label}
                    {required && <span className="input-group__required" aria-hidden="true">*</span>}
                </label>
                {helper && (
                    <p id={`${id}-helper`} className="input-group__helper text-sm">
                        {helper}
                    </p>
                )}
                {error && (
                    <p id={`${id}-error`} className="input-group__error">
                        <Icon icon={RiErrorWarningFill} /> {error}
                    </p>
                )}
                {createElement(inputType, commonProps)}
        </div>
    );
}