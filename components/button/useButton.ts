import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';
import log from '@/utils/Logging';

export default function useButton() {
  const handleClick = <T = unknown>(userHandler?: ButtonClickHandler<T>) =>
    (event: MouseEventType) => {
      if (!userHandler) return

      try {
        const result = userHandler(event)

        /**
         * Log promise rejections without interfering
         * we re-throw so the caller and Error boundaries can catch
         *  */ 
        if (result && typeof (result as any)?.then === 'function') {
          return Promise.resolve(result).catch((err) => {
              log('Button click error', err, 'error')
              throw err 
          })
        }

      } catch (err) {
          log('Button click error', err, 'error')
          throw err
      }
    }

  return { handleClick }
}