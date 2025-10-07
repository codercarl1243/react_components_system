'use client'

import clsx from 'clsx'
import { BaseButtonProps, MouseEventType } from '@/components/button/button.type'
import useButton from '@/components/button/useButton'
import Spinner from '@/components/utilities/spinner'

/**
 * A base, accessible button component that supports loading states and 
 * safely manages click behavior and logging through a custom hook.
 *  
 * This component uses aria-disabled instead of the native disabled attribute
 * to maintain discoverability and tab order. The button remains focusable
 * and discoverable to assistive technology while in this non-functional state.
 *
 * @component
 * @param {BaseButtonProps} props - The props for the Button component.
 * @param {string} [props.className] - Additional class names to append.
 * @param {React.ReactNode} props.children - The button label or content.
 * @param {function} [props.onClick] - Optional click handler.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button type.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state.
 * @param {React.Ref<HTMLButtonElement>} [props.ref] - Optional ref to the button element.
 * @returns {JSX.Element} The rendered Button component.
 *
 * @example
 * // Loading state with spinner
 * <Button isLoading onClick={handleSubmit}>Submit</Button>
 * 
 * // Disabled but discoverable
 * <Button disabled onClick={handleSave}>Save</Button>
 * 
 * // With variant styling
 * <Button data-variant="primary" data-style="filled">
 *   Click Me
 * </Button>
 */
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

  /**
   * Handles click events.
   *
   * - Prevents default form submission when loading or disabled.
   * - Stops propagation to avoid parent click triggers.
   * - Delegates to useButton's click handler otherwise.
   */
  function onClickHandler(event: MouseEventType) {

    if (isLoading || disabled) {
      /**  
       * Using both is correct here since a disabled/loading button should do nothing and 
       * not trigger parent handlers.
       * */
      event.preventDefault()      // Prevent form submission and/or default click actions
      event.stopPropagation()     // Prevent bubbling to parent click handlers
      return;
    }
    return handleClick(onClick)(event)
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
  )}
