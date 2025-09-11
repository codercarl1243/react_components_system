import { type MouseEvent } from 'react'

type MouseEventType = MouseEvent<HTMLButtonElement>;

type ButtonClickHandler<T = void> = (event: MouseEventType) => T | Promise<T>;

export default function useButton () {
  const handleClick = <T = void>(userHandler?: ButtonClickHandler<T>) =>
    async (event: MouseEventType) => {
      if (!userHandler) return
      try {
        return await userHandler(event)
      } catch (err) {
        console.error('Button click error', err)
        throw err
      }
    }

  return { handleClick }
}
