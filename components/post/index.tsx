import clsx from 'clsx'
import type { PostPropsType } from './post.type'

export default function Post ({ children, className, ...props }: PostPropsType) {
  return (
            <article className={clsx('post', className)} {...props}>
                {children}
            </article>
  )
}
