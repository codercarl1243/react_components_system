import clsx from 'clsx'
import type { PostPropsType } from './post.type'
import { Block } from '../primitives'

export default function Post({ className, ...props }: PostPropsType) {

  return <Block as="article" className={clsx('post layout-wrapper', className)} {...props} />
}
