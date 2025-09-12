import Image from 'next/image'
import type { PostBannerPropsType } from '@/components/post/post.type'
import Heading from '@/components/heading'

export default function PostBanner ({ title, subtitle, image }: PostBannerPropsType) {
  return (
        <div className="post__banner font-accent">

            {image?.src
              ? (
                <Image src={image.src} alt={image.alt ?? ''} height={400} width={1200} />
                )
              : null}
            <Heading headingLevel={1}>{title}</Heading>
            {subtitle && <p className="italic text-lg">{subtitle}</p>}
        </div>
  )
}
