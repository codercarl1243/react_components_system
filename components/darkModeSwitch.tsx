import { useTheme } from "@/lib/hooks/useTheme";
import Switch from '@/components/button/switch'
import Icon from "@/components/icon";
import { RiSunLine, RiMoonClearFill } from "@remixicon/react";


export default function DarkModeSwitch({ userTheme }: { userTheme: string }) {
    const { theme, toggleTheme } = useTheme(userTheme);

    return (
        <Switch
            checked={theme === "dark"}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className='darkmode__switch m-0 p-0'
            variant={"light"}
            variantAppearance='filled'
            paint="all"
        >{
                theme === "dark" ?
                    <Icon icon={RiSunLine} variant='warning' />
                    : <Icon icon={RiMoonClearFill} variant='light' />
            }
        </Switch>
    )
}