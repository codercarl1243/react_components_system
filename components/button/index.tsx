'use client'

import clsx from 'clsx'
import { BaseButtonProps } from './button.type'
import useButton from './useButton'

export default function Button ({
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
            className={clsx(className, 'button')}
            onClick={handleClick(onClick)}
            disabled={isLoading || disabled}
            ref={ref}
            type={type}
            aria-busy={isLoading}
            {...props}
            data-testid="base-button"
        >
            {isLoading ? loadingText : children}
        </button>
  )
}
