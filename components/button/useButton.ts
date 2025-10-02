import type { ButtonClickHandler, MouseEventType } from '@/components/button/button.type';

export default function useButton() {
  const handleClick = <T = void>(userHandler?: ButtonClickHandler<T>) =>
    (event: MouseEventType): T | Promise<T> | undefined => {
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
              // eslint-disable-next-line no-console
              console.error('Button click error', err)
            }
          })
        }

        return result
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('Button click error', err)
        }
        throw err
      }
    }

  return { handleClick }
}