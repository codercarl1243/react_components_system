import Heading from '@/components/heading'
import type { AnchorHeadingPropsType, ValidHeadingTag } from '@/components/heading/heading.type'
import Link from '@/components/link'
import { generateHeadingId } from '@/components/heading/utils'
import { stringUtils } from '@/lib/utils/string'
import { Inline } from '@/components/primitives'

export default function AnchorHeading<T extends ValidHeadingTag = "h3">({
  id,
  prefix,
  ...props
}: AnchorHeadingPropsType<T>) {

  const headingId = id || generateHeadingId(props.children)

  const headingEl = (
    <Link href={`#${headingId}`} className='link--heading'>
      <Heading {...props} id={headingId} />
    </Link>
  )

  if (!prefix) {
    return headingEl;
  }

  const normalizedPrefix = stringUtils.normalizeWhiteSpace(prefix)  + " ";

  return (
    <Inline gap={2} className="heading-w-prefix">
      <span className="prefix">{normalizedPrefix}</span>
      {headingEl}
    </Inline>
  );
}