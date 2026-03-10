'use client'
import { usePathname } from 'next/navigation'
import Link from './link'
import clsx from 'clsx'
import { NAV_LINKS } from '@/lib/navigation'
import List from '@/components/list'

type NavLinksProps = {
    showHome?: boolean
    className?: string
    'aria-label'?: string
}

export default function NavLinks({ showHome = true,  ...props }: NavLinksProps) {
    const pathname = usePathname()

    return (
        <nav {...props}>
            <List as="ul" marker="none" className="nav__list">
                {NAV_LINKS.map(link => {
                    if (!showHome && link.href === '/') return null

                    const active = link.match(pathname)

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                icon={link.icon}
                                className={clsx("nav__list__item", { active })}
                                aria-current={active ? 'page' : undefined}
                            >
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    )
                })}
            </List>
        </nav>
    )
}