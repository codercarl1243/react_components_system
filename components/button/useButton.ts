import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';
import isThenable from '@/utils/isThenable';
import log from '@/utils/Logging';

export default function useButton() {
  /**
 * Creates a wrapped click handler that logs all button interactions and handles errors.
 * 
 * This wrapper provides centralized logging for:
 * - All button click events (successful and failed) - Logged in: Development only
 * - Synchronous errors (caught and re-thrown) - Logged in: All environments
 * - Unhandled asynchronous errors (not re-thrown) - Logged in: All environments
 * 
 * Note: If the user handler catches its own errors, those errors will NOT be logged here.
 * Only unhandled promise rejections are captured for async operations.
 * 
 * @template T - The return type of the user's click handler
 * @param {ButtonClickHandler<T>} [userHandler] - The user's click handler function
 * @returns {Function} A wrapped click handler that can be passed to button onClick
 * 
 * @example
 * const { handleClick } = useButton()
 * <button onClick={handleClick(myAsyncHandler)}>Click me</button>
 */
  const handleClick = <T = unknown>(userHandler?: ButtonClickHandler<T>) =>
    (event: MouseEventType) => {
      if (!userHandler) return

      try {
        const result = userHandler(event)

        // Log all button clicks for analytics/debugging
        if (process.env.NODE_ENV !== 'production') {
          log('Button clicked', undefined, 'default', { context: `${userHandler.name || 'anonymous function'}`, trace: true })
        }
        if (isThenable(result)) {
          /**
           * Attach error logging to unhandled promise rejections.
           * Uses void to indicate we're intentionally not awaiting this promise.
           * 
           * Note: This only catches rejections that the user handler did NOT catch.
           * If the user handler has its own try/catch, this won't fire or do anything.
           */
          void Promise.resolve(result).catch((err) => {
            log('Unhandled async error', err, 'error', { context: `${userHandler.name || 'anonymous function'}`, trace: true })
          })
        }

        // Return the result (could be a value, Promise, or undefined)
        return result

      } catch (err) {
        /**
         * Catch synchronous errors thrown during handler execution.
         * Log the error for debugging, then re-throw so the error still
         * propagates (breaks execution, shows in console, etc.)
         */
        log('Button click error', err, 'error', { context: `${userHandler.name || 'anonymous function'}`, trace: true })
        throw err
      }
    }

  return { handleClick }
}