'use client'

import clsx from 'clsx'
import { BaseButtonProps } from './button.type'
import useButton from './useButton'
import Ellipsis from '../ellipsis'

export default function Button({
  className,
  children,
  onClick,
  type = 'button',
  disabled,
  isLoading = false,
  loadingText = 'Loading',
  ref,
  ...props
}: BaseButtonProps) {
  const { handleClick } = useButton()

  return (
    <button
      {...props}
      className={clsx(className, 'button')}
      onClick={(event) => void handleClick(onClick)(event)}
      disabled={isLoading || disabled}
      data-loading={isLoading}
      ref={ref}
      type={type}
      aria-busy={isLoading}
      data-testid="base-button"
    >
      {isLoading ? <span aria-live="polite" className='loading-text'>{loadingText}<Ellipsis /></span> : children}
    </button>
  )
}
