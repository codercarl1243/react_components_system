import type { ComponentProps } from "react";


export default function Footer(props: ComponentProps<'footer'>){
const year = new Date().getFullYear();
    return (
        <footer {...props}>
            <p>&copy; {year} Carl Davidson. All rights reserved. | <a className="link" href="https://codercarl.dev">codercarl.dev</a></p>
        </footer>
    )
}