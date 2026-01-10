import Icon from "@/components/icon";
import { logWarning } from "@/lib/logging/log";
import { isEmptyString } from "@/lib/utils/guards";
import { RiErrorWarningFill } from "@remixicon/react";
import { FormFieldWrapperProps } from "@/components/form/field/field.types";

export default function FormFieldWrapper({ errorMessage, inputId, label, helper, required, children, ...props }: FormFieldWrapperProps) {

    if (isEmptyString(inputId)) {
        logWarning("Input Id cannot be empty")
    }

    return (
        <div className="input-group" data-invalid={errorMessage ? true : undefined} {...props}>

            <label htmlFor={inputId} className="input-group__label">
                {label}
                {required && <span className="input-group__required" aria-hidden="true">*</span>}
            </label>

            {helper && (
                <p id={`${inputId}-helper`} className="input-group__helper text-sm">
                    {helper}
                </p>
            )}

            {errorMessage && (
                <p id={`${inputId}-error`} className="input-group__error">
                    <Icon icon={RiErrorWarningFill} /> {errorMessage}
                </p>
            )}

            {children}
        </div>
    )
}