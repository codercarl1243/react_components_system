import Heading from '@/components/heading'
import type { HeadingPropsType } from '@/components/heading/heading.type'
import Link from '@/components/link'
import { generateSlug } from '@/lib/utils/generateSlug'
import { extractTextFromChildren } from '@/components/heading/utils'

export default function AnchorHeading({ id, ...props }: HeadingPropsType & { id?: string }) {

  const headingId = id || generateSlug(extractTextFromChildren(props.children))

  return (
    <Link href={`#${headingId}`} className='link--heading'>
      <Heading {...props} id={headingId} />
    </Link>
  )
}