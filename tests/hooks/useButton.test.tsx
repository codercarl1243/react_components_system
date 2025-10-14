import useButton from '@/components/button/useButton'
import { renderHook } from '@testing-library/react'
import { MouseEvent as ReactMouseEvent } from 'react'
import log from '@/lib/Logging';

jest.mock('../../lib/Logging.ts');

const mockLog = log as jest.MockedFunction<typeof log>

let handleClick: ReturnType<typeof useButton>['handleClick']

describe('useButton', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    const { result } = renderHook(() => useButton())
    handleClick = result.current.handleClick
  })

  describe('handleClick', () => {
    test('accepts a curried function with the Event as the prop', () => {
      const mockUserHandler = jest.fn()
      const mockEvent = {} as ReactMouseEvent<HTMLButtonElement>
      handleClick(mockUserHandler)(mockEvent)

      expect(mockUserHandler).toHaveBeenCalledWith(mockEvent)
    })

    test('returns early when no handler is provided', () => {
      const clickHandler = handleClick(undefined)
      const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(result).toBeUndefined()
      expect(mockLog).not.toHaveBeenCalled()
    })

    test('does not return a value for sync functions', () => {
      const mockHandler = jest.fn()
      const clickHandler = handleClick(mockHandler)

      const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(result).toBeUndefined()
    })

    test('does not return a value for async/promise functions', () => {
      const mockHandler = jest.fn<Promise<void>, [ReactMouseEvent<HTMLButtonElement>]>()
        .mockResolvedValue(undefined)
      const clickHandler = handleClick(mockHandler)

      const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(result).toBeUndefined()
    })

    test('logs and rethrows sync handler errors', () => {
      const error = new Error('Sync Error')
      const mockHandler = jest.fn().mockImplementation(() => { throw error })

      const clickHandler = handleClick(mockHandler)

      expect(() => {
        clickHandler({} as ReactMouseEvent<HTMLButtonElement>)
      }).toThrow(error)

      expect(mockLog).toHaveBeenCalledWith('Button click error', error, 'error', expect.objectContaining({
        context: expect.any(String),
        trace: true
      }))
    })

    test('attaches logging to unhandled async errors', async () => {
      const error = new Error('Async Error')
      const mockHandler = jest.fn<Promise<void>, [ReactMouseEvent<HTMLButtonElement>]>()
        .mockRejectedValue(error)
      const clickHandler = handleClick(mockHandler)

      const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(result).toBeUndefined()

      await new Promise<void>(resolve => {
        global.setTimeout(resolve, 0)
      })

      expect(mockLog).toHaveBeenCalledWith('Unhandled async error', error, 'error', expect.objectContaining({
        context: expect.any(String),
        trace: true
      }))
    })

    test('does not log caught async errors', async () => {
      const originalNodeEnv = process.env.NODE_ENV

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true
      })

      const error = new Error('Caught Async Error')
      const mockHandler = jest.fn<Promise<void>, [ReactMouseEvent<HTMLButtonElement>]>()
        .mockImplementation(() => Promise.reject(error).catch(() => {
          // Swallow the error
        }))
      const clickHandler = handleClick(mockHandler)

      const result = clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(result).toBeUndefined()

      await new Promise<void>(resolve => {
        global.setTimeout(resolve, 0)
      })

      expect(mockLog).not.toHaveBeenCalled()

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalNodeEnv,
        writable: false,
        configurable: true
      })
    })
   test('logs all clicks in non-production environments', () => {
      const originalNodeEnv = process.env.NODE_ENV

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true
      })

      const mockHandler = jest.fn().mockName('testHandler')
      const clickHandler = handleClick(mockHandler)

      clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockLog).toHaveBeenCalledWith('Button clicked', undefined, 'default', expect.objectContaining({
        context: expect.any(String),
        trace: true
      }))

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalNodeEnv,
        writable: false,
        configurable: true
      })
    })

    test('does not log clicks in production', () => {
      const originalNodeEnv = process.env.NODE_ENV

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true
      })

      const mockHandler = jest.fn()
      const clickHandler = handleClick(mockHandler)

      clickHandler({} as ReactMouseEvent<HTMLButtonElement>)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockLog).not.toHaveBeenCalled()

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalNodeEnv,
        writable: false,
        configurable: true
      })
    })
  })
})