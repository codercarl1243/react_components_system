import clsx from "clsx";
import { TSwitchProps } from "./type";
import Icon from "@/components/icon";

export default function Switch({ checked, icon, className, ...props }: TSwitchProps) {

    return (
        <button
            {...props}
            type="button"
            aria-checked={checked}
            role="switch"
            className={clsx(className, 'switch')}>
            {icon ? <Icon icon={icon} /> : null}
        </button>
    )
}