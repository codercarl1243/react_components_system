

export default function Footer(){
const year = new Date().getFullYear();
    return (
        <footer>
            <p>&copy; {year} Carl Davidson. All rights reserved. | <a className="link" href="https://codercarl.dev">codercarl.dev</a></p>
        </footer>
    )
}