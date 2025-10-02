'use client'

import clsx from 'clsx'
import { BaseButtonProps, MouseEventType } from './button.type'
import useButton from './useButton'
import Ellipsis from '../ellipsis'

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
      return;
    }
    void handleClick(onClick)(event)
  }

  return (
    <button
      {...props}
      className={clsx(className, 'button')}
      onClick={onClickHandler}
      disabled={disabled}
      aria-disabled={isLoading || disabled}
      data-loading={isLoading}
      ref={ref}
      type={type}
      data-testid="base-button"
    >
      {children}
      {/* {isLoading && <Ellipsis />} */}
    </button>
  )
}
