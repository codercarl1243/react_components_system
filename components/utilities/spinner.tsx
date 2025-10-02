import { RiLoader4Line } from "@remixicon/react";
import Icon from "../icon";

export default function Spinner(){
    return (
        <span className="spinner" aria-hidden="true">
            <Icon icon={RiLoader4Line} color={"currentColor"}/>
        </span>
    )
}