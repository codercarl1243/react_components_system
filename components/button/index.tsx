'use client'

import clsx from 'clsx'
import { BaseButtonProps, MouseEventType } from '@/components/button/button.type'
import useButton from '@/components/button/useButton'
import Spinner from '@/components/utilities/spinner'

export default function Button({
  className,
  children,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  ref,
  ...props
}: BaseButtonProps) {
  const { handleClick } = useButton()

  function onClickHandler(event: MouseEventType) {

    if (isLoading || disabled) {
      event.preventDefault();
      event.stopPropagation();  // ← Prevent form submission
      return;
    }
    handleClick(onClick)(event)
  }

  return (
    <button
      {...props}
      className={clsx(className, 'button')}
      onClick={onClickHandler}
      aria-disabled={isLoading || disabled}
      data-loading={isLoading}
      ref={ref}
      type={type}
      data-testid="base-button"
    >
      {children}
      {isLoading && <Spinner />}
    </button>
  )
}
