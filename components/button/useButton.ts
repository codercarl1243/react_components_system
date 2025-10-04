import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';
import { log } from '@/utils/Logging';

export default function useButton() {
  const handleClick = <T = unknown>(userHandler?: ButtonClickHandler<T>) =>
    (event: MouseEventType) => {
      if (!userHandler) return

      try {
        const result = userHandler(event)

        // Log promise rejections without interfering
        if (
          result &&
          typeof result === 'object' &&
          typeof (result as { then?: unknown }).then === 'function'
        ) {
          void Promise.resolve(result).catch((err) => {
            if (process.env.NODE_ENV !== 'production') {
              log('Button click error', err, 'error')
            }
          })
        }

      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          log('Button click error', err, 'error')
        }
        throw err
      }
    }

  return { handleClick }
}