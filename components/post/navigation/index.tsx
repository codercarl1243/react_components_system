import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'
import Icon from '@/components/icon'
import NavigationCard from '@/components/post/navigation/navigation.card'

interface NavigationLink {
    href: string
    heading: string
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
            className="post-navigation width-full"
            aria-label="Post navigation"
        >
                {previous && (
                    <NavigationCard
                        href={previous.href}
                        className="navigation__card--previous"
                        aria-label={`Previous: ${previous.heading}`}
                        rel="prev"
                        label={"Previous"}
                        heading={previous.heading}
                    >
                        <Icon icon={RiArrowLeftLine} size={20} />
                    </NavigationCard>
                )}

                {next && (
                    <NavigationCard
                        href={next.href}
                        className="navigation__card--next"
                        aria-label={`Next: ${next.heading}`}
                        rel="next"
                        label={"Next"}
                        heading={next.heading}
                    >
                        <Icon icon={RiArrowRightLine} size={20} />
                    </NavigationCard>

                )}
        </nav>
    )
}