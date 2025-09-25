import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'
import Link from '@/components/link'
import Icon from '@/components/icon'

interface NavigationLink {
    href: string
    title: string
}

interface PostNavigationProps {
    previous?: NavigationLink
    next?: NavigationLink
}

export default function PostNavigation({ previous, next }: PostNavigationProps) {
    if (!previous && !next) {
        return null
    }

    return (
        <nav
            className="post-navigation"
            aria-label="Post navigation"
        >
            <div className="nav-container">
                {previous && (
                    <Link
                        href={previous.href}
                        className="nav-link nav-link--previous"
                        aria-label={`Previous: ${previous.title}`}
                        rel="prev"
                    >
                        <div className="nav-card">
                            <Icon icon={RiArrowLeftLine} size={20} />
                            <div className="nav-content">
                                <span className="nav-label">Previous</span>
                                <span className="nav-title">{previous.title}</span>
                            </div>
                        </div>
                    </Link>
                )}

                {next && (
                    <Link
                        href={next.href}
                        className="nav-link nav-link--next"
                        aria-label={`Next: ${next.title}`}
                        rel="next"
                    >
                        <div className="nav-card">
                            <div className="nav-content">
                                <span className="nav-label">Next</span>
                                <span className="nav-title">{next.title}</span>
                            </div>
                            <Icon icon={RiArrowRightLine} size={20} />
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    )
}