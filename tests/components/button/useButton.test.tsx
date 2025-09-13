import useButton from '@/components/button/useButton'
import { renderHook } from '@testing-library/react'
import { MouseEvent as ReactMouseEvent } from 'react'

let handleClick: ReturnType<typeof useButton>['handleClick']
let consoleErrorSpy: jest.SpyInstance

describe('useButton', () => {
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
  })

  beforeEach(() => {
    const { result } = renderHook(() => useButton())
    handleClick = result.current.handleClick
    consoleErrorSpy.mockClear()
  })

  afterAll(() => consoleErrorSpy.mockRestore())

  test('passes event object to handler', () => {
    const mockHandler = jest.fn()
    const clickHandler = handleClick(mockHandler)
    const mockEvent = {} as ReactMouseEvent<HTMLButtonElement>

    clickHandler(mockEvent)

    expect(mockHandler).toHaveBeenCalledWith(mockEvent)
  })

  test('returns undefined when no handler is provided', () => {
    const clickHandler = handleClick(undefined)
    const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

    expect(result).toBeUndefined()
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  test('calls and returns result from sync handler', () => {
    const mockHandler = jest.fn<string, [ReactMouseEvent<HTMLButtonElement>]>().mockReturnValue('sync result')
    const clickHandler = handleClick(mockHandler)

    const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(result).toBe('sync result')
  })

  test('calls and returns promise from async handler', async () => {
    const mockHandler = jest.fn<Promise<string>, [ReactMouseEvent<HTMLButtonElement>]>().mockResolvedValue('async result')
    const clickHandler = handleClick(mockHandler)

    const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBe('async result')
  })

  test('logs and rethrows sync handler errors', () => {
    const error = new Error('Sync Error')
    const mockHandler = jest.fn<string, [ReactMouseEvent<HTMLButtonElement>]>().mockImplementation(() => { throw error })

    const clickHandler = handleClick(mockHandler)

    expect(() => {
      clickHandler({} as ReactMouseEvent<HTMLButtonElement>)
    }).toThrow(error)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Button click error', error)
  })

  test('returns rejected promise and logs async handler errors', async () => {
    const error = new Error('Async Error')
    const mockHandler = jest.fn<Promise<string>, [ReactMouseEvent<HTMLButtonElement>]>().mockRejectedValue(error)
    const clickHandler = handleClick(mockHandler)

    const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

    expect(result).toBeInstanceOf(Promise)
    await expect(result).rejects.toThrow(error)

    // Wait for the hook's internal promise.catch() to execute
    await new Promise<void>(resolve => {
      global.setTimeout(resolve, 0)
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith('Button click error', error)
  })

  test('does not interfere with parent promise handling', async () => {
    const error = new Error('Parent should catch this')
    const mockHandler = jest.fn<Promise<string>, [ReactMouseEvent<HTMLButtonElement>]>().mockRejectedValue(error)
    const clickHandler = handleClick(mockHandler)

    const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

    let caughtError
    try {
      await result
    } catch (err) {
      caughtError = err
    }

    expect(caughtError).toBe(error)

    await new Promise(resolve => global.setTimeout(resolve, 0))
    expect(consoleErrorSpy).toHaveBeenCalledWith('Button click error', error)
  })

  test('handles non-promise return values without instanceof check', () => {
    const mockHandler = jest.fn<string, [ReactMouseEvent<HTMLButtonElement>]>().mockReturnValue('not a promise')

    const clickHandler = handleClick(mockHandler)

    const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

    expect(result).toBe('not a promise')
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  test('handles null return value without promise check', () => {
    const mockHandler = jest.fn<null, [ReactMouseEvent<HTMLButtonElement>]>().mockReturnValue(null)

    const clickHandler = handleClick(mockHandler)

    const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

    expect(result).toBeNull()
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  describe('in production environment', () => {
    const originalEnv = process.env

    beforeAll(() => {
      process.env = { ...originalEnv, NODE_ENV: 'production' }
      jest.resetModules()
    })
    afterAll(() => {
      process.env = originalEnv
      jest.resetModules()
    })
    test('does not log sync errors', () => {
      const error = new Error('Production Error')
      const mockHandler = jest.fn<string, [ReactMouseEvent<HTMLButtonElement>]>().mockImplementation(() => { throw error })
      const clickHandler = handleClick(mockHandler)

      expect(() => {
        clickHandler({} as ReactMouseEvent<HTMLButtonElement>)
      }).toThrow(error)

      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    test('does not log async errors', async () => {
      const error = new Error('Production Async Error')
      const mockHandler = jest.fn<Promise<string>, [ReactMouseEvent<HTMLButtonElement>]>().mockRejectedValue(error)

      const clickHandler = handleClick(mockHandler)

      const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(result).toBeInstanceOf(Promise)

      const promiseResult = result as Promise<string>

      await expect(promiseResult).rejects.toThrow(error)
      await new Promise<void>(resolve => {
        global.setTimeout(resolve, 0)
      })
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })
  })
})