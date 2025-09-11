/* global describe, beforeAll, beforeEach, afterAll, expect, test, jest */
import useButton from '@/components/button/useButton'
import { renderHook } from '@testing-library/react'
import React, { act } from 'react'

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

  test('returns early if no handler is provided', async () => {
    const clickHandler = handleClick(undefined)
    const result = await act(async () => await clickHandler({} as React.MouseEvent<HTMLButtonElement>))

    expect(result).toBeUndefined()
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })
  test('calls the provided sync handler', async () => {
    const mockHandler = jest.fn().mockReturnValue('sync result')
    const clickHandler = handleClick(mockHandler)
    let resultValue
    await act(async () => {
      resultValue = await clickHandler({} as React.MouseEvent<HTMLButtonElement>)
    })
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(resultValue).toBe('sync result')
  })
  test('calls the provided async handler', async () => {
    const mockHandler = jest.fn().mockResolvedValue('async result')
    const clickHandler = handleClick(mockHandler)
    let resultValue
    await act(async () => {
      resultValue = await clickHandler({} as React.MouseEvent<HTMLButtonElement>)
    })
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(resultValue).toBe('async result')
  })
  test('logs errors when the sync handler throws', async () => {
    const error = new Error('Sync Error')
    const mockHandler = jest.fn().mockImplementation(() => { throw error })
    const clickHandler = handleClick(mockHandler)

    await expect(
      act(async () => {
        await clickHandler({} as React.MouseEvent<HTMLButtonElement>)
      })
    ).rejects.toThrow(error)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Button click error', error)
  })
  test('logs errors when the async handler throws', async () => {
    const error = new Error('Async Error')
    const mockHandler = jest.fn().mockRejectedValue(error)
    const clickHandler = handleClick(mockHandler)

    await expect(
      act(async () => {
        await clickHandler({} as React.MouseEvent<HTMLButtonElement>)
      })
    ).rejects.toThrow(error)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Button click error', error)
  })
  test('rethrows errors from the sync handler', async () => {
    const error = new Error('sync handler rethrow test')
    const mockHandler = jest.fn().mockImplementation(() => { throw error })
    const clickHandler = handleClick(mockHandler)
    await expect(
      act(async () => {
        await clickHandler({} as React.MouseEvent<HTMLButtonElement>)
      })
    ).rejects.toThrow(error)
  })
  test('rethrows errors from the Async handler', async () => {
    const error = new Error('Async handler rethrow test')
    const mockHandler = jest.fn().mockRejectedValue(() => { throw error })
    const clickHandler = handleClick(mockHandler)
    await expect(
      act(async () => {
        await clickHandler({} as React.MouseEvent<HTMLButtonElement>)
      })
    ).rejects.toThrow(error)
  })
})
