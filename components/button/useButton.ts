import { type MouseEvent } from 'react'

type MouseEventType = MouseEvent<HTMLButtonElement>;

type ButtonClickHandler<T = void> = (event: MouseEventType) => T;

export default function useButton() {
  const handleClick = <T = void>(userHandler?: ButtonClickHandler<T>) =>
    (event: MouseEventType) => {
      if (!userHandler) return

      try {
        const result = userHandler(event)

        // Log promise rejections without interfering
        if (result instanceof Promise) {
          result.catch((err) => {
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
