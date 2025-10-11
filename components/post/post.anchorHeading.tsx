import Heading from '@/components/heading'
import type { HeadingPropsType } from '@/components/heading/heading.type'
import Link from '@/components/link'

export default function AnchorHeading(props: HeadingPropsType & { id?: string }) {
  return (
    <Link href={`#${props.id}`} className='link--heading'>
      <Heading {...props} />
    </Link>
  )
}