import Heading from '@/components/heading'
import type { HeadingPropsType } from '@/components/heading/heading.type'
import Link from '@/components/link'
import {generateHeadingId} from '@/components/heading/utils'

export default function AnchorHeading({ id, ...props }: HeadingPropsType & { id?: string }) {

  const headingId = id || generateHeadingId(props.children)

  return (
    <Link href={`#${headingId}`} className='link--heading'>
      <Heading {...props} id={headingId} />
    </Link>
  )
}