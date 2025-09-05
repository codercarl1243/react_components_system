import clsx from "clsx";
import type { ComponentProps } from "react";


export default function Footer({ className,...props}: ComponentProps<'footer'>){
const year = new Date().getFullYear();
    return (
        <footer className={clsx('footer', className)} {...props}>
            <p>&copy; {year} Carl Davidson. All rights reserved. | <a className="link" href="https://codercarl.dev">codercarl.dev</a></p>
        </footer>
    )
}