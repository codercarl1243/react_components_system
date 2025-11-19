import Heading from '@/components/heading'
import type { HeadingPropsType, ValidHeadingTag } from '@/components/heading/heading.type'
import Link from '@/components/link'
import {generateHeadingId} from '@/components/heading/utils'

export default function AnchorHeading<T extends ValidHeadingTag = "h3">({
   id,
   ...props
  }: HeadingPropsType<T>) {

  const headingId = id || generateHeadingId(props.children)

  return (
    <Link href={`#${headingId}`} className='link--heading'>
      <Heading {...props} id={headingId} />
    </Link>
  )
}